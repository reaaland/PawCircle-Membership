create or replace function public.is_active_member()
returns boolean
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select exists (
    select 1
    from public.profiles
    where membership_status = 'active'
      and (
        id = auth.uid()
        or lower(email) = lower(auth.jwt() ->> 'email')
      )
  );
$$;

revoke all on function public.is_active_member() from public;
revoke all on function public.is_active_member() from anon;
grant execute on function public.is_active_member() to authenticated;

drop policy if exists "Test for PawCircle" on public.profiles;

create policy "Active members can read profiles"
on public.profiles
for select
to authenticated
using (
  id = auth.uid()
  or lower(email) = lower(auth.jwt() ->> 'email')
  or (
    public.is_active_member()
    and membership_status = 'active'
  )
);