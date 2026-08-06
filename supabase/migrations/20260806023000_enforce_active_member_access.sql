create schema if not exists private;

grant usage on schema private to authenticated, service_role;

create or replace function private.has_message_relationship(
  member_a uuid,
  member_b uuid
)
returns boolean
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select exists (
    select 1
    from public.messages m
    where (
      m.sender_id = member_a
      and m.recipient_id = member_b
    ) or (
      m.sender_id = member_b
      and m.recipient_id = member_a
    )
  );
$$;

create or replace function private.can_send_message(
  message_sender_id uuid,
  message_recipient_id uuid
)
returns boolean
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select exists (
    select 1
    from public.profiles sender
    join public.profiles recipient
      on recipient.id = message_recipient_id
    where sender.id = message_sender_id
      and sender.id <> recipient.id
      and sender.membership_status = 'active'
      and recipient.membership_status = 'active'
      and (
        recipient.profile_type in ('pet_provider', 'both')
        or (
          sender.profile_type in ('pet_provider', 'both')
          and recipient.profile_type = 'pet_owner'
          and exists (
            select 1
            from public.messages prior_message
            where prior_message.sender_id = recipient.id
              and prior_message.recipient_id = sender.id
          )
        )
      )
  );
$$;

revoke all on function private.has_message_relationship(uuid, uuid)
  from public;
revoke all on function private.can_send_message(uuid, uuid)
  from public;

grant execute on function private.has_message_relationship(uuid, uuid)
  to authenticated, service_role;
grant execute on function private.can_send_message(uuid, uuid)
  to authenticated, service_role;

create or replace function private.protect_profile_membership_fields()
returns trigger
language plpgsql
set search_path = public, pg_temp
as $$
begin
  if current_user in ('postgres', 'service_role', 'supabase_admin')
    or (select auth.role()) = 'service_role'
  then
    return new;
  end if;

  if tg_op = 'INSERT' then
    new.membership_type := null;
    new.membership_level := null;
    new.membership_status := 'inactive';
    new.member_number := null;
    new.joined_at := null;
    new.stripe_customer_id := null;
    new.stripe_subscription_id := null;
  elsif tg_op = 'UPDATE' then
    new.membership_type := old.membership_type;
    new.membership_level := old.membership_level;
    new.membership_status := old.membership_status;
    new.member_number := old.member_number;
    new.joined_at := old.joined_at;
    new.stripe_customer_id := old.stripe_customer_id;
    new.stripe_subscription_id := old.stripe_subscription_id;
  end if;

  return new;
end;
$$;

revoke all on function private.protect_profile_membership_fields()
  from public;

create or replace trigger protect_profile_membership_fields
before insert or update on public.profiles
for each row
execute function private.protect_profile_membership_fields();

drop policy if exists "Enable insert for users based on user_id"
  on public.profiles;
drop policy if exists "Users can update own profile by id or email"
  on public.profiles;
drop policy if exists "Users can update their own profile"
  on public.profiles;
drop policy if exists "Active members can update own profile"
  on public.profiles;

create policy "Members can create their own inactive profile"
on public.profiles
for insert
to authenticated
with check (
  (select auth.uid()) = id
);

create policy "Active members can update own profile"
on public.profiles
for update
to authenticated
using (
  (select public.is_active_member())
  and (
    (select auth.uid()) = id
    or lower(email) = lower((select auth.jwt() ->> 'email'))
  )
)
with check (
  (select public.is_active_member())
  and (
    (select auth.uid()) = id
    or lower(email) = lower((select auth.jwt() ->> 'email'))
  )
);

drop policy if exists "Members read own profile and active providers"
  on public.profiles;

create policy "Members read own profile providers and conversations"
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
      or (
        select private.has_message_relationship(
          (select auth.uid()),
          id
        )
      )
    )
  )
);

drop policy if exists "Members can read their own messages"
  on public.messages;
drop policy if exists "Members can send their own messages"
  on public.messages;

create policy "Active members can read their own messages"
on public.messages
for select
to authenticated
using (
  (select public.is_active_member())
  and (
    (select auth.uid()) = sender_id
    or (select auth.uid()) = recipient_id
  )
);

create policy "Active members can send allowed messages"
on public.messages
for insert
to authenticated
with check (
  (select auth.uid()) = sender_id
  and (
    select private.can_send_message(
      sender_id,
      recipient_id
    )
  )
);

drop policy if exists "Members can view their conversation preferences"
  on public.conversation_member_preferences;
drop policy if exists "Members can create their conversation preferences"
  on public.conversation_member_preferences;
drop policy if exists "Members can update their conversation preferences"
  on public.conversation_member_preferences;
drop policy if exists "Members can remove their conversation preferences"
  on public.conversation_member_preferences;

create policy "Active members can view conversation preferences"
on public.conversation_member_preferences
for select
to authenticated
using (
  (select public.is_active_member())
  and (select auth.uid()) = user_id
);

create policy "Active members can create conversation preferences"
on public.conversation_member_preferences
for insert
to authenticated
with check (
  (select public.is_active_member())
  and (select auth.uid()) = user_id
  and (
    select private.has_message_relationship(
      user_id,
      other_member_id
    )
  )
);

create policy "Active members can update conversation preferences"
on public.conversation_member_preferences
for update
to authenticated
using (
  (select public.is_active_member())
  and (select auth.uid()) = user_id
)
with check (
  (select public.is_active_member())
  and (select auth.uid()) = user_id
  and (
    select private.has_message_relationship(
      user_id,
      other_member_id
    )
  )
);

create policy "Active members can remove conversation preferences"
on public.conversation_member_preferences
for delete
to authenticated
using (
  (select public.is_active_member())
  and (select auth.uid()) = user_id
);

create or replace function public.mark_conversation_read(other_member_id uuid)
returns void
language sql
security definer
set search_path = public, pg_temp
as $$
  update public.messages
  set is_read = true
  where (select public.is_active_member())
    and recipient_id = (select auth.uid())
    and sender_id = other_member_id
    and is_read = false;
$$;

revoke all on function public.mark_conversation_read(uuid)
  from public;
grant execute on function public.mark_conversation_read(uuid)
  to authenticated, service_role;

comment on policy "Members read own profile providers and conversations"
on public.profiles is
  'Members can read their own profile. Active members can browse active provider profiles and read profiles only for existing message participants.';

comment on function private.can_send_message(uuid, uuid) is
  'Allows active members to contact active providers. Providers may contact owner-only members only after that owner has initiated the conversation.';
