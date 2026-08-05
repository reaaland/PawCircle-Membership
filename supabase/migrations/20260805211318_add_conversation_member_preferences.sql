create table if not exists public.conversation_member_preferences (
  user_id uuid not null references auth.users(id) on delete cascade,
  other_member_id uuid not null references public.profiles(id) on delete cascade,
  is_saved boolean not null default false,
  deleted_before timestamptz,
  updated_at timestamptz not null default now(),
  primary key (user_id, other_member_id),
  constraint conversation_member_preferences_different_members
    check (user_id <> other_member_id)
);

alter table public.conversation_member_preferences enable row level security;

grant select, insert, update, delete
  on public.conversation_member_preferences
  to authenticated;

drop policy if exists "Members can view their conversation preferences"
  on public.conversation_member_preferences;
create policy "Members can view their conversation preferences"
  on public.conversation_member_preferences
  for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Members can create their conversation preferences"
  on public.conversation_member_preferences;
create policy "Members can create their conversation preferences"
  on public.conversation_member_preferences
  for insert
  to authenticated
  with check (
    auth.uid() = user_id
    and exists (
      select 1
      from public.messages m
      where
        (m.sender_id = user_id and m.recipient_id = other_member_id)
        or (m.sender_id = other_member_id and m.recipient_id = user_id)
    )
  );

drop policy if exists "Members can update their conversation preferences"
  on public.conversation_member_preferences;
create policy "Members can update their conversation preferences"
  on public.conversation_member_preferences
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (
    auth.uid() = user_id
    and exists (
      select 1
      from public.messages m
      where
        (m.sender_id = user_id and m.recipient_id = other_member_id)
        or (m.sender_id = other_member_id and m.recipient_id = user_id)
    )
  );

drop policy if exists "Members can remove their conversation preferences"
  on public.conversation_member_preferences;
create policy "Members can remove their conversation preferences"
  on public.conversation_member_preferences
  for delete
  to authenticated
  using (auth.uid() = user_id);

create index if not exists conversation_member_preferences_saved_idx
  on public.conversation_member_preferences (user_id, is_saved)
  where is_saved = true;
