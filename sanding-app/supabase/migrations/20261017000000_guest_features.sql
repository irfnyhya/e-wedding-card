-- v9 guest features: RSVP notes + e-pass, check-in on the day, gift wishlist reservations,
-- card-open counts, and the own-design add-on (+RM10).

-- ---------------------------------------------------------------- own design add-on
alter table public.orders   add column addon_own boolean not null default false;
alter table public.payments add column addon_own boolean not null default false;

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
    addon_own    = ord.addon_own or pay.addon_own,
    paid_cents   = ord.paid_cents + pay.amount_cents,
    published_at = coalesce(ord.published_at, now()),
    valid_until  = greatest(coalesce(ord.valid_until, now()),
                            coalesce(ord.published_at, now()) + make_interval(days => pkg_days(pay.package))),
    updated_at   = now()
  where id = ord.id;
  return true;
end $$;

-- ---------------------------------------------------------------- RSVP note; the e-pass code is derived from the id
alter table public.rsvps add column note text not null default '' check (char_length(note) <= 120);

drop function public.submit_rsvp(text,text,text,text,boolean,int,text);
create or replace function public.submit_rsvp(
  p_slug text, p_guest_token text, p_name text, p_phone text, p_attending boolean, p_pax int, p_note text, p_ip_hash text)
returns jsonb language plpgsql security definer set search_path = public as $$
declare ord orders; g guests; max_pax int; deadline date; norm text; c jsonb; r rsvps;
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
  insert into rsvps(order_id, guest_id, name, phone, phone_norm, attending, pax, note)
  values (ord.id, g.id, left(trim(p_name), 60), left(trim(p_phone), 20), norm, p_attending,
          case when p_attending then greatest(1, least(max_pax, coalesce(p_pax, 1))) else 0 end,
          left(trim(coalesce(p_note, '')), 120))
  on conflict (order_id, phone_norm) do update set
    name = excluded.name, attending = excluded.attending, pax = excluded.pax, note = excluded.note,
    guest_id = coalesce(excluded.guest_id, rsvps.guest_id), updated_at = now()
  returning * into r;
  return jsonb_build_object('ok', true, 'id', r.id, 'pax', r.pax, 'attending', r.attending);
end $$;
revoke execute on function public.submit_rsvp(text,text,text,text,boolean,int,text,text) from public, anon, authenticated;
grant execute on function public.submit_rsvp(text,text,text,text,boolean,int,text,text) to service_role;

-- ---------------------------------------------------------------- check-in on the day (owner only)
create table public.checkins (
  rsvp_id  uuid primary key references public.rsvps(id) on delete cascade,
  order_id uuid not null references public.orders(id) on delete cascade,
  at       timestamptz not null default now()
);
create index checkins_order_idx on public.checkins(order_id);
alter table public.checkins enable row level security;
create policy "owner reads checkins" on public.checkins for select to authenticated
  using (exists (select 1 from orders o where o.id = order_id and o.owner_id = auth.uid()));
create policy "owner checks in" on public.checkins for insert to authenticated
  with check (exists (select 1 from orders o join rsvps r on r.order_id = o.id
                      where o.id = order_id and r.id = rsvp_id and o.owner_id = auth.uid()));
create policy "owner undoes check-in" on public.checkins for delete to authenticated
  using (exists (select 1 from orders o where o.id = order_id and o.owner_id = auth.uid()));
revoke update on public.checkins from anon, authenticated;
revoke all on public.checkins from anon;

-- ---------------------------------------------------------------- gift wishlist reservations
-- item_key is 'i0'..'i11' (position in content.wishlist). The guest who reserved gets a secret to cancel with.
create table public.reserves (
  order_id    uuid not null references public.orders(id) on delete cascade,
  item_key    text not null check (item_key ~ '^i([0-9]|1[01])$'),
  name        text not null check (char_length(name) between 1 and 40),
  item        text not null default '',
  secret_hash text not null,
  at          timestamptz not null default now(),
  primary key (order_id, item_key)
);
alter table public.reserves enable row level security;
create policy "owner reads reserves" on public.reserves for select to authenticated
  using (exists (select 1 from orders o where o.id = order_id and o.owner_id = auth.uid()));
create policy "owner releases reserves" on public.reserves for delete to authenticated
  using (exists (select 1 from orders o where o.id = order_id and o.owner_id = auth.uid()));
revoke insert, update on public.reserves from anon, authenticated;
revoke all on public.reserves from anon;

create or replace function public.submit_reserve(p_slug text, p_key text, p_name text, p_secret text, p_ip_hash text)
returns jsonb language plpgsql security definer set search_path = public as $$
declare ord orders; idx int; items jsonb;
begin
  select * into ord from orders where slug = p_slug and status = 'live';
  if not found or ord.valid_until < now() then return jsonb_build_object('error','not_found'); end if;
  if coalesce((ord.content->>'x_wishlist')::boolean, false) is not true or pkg_rank(ord.package) < 2 then
    return jsonb_build_object('error','off'); end if;
  if p_key !~ '^i([0-9]|1[01])$' then return jsonb_build_object('error','item'); end if;
  idx := substr(p_key, 2)::int;
  items := coalesce(ord.content->'wishlist', '[]'::jsonb);
  if idx >= jsonb_array_length(items) or coalesce(items->idx->>'name','') = '' then return jsonb_build_object('error','item'); end if;
  if not rate_hit('res:ip:' || p_ip_hash, 8, 600) then return jsonb_build_object('error','rate'); end if;
  insert into reserves(order_id, item_key, name, item, secret_hash)
  values (ord.id, p_key, left(trim(p_name), 40), left(items->idx->>'name', 80), encode(extensions.digest(p_secret, 'sha256'), 'hex'))
  on conflict do nothing;
  if not found then return jsonb_build_object('error','taken'); end if;
  return jsonb_build_object('ok', true);
end $$;

create or replace function public.cancel_reserve(p_slug text, p_key text, p_secret text)
returns jsonb language plpgsql security definer set search_path = public as $$
declare ord orders;
begin
  select * into ord from orders where slug = p_slug and status = 'live';
  if not found then return jsonb_build_object('error','not_found'); end if;
  delete from reserves where order_id = ord.id and item_key = p_key
    and secret_hash = encode(extensions.digest(p_secret, 'sha256'), 'hex');
  if not found then return jsonb_build_object('error','not_yours'); end if;
  return jsonb_build_object('ok', true);
end $$;

-- ---------------------------------------------------------------- card opens: one row per browser per day
create table public.views (
  order_id uuid not null references public.orders(id) on delete cascade,
  day      date not null default (now() at time zone 'Asia/Kuala_Lumpur')::date,
  visitor  text not null check (visitor ~ '^[a-z0-9]{8,40}$'),
  guest_id uuid references public.guests(id) on delete set null,
  at       timestamptz not null default now(),
  primary key (order_id, day, visitor)
);
alter table public.views enable row level security;
create policy "owner reads views" on public.views for select to authenticated
  using (exists (select 1 from orders o where o.id = order_id and o.owner_id = auth.uid()));
revoke all on public.views from anon;
revoke insert, update, delete on public.views from authenticated;

create or replace function public.record_view(p_slug text, p_visitor text, p_guest_token text, p_ip_hash text)
returns jsonb language plpgsql security definer set search_path = public as $$
declare ord orders; gid uuid;
begin
  select * into ord from orders where slug = p_slug and status = 'live';
  if not found then return jsonb_build_object('error','not_found'); end if;
  if p_visitor !~ '^[a-z0-9]{8,40}$' then return jsonb_build_object('error','visitor'); end if;
  if not rate_hit('view:ip:' || p_ip_hash, 30, 3600) then return jsonb_build_object('error','rate'); end if;
  if p_guest_token is not null and p_guest_token <> '' then
    select id into gid from guests where order_id = ord.id and token = p_guest_token;
  end if;
  insert into views(order_id, visitor, guest_id) values (ord.id, p_visitor, gid) on conflict do nothing;
  return jsonb_build_object('ok', true);
end $$;

revoke execute on function public.submit_reserve(text,text,text,text,text) from public, anon, authenticated;
revoke execute on function public.cancel_reserve(text,text,text) from public, anon, authenticated;
revoke execute on function public.record_view(text,text,text,text) from public, anon, authenticated;
grant execute on function public.submit_reserve(text,text,text,text,text) to service_role;
grant execute on function public.cancel_reserve(text,text,text) to service_role;
grant execute on function public.record_view(text,text,text,text) to service_role;

alter publication supabase_realtime add table public.checkins, public.reserves, public.views;
