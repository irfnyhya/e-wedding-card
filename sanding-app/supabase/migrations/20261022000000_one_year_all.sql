-- Every package now stays online for a year (was 60 / 120 / 365 days).
create or replace function public.pkg_days(p text) returns int language sql immutable as $$
  select case when p in ('asas','premium','diraja') then 365 else 0 end $$;

-- Cards already live on a shorter package get the extra time too (only ever extends valid_until).
update public.orders
   set valid_until = published_at + interval '365 days', updated_at = now()
 where status = 'live' and published_at is not null
   and valid_until < published_at + interval '365 days';
