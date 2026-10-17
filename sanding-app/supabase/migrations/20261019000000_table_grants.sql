-- Explicit table privileges.
-- Current Supabase images no longer auto-grant table privileges to the API roles: a table created by
-- `postgres` gives anon/authenticated/service_role only TRUNCATE, REFERENCES and TRIGGER. Without these
-- grants every server route (service_role) and every dashboard read (authenticated) fails with
-- "permission denied" before RLS is even consulted. Grant exactly what the RLS design expects.

-- Server routes use the service role (it bypasses RLS; routes check ownership themselves).
grant select, insert, update, delete on
  public.orders, public.payments, public.guests, public.rsvps, public.wishes,
  public.rate_events, public.checkins, public.reserves, public.views
to service_role;

-- Signed-in owners: reads for the dashboard and realtime, plus the few writes the policies allow.
grant select on public.orders, public.payments, public.guests, public.rsvps, public.wishes,
  public.checkins, public.reserves, public.views to authenticated;
grant delete on public.rsvps, public.wishes, public.checkins, public.reserves to authenticated;
grant update (hidden) on public.wishes to authenticated;
grant insert (rsvp_id, order_id) on public.checkins to authenticated;

-- Guests (anon) never touch tables directly: their writes go through server routes and security-definer RPCs.
