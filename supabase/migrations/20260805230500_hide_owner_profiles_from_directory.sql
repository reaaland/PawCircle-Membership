drop policy if exists "Role-aware active members can read profiles"
  on public.profiles;

drop function if exists private.is_active_provider_member();

create policy "Members read own profile and active providers"
on public.profiles
for select
to authenticated
using (
  id = (select auth.uid())
  or lower(email) = lower((select auth.jwt() ->> 'email'))
  or (
    membership_status = 'active'
    and profile_type in ('pet_provider', 'both')
    and (select public.is_active_member())
  )
);

comment on policy "Members read own profile and active providers"
on public.profiles is
  'Members can always read their own profile. Active members can browse active provider/both profiles. Owner-only profiles are not available as a directory to other members.';
