-- Sanding: e-wedding cards. Couples own orders; guests write RSVPs and wishes
-- through server routes (service role) that call the rate-limited functions below.

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------- orders
create table public.orders (
  id           uuid primary key default gen_random_uuid(),
  owner_id     uuid not null references auth.users(id) on delete cascade,
  slug         text unique check (slug ~ '^[a-z0-9][a-z0-9-]{1,38}[a-z0-9]$'),
  status       text not null default 'draft' check (status in ('draft','live')),
  package      text check (package in ('asas','premium','diraja')),  -- highest package paid for
  paid_cents   integer not null default 0,
  content      jsonb not null default '{}'::jsonb,                   -- the card fields (see src/lib/card.ts)
  published_at timestamptz,
  valid_until  timestamptz,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);
create index orders_owner_idx on public.orders(owner_id, created_at desc);

-- ---------------------------------------------------------------- payments
create table public.payments (
  id           uuid primary key default gen_random_uuid(),
  order_id     uuid not null references public.orders(id) on delete cascade,
  owner_id     uuid not null references auth.users(id) on delete cascade,
  provider     text not null check (provider in ('toyyibpay','billplz','mock')),
  bill_code    text unique,
  package      text not null check (package in ('asas','premium','diraja')),
  slug         text not null,
  amount_cents integer not null check (amount_cents >= 0),
  promo        text,
  status       text not null default 'pending' check (status in ('pending','paid','failed')),
  ref_no       text,
  raw          jsonb,
  created_at   timestamptz not null default now(),
  paid_at      timestamptz
);
create index payments_order_idx on public.payments(order_id, created_at desc);

-- ---------------------------------------------------------------- guests (personal links, Diraja)
create table public.guests (
  id         uuid primary key default gen_random_uuid(),
  order_id   uuid not null references public.orders(id) on delete cascade,
  token      text not null check (token ~ '^[a-z0-9]{4,16}$'),
  name       text not null check (char_length(name) between 1 and 80),
  sort       integer not null default 0,
  created_at timestamptz not null default now(),
  unique (order_id, token)
);

-- ---------------------------------------------------------------- rsvps
create table public.rsvps (
  id         uuid primary key default gen_random_uuid(),
  order_id   uuid not null references public.orders(id) on delete cascade,
  guest_id   uuid references public.guests(id) on delete set null,
  name       text not null check (char_length(name) between 1 and 60),
  phone      text not null check (char_length(phone) between 6 and 20),
  phone_norm text not null,
  attending  boolean not null,
  pax        integer not null default 0 check (pax between 0 and 20),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (order_id, phone_norm)                 -- one reply per phone; replying again updates it
);

-- ---------------------------------------------------------------- wishes
create table public.wishes (
  id         uuid primary key default gen_random_uuid(),
  order_id   uuid not null references public.orders(id) on delete cascade,
  name       text not null check (char_length(name) between 1 and 60),
  msg        text not null check (char_length(msg) between 1 and 400),
  hidden     boolean not null default false,
  created_at timestamptz not null default now()
);
create index wishes_order_idx on public.wishes(order_id, created_at desc);

-- ---------------------------------------------------------------- rate limiting
create table public.rate_events (
  key text not null,
  at  timestamptz not null default now()
);
create index rate_events_key_idx on public.rate_events(key, at desc);

-- Records a hit for `key` and returns false when more than `max_hits` happened in `window_s` seconds.
create or replace function public.rate_hit(p_key text, max_hits int, window_s int)
returns boolean language plpgsql security definer set search_path = public as $$
declare n int;
begin
  if random() < 0.02 then delete from rate_events where at < now() - interval '1 day'; end if;
  select count(*) into n from rate_events where key = p_key and at > now() - make_interval(secs => window_s);
  if n >= max_hits then return false; end if;
  insert into rate_events(key) values (p_key);
  return true;
end $$;

-- ---------------------------------------------------------------- packages (server truth)
create or replace function public.pkg_rank(p text) returns int language sql immutable as $$
  select case p when 'asas' then 1 when 'premium' then 2 when 'diraja' then 3 else 0 end $$;

create or replace function public.pkg_days(p text) returns int language sql immutable as $$
  select case p when 'asas' then 60 when 'premium' then 120 when 'diraja' then 365 else 0 end $$;

-- Marks a payment paid and publishes / upgrades its order. Idempotent: a second call is a no-op.
create or replace function public.finalize_payment(p_payment uuid, p_ref text, p_raw jsonb)
returns boolean language plpgsql security definer set search_path = public as $$
declare pay payments; ord orders;
begin
  select * into pay from payments where id = p_payment for update;
  if not found or pay.status = 'paid' then return false; end if;
  select * into ord from orders where id = pay.order_id for update;
  update payments set status = 'paid', ref_no = p_ref, raw = coalesce(p_raw, raw), paid_at = now() where id = pay.id;
  update orders set
    status       = 'live',
    slug         = coalesce(ord.slug, pay.slug),
    package      = case when pkg_rank(pay.package) > pkg_rank(ord.package) then pay.package else ord.package end,
    paid_cents   = ord.paid_cents + pay.amount_cents,
    published_at = coalesce(ord.published_at, now()),
    valid_until  = greatest(coalesce(ord.valid_until, now()),
                            coalesce(ord.published_at, now()) + make_interval(days => pkg_days(pay.package))),
    updated_at   = now()
  where id = ord.id;
  return true;
end $$;

-- ---------------------------------------------------------------- guest-facing writes
-- Called by the Next.js route handlers with the service role, after they hash the caller's IP.
create or replace function public.submit_rsvp(
  p_slug text, p_guest_token text, p_name text, p_phone text, p_attending boolean, p_pax int, p_ip_hash text)
returns jsonb language plpgsql security definer set search_path = public as $$
declare ord orders; g guests; max_pax int; deadline date; norm text; c jsonb;
begin
  select * into ord from orders where slug = p_slug and status = 'live';
  if not found or ord.valid_until < now() then return jsonb_build_object('error','not_found'); end if;
  c := ord.content;
  if coalesce((c->>'x_rsvp')::boolean, false) is not true then return jsonb_build_object('error','rsvp_off'); end if;
  deadline := nullif(c->>'deadline','')::date;
  if deadline is not null and now() > (deadline + time '23:59:59') at time zone 'Asia/Kuala_Lumpur' then
    return jsonb_build_object('error','closed'); end if;
  if not rate_hit('rsvp:ip:' || p_ip_hash, 6, 600) then return jsonb_build_object('error','rate'); end if;
  if not rate_hit('rsvp:order:' || ord.id, 400, 3600) then return jsonb_build_object('error','rate'); end if;
  max_pax := greatest(1, least(20, coalesce(nullif(c->>'maxPax','')::int, 1)));
  norm := regexp_replace(p_phone, '\D', '', 'g');
  if length(norm) < 6 then return jsonb_build_object('error','phone'); end if;
  if p_guest_token is not null and p_guest_token <> '' then
    select * into g from guests where order_id = ord.id and token = p_guest_token;
  end if;
  insert into rsvps(order_id, guest_id, name, phone, phone_norm, attending, pax)
  values (ord.id, g.id, left(trim(p_name), 60), left(trim(p_phone), 20), norm, p_attending,
          case when p_attending then greatest(1, least(max_pax, coalesce(p_pax, 1))) else 0 end)
  on conflict (order_id, phone_norm) do update set
    name = excluded.name, attending = excluded.attending, pax = excluded.pax,
    guest_id = coalesce(excluded.guest_id, rsvps.guest_id), updated_at = now();
  return jsonb_build_object('ok', true);
end $$;

create or replace function public.submit_wish(p_slug text, p_name text, p_msg text, p_ip_hash text)
returns jsonb language plpgsql security definer set search_path = public as $$
declare ord orders; w wishes;
begin
  select * into ord from orders where slug = p_slug and status = 'live';
  if not found or ord.valid_until < now() then return jsonb_build_object('error','not_found'); end if;
  if coalesce((ord.content->>'x_wishes')::boolean, false) is not true or pkg_rank(ord.package) < 2 then
    return jsonb_build_object('error','wishes_off'); end if;
  if not rate_hit('wish:ip:' || p_ip_hash, 4, 600) then return jsonb_build_object('error','rate'); end if;
  if not rate_hit('wish:order:' || ord.id, 300, 3600) then return jsonb_build_object('error','rate'); end if;
  insert into wishes(order_id, name, msg) values (ord.id, left(trim(p_name), 60), left(trim(p_msg), 400)) returning * into w;
  return jsonb_build_object('ok', true, 'wish', jsonb_build_object('id', w.id, 'name', w.name, 'msg', w.msg, 'at', w.created_at));
end $$;

revoke execute on function public.rate_hit(text,int,int) from public, anon, authenticated;
revoke execute on function public.finalize_payment(uuid,text,jsonb) from public, anon, authenticated;
revoke execute on function public.submit_rsvp(text,text,text,text,boolean,int,text) from public, anon, authenticated;
revoke execute on function public.submit_wish(text,text,text,text) from public, anon, authenticated;
grant execute on function public.rate_hit(text,int,int) to service_role;
grant execute on function public.finalize_payment(uuid,text,jsonb) to service_role;
grant execute on function public.submit_rsvp(text,text,text,text,boolean,int,text) to service_role;
grant execute on function public.submit_wish(text,text,text,text) to service_role;

-- ---------------------------------------------------------------- RLS
-- Owners read their own data from the browser (dashboard + realtime). All writes to orders,
-- payments and guests go through server routes; owners may moderate wishes and remove RSVPs.
alter table public.orders      enable row level security;
alter table public.payments    enable row level security;
alter table public.guests      enable row level security;
alter table public.rsvps       enable row level security;
alter table public.wishes      enable row level security;
alter table public.rate_events enable row level security;

create policy "owner reads orders"   on public.orders   for select to authenticated using (owner_id = auth.uid());
create policy "owner reads payments" on public.payments for select to authenticated using (owner_id = auth.uid());

create policy "owner reads guests" on public.guests for select to authenticated
  using (exists (select 1 from orders o where o.id = order_id and o.owner_id = auth.uid()));

create policy "owner reads rsvps" on public.rsvps for select to authenticated
  using (exists (select 1 from orders o where o.id = order_id and o.owner_id = auth.uid()));
create policy "owner deletes rsvps" on public.rsvps for delete to authenticated
  using (exists (select 1 from orders o where o.id = order_id and o.owner_id = auth.uid()));

create policy "owner reads wishes" on public.wishes for select to authenticated
  using (exists (select 1 from orders o where o.id = order_id and o.owner_id = auth.uid()));
create policy "owner moderates wishes" on public.wishes for update to authenticated
  using (exists (select 1 from orders o where o.id = order_id and o.owner_id = auth.uid()))
  with check (exists (select 1 from orders o where o.id = order_id and o.owner_id = auth.uid()));
create policy "owner deletes wishes" on public.wishes for delete to authenticated
  using (exists (select 1 from orders o where o.id = order_id and o.owner_id = auth.uid()));

-- Owners may only flip `hidden` on wishes.
revoke update on public.wishes from authenticated;
grant update (hidden) on public.wishes to authenticated;
revoke insert, update, delete on public.orders, public.payments, public.guests from anon, authenticated;
revoke insert, update on public.rsvps from anon, authenticated;
revoke insert on public.wishes from anon, authenticated;
revoke all on public.rate_events from anon, authenticated;

-- Live dashboard updates.
alter publication supabase_realtime add table public.rsvps, public.wishes;

-- ---------------------------------------------------------------- storage: photos + DuitNow QR
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('card-media', 'card-media', true, 2097152, array['image/jpeg','image/png','image/webp'])
on conflict (id) do nothing;

-- Paths are <owner uid>/<order id>/<file>; owners write only under their own uid.
create policy "owner uploads media" on storage.objects for insert to authenticated
  with check (bucket_id = 'card-media' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "owner updates media" on storage.objects for update to authenticated
  using (bucket_id = 'card-media' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "owner deletes media" on storage.objects for delete to authenticated
  using (bucket_id = 'card-media' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "owner lists media" on storage.objects for select to authenticated
  using (bucket_id = 'card-media' and (storage.foldername(name))[1] = auth.uid()::text);
