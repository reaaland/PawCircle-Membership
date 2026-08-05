create schema if not exists private;

create or replace function private.is_active_provider_member()
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
      and profile_type in ('pet_provider', 'both')
      and (
        id = (select auth.uid())
        or lower(email) = lower((select auth.jwt() ->> 'email'))
      )
  );
$$;

revoke all on function private.is_active_provider_member() from public;
grant usage on schema private to authenticated, service_role;
grant execute on function private.is_active_provider_member()
  to authenticated, service_role;

drop policy if exists "Active members can read profiles"
  on public.profiles;

create policy "Role-aware active members can read profiles"
on public.profiles
for select
to authenticated
using (
  id = (select auth.uid())
  or lower(email) = lower((select auth.jwt() ->> 'email'))
  or (
    membership_status = 'active'
    and (select public.is_active_member())
    and (
      profile_type in ('pet_provider', 'both')
      or (select private.is_active_provider_member())
    )
  )
);

comment on function private.is_active_provider_member() is
  'Returns true only when the signed-in member is active and has provider or both profile access.';

comment on policy "Role-aware active members can read profiles"
on public.profiles is
  'Members can read their own profile. Active members can read active provider profiles. Only active provider/both members can read active owner-only profiles.';
