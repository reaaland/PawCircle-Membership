create or replace function public.activate_membership_atomic(
  p_email text,
  p_membership_level text,
  p_membership_type text,
  p_profile_type text,
  p_stripe_customer_id text,
  p_stripe_subscription_id text
)
returns table (
  member_number bigint,
  member_count bigint,
  founder_count bigint,
  created_new_member boolean
)
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_email text := lower(btrim(p_email));
  v_existing_member_number bigint;
  v_existing_joined_at timestamptz;
  v_existing_membership_level text;
  v_member_number bigint;
  v_member_count bigint;
  v_founder_count bigint;
  v_created_new_member boolean := false;
  v_increment_founder boolean := false;
begin
  if v_email is null or v_email = '' then
    raise exception 'A customer email is required.';
  end if;

  select
    coalesce(settings.member_count, 0),
    coalesce(settings.founder_count, 0)
  into
    v_member_count,
    v_founder_count
  from public.site_settings as settings
  where settings.id = 1
  for update;

  if not found then
    raise exception 'The PawCircle site settings row was not found.';
  end if;

  select
    profile.member_number,
    profile.joined_at,
    profile.membership_level
  into
    v_existing_member_number,
    v_existing_joined_at,
    v_existing_membership_level
  from public.profiles as profile
  where profile.email = v_email;

  if v_existing_member_number is null then
    v_member_count := v_member_count + 1;
    v_member_number := v_member_count;
    v_created_new_member := true;
  else
    v_member_number := v_existing_member_number;
  end if;

  v_increment_founder :=
    p_membership_level = 'founder'
    and coalesce(v_existing_membership_level, '') <> 'founder';

  if v_increment_founder then
    v_founder_count := v_founder_count + 1;
  end if;

  if v_created_new_member or v_increment_founder then
    update public.site_settings
    set
      member_count = v_member_count,
      founder_count = v_founder_count
    where id = 1;
  end if;

  insert into public.profiles (
    email,
    membership_status,
    membership_level,
    membership_type,
    profile_type,
    member_number,
    joined_at,
    stripe_customer_id,
    stripe_subscription_id
  )
  values (
    v_email,
    'active',
    p_membership_level,
    p_membership_type,
    p_profile_type,
    v_member_number,
    coalesce(v_existing_joined_at, now()),
    p_stripe_customer_id,
    p_stripe_subscription_id
  )
  on conflict (email) do update
  set
    membership_status = excluded.membership_status,
    membership_level = excluded.membership_level,
    membership_type = excluded.membership_type,
    profile_type = excluded.profile_type,
    member_number = coalesce(
      public.profiles.member_number,
      excluded.member_number
    ),
    joined_at = coalesce(
      public.profiles.joined_at,
      excluded.joined_at
    ),
    stripe_customer_id = excluded.stripe_customer_id,
    stripe_subscription_id = excluded.stripe_subscription_id;

  return query
  select
    v_member_number,
    v_member_count,
    v_founder_count,
    v_created_new_member;
end;
$$;

revoke all on function public.activate_membership_atomic(
  text,
  text,
  text,
  text,
  text,
  text
)
from public, anon, authenticated;

grant execute on function public.activate_membership_atomic(
  text,
  text,
  text,
  text,
  text,
  text
)
to service_role;