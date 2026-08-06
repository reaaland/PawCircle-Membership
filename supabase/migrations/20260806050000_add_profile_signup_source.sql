alter table public.profiles
  add column if not exists signup_source text;

alter table public.profiles
  drop constraint if exists profiles_signup_source_format;

alter table public.profiles
  add constraint profiles_signup_source_format
  check (
    signup_source is null
    or signup_source ~ '^[a-z0-9_-]{1,80}$'
  );

comment on column public.profiles.signup_source is
  'Non-sensitive marketing source captured at successful membership checkout.';

create or replace function private.protect_profile_signup_source()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if current_user in ('postgres', 'service_role', 'supabase_admin') then
    return new;
  end if;

  if tg_op = 'INSERT' then
    new.signup_source := null;
  else
    new.signup_source := old.signup_source;
  end if;

  return new;
end;
$$;

revoke all on function private.protect_profile_signup_source() from public;

drop trigger if exists protect_profile_signup_source on public.profiles;

create trigger protect_profile_signup_source
before insert or update of signup_source on public.profiles
for each row
execute function private.protect_profile_signup_source();
