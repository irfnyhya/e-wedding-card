-- RSVP "which side are you from?" for a combined majlis: guests pick the groom's or the bride's side.
alter table public.rsvps add column side text not null default '' check (side in ('', 'bride', 'groom'));

-- New overload with p_side. The 8-argument version stays, so cards without the question (and any app
-- build deployed before this migration) keep working unchanged.
create or replace function public.submit_rsvp(
  p_slug text, p_guest_token text, p_name text, p_phone text, p_attending boolean, p_pax int, p_note text, p_ip_hash text, p_side text)
returns jsonb language plpgsql security definer set search_path = public as $$
declare res jsonb; s text;
begin
  res := public.submit_rsvp(p_slug, p_guest_token, p_name, p_phone, p_attending, p_pax, p_note, p_ip_hash);
  s := case when p_side in ('bride', 'groom') then p_side else '' end;
  if res ? 'id' then update rsvps set side = s where id = (res->>'id')::uuid; end if;
  return res;
end $$;
revoke execute on function public.submit_rsvp(text,text,text,text,boolean,int,text,text,text) from public, anon, authenticated;
grant execute on function public.submit_rsvp(text,text,text,text,boolean,int,text,text,text) to service_role;
