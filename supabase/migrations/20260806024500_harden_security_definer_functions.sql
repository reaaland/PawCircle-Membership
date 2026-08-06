-- PawCircle security cleanup:
-- 1. Keep internal membership checks out of the exposed public RPC schema.
-- 2. Keep mark_conversation_read callable by the app through a SECURITY INVOKER wrapper.
-- 3. Remove client execution rights from the internal RLS event-trigger function.
-- 4. Document that Stripe webhook event records are intentionally backend-only.

create schema if not exists private;

grant usage on schema private to authenticated, service_role;

create or replace function private.is_active_member()
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

revoke all on function private.is_active_member() from public, anon;
grant execute on function private.is_active_member() to authenticated, service_role;

-- Recreate policies so they call the private helper rather than an exposed RPC.
drop policy if exists "Members read own profile providers and conversations"
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
    and (select private.is_active_member())
    and (
      profile_type in ('pet_provider', 'both')
      or (
        select private.has_message_relationship(
          (select auth.uid()),
          profiles.id
        )
      )
    )
  )
);

drop policy if exists "Active members can update own profile"
  on public.profiles;

create policy "Active members can update own profile"
on public.profiles
for update
to authenticated
using (
  (select private.is_active_member())
  and (
    (select auth.uid()) = id
    or lower(email) = lower((select auth.jwt() ->> 'email'))
  )
)
with check (
  (select private.is_active_member())
  and (
    (select auth.uid()) = id
    or lower(email) = lower((select auth.jwt() ->> 'email'))
  )
);

drop policy if exists "Active members can read their own messages"
  on public.messages;

create policy "Active members can read their own messages"
on public.messages
for select
to authenticated
using (
  (select private.is_active_member())
  and (
    (select auth.uid()) = sender_id
    or (select auth.uid()) = recipient_id
  )
);

drop policy if exists "Active members can view conversation preferences"
  on public.conversation_member_preferences;

create policy "Active members can view conversation preferences"
on public.conversation_member_preferences
for select
to authenticated
using (
  (select private.is_active_member())
  and (select auth.uid()) = user_id
);

drop policy if exists "Active members can create conversation preferences"
  on public.conversation_member_preferences;

create policy "Active members can create conversation preferences"
on public.conversation_member_preferences
for insert
to authenticated
with check (
  (select private.is_active_member())
  and (select auth.uid()) = user_id
  and (
    select private.has_message_relationship(
      conversation_member_preferences.user_id,
      conversation_member_preferences.other_member_id
    )
  )
);

drop policy if exists "Active members can update conversation preferences"
  on public.conversation_member_preferences;

create policy "Active members can update conversation preferences"
on public.conversation_member_preferences
for update
to authenticated
using (
  (select private.is_active_member())
  and (select auth.uid()) = user_id
)
with check (
  (select private.is_active_member())
  and (select auth.uid()) = user_id
  and (
    select private.has_message_relationship(
      conversation_member_preferences.user_id,
      conversation_member_preferences.other_member_id
    )
  )
);

drop policy if exists "Active members can remove conversation preferences"
  on public.conversation_member_preferences;

create policy "Active members can remove conversation preferences"
on public.conversation_member_preferences
for delete
to authenticated
using (
  (select private.is_active_member())
  and (select auth.uid()) = user_id
);

-- The private function performs the privileged, tightly scoped update.
create or replace function private.mark_conversation_read(other_member_id uuid)
returns void
language sql
security definer
set search_path = public, private, pg_temp
as $$
  update public.messages
  set is_read = true
  where (select private.is_active_member())
    and recipient_id = (select auth.uid())
    and sender_id = other_member_id
    and is_read = false;
$$;

revoke all on function private.mark_conversation_read(uuid) from public, anon;
grant execute on function private.mark_conversation_read(uuid)
  to authenticated, service_role;

-- Preserve the app's existing public RPC name without exposing a
-- SECURITY DEFINER function through the public API schema.
create or replace function public.mark_conversation_read(other_member_id uuid)
returns void
language sql
security invoker
set search_path = private, public, pg_temp
as $$
  select private.mark_conversation_read(other_member_id);
$$;

revoke all on function public.mark_conversation_read(uuid)
  from public, anon;
grant execute on function public.mark_conversation_read(uuid)
  to authenticated, service_role;

comment on function public.mark_conversation_read(uuid) is
  'Public SECURITY INVOKER wrapper used by the PawCircle Message Center. The private helper restricts updates to the signed-in active recipient.';

-- Policies and the private message helper now replace this exposed RPC.
drop function public.is_active_member();

-- This event-trigger function is internal database infrastructure and must
-- not be callable through Supabase RPC by visitors, members, or service clients.
revoke all on function public.rls_auto_enable()
  from public, anon, authenticated, service_role;

comment on function public.rls_auto_enable() is
  'Internal event-trigger function that enables RLS on newly created public tables. Not callable by API roles.';

comment on table public.stripe_webhook_events is
  'Backend-only Stripe webhook idempotency ledger. RLS intentionally has no client policies; service-role operations bypass RLS.';
