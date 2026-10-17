-- Family access: the couple invites relatives by email to see RSVPs, ucapan, wishlist and check-ins.
-- Read only. The invite email carries a one-time token; whoever opens it signed in with the invited
-- address is bound by user id. Access never follows the email claim alone, because sign-ups are not
-- email-confirmed (config.toml enable_confirmations = false).
--
-- Card content needs no schema change: extra sessions (`events`) and the link-preview image
-- (`ogImage`) live in orders.content and are cleaned by sanitizeCard() in src/lib/card.ts.

create table public.order_members (
  id          uuid primary key default gen_random_uuid(),
  order_id    uuid not null references public.orders(id) on delete cascade,
  email       text not null check (email = lower(email) and char_length(email) <= 254 and email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  token_hash  text not null unique check (token_hash ~ '^[0-9a-f]{64}$'),  -- sha256 of the invite token; the token itself is never stored
  invited_by  uuid not null references auth.users(id) on delete cascade,
  user_id     uuid references auth.users(id) on delete cascade,          -- set when the invite is accepted
  created_at  timestamptz not null default now(),
  accepted_at timestamptz,
  unique (order_id, email)
);
create index order_members_user_idx on public.order_members(user_id);

-- True when the signed-in user accepted an invite to this order. Security definer so the
-- policies below can use it without the RLS on order_members recursing into orders.
create or replace function public.is_order_member(p_order uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from order_members where order_id = p_order and user_id = auth.uid() and user_id is not null)
$$;
revoke execute on function public.is_order_member(uuid) from public, anon;
grant execute on function public.is_order_member(uuid) to authenticated, service_role;

-- Binds an invite to the signed-in user. Called by /share/[token] with the service role after it
-- checked that the signed-in address is the invited one. Idempotent for the same user.
create or replace function public.accept_invite(p_token_hash text, p_user uuid)
returns uuid language plpgsql security definer set search_path = public as $$
declare m order_members;
begin
  select * into m from order_members where token_hash = p_token_hash for update;
  if not found then return null; end if;
  if m.user_id is not null and m.user_id <> p_user then return null; end if;
  update order_members set user_id = p_user, accepted_at = coalesce(accepted_at, now()) where id = m.id;
  return m.order_id;
end $$;
revoke execute on function public.accept_invite(text, uuid) from public, anon, authenticated;
grant execute on function public.accept_invite(text, uuid) to service_role;

-- ---------------------------------------------------------------- RLS
alter table public.order_members enable row level security;
create policy "owner reads members" on public.order_members for select to authenticated
  using (exists (select 1 from orders o where o.id = order_id and o.owner_id = auth.uid()));
create policy "member reads own invite" on public.order_members for select to authenticated
  using (user_id = auth.uid());
-- invites are created and removed by server routes only. Grants are explicit: current Supabase images
-- give new tables no table privileges for the API roles (see 20261019000000_table_grants.sql).
grant select, insert, update, delete on public.order_members to service_role;
revoke insert, update, delete on public.order_members from anon, authenticated;
-- the token hash stays server-side: a column grant without it (a column revoke would not narrow a table grant)
revoke select on public.order_members from anon, authenticated;
grant select (id, order_id, email, invited_by, user_id, created_at, accepted_at) on public.order_members to authenticated;

-- Members read the same things the owner reads. Policies are OR'd with the owner policies;
-- every write policy stays owner-only, so members cannot moderate, check in or delete.
create policy "member reads orders"   on public.orders   for select to authenticated using (public.is_order_member(id));
create policy "member reads guests"   on public.guests   for select to authenticated using (public.is_order_member(order_id));
create policy "member reads rsvps"    on public.rsvps    for select to authenticated using (public.is_order_member(order_id));
create policy "member reads wishes"   on public.wishes   for select to authenticated using (public.is_order_member(order_id));
create policy "member reads checkins" on public.checkins for select to authenticated using (public.is_order_member(order_id));
create policy "member reads reserves" on public.reserves for select to authenticated using (public.is_order_member(order_id));
create policy "member reads views"    on public.views    for select to authenticated using (public.is_order_member(order_id));
