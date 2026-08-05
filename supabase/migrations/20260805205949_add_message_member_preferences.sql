create table if not exists public.message_member_preferences (
  user_id uuid not null references auth.users(id) on delete cascade,
  message_id uuid not null references public.messages(id) on delete cascade,
  is_saved boolean not null default false,
  is_deleted boolean not null default false,
  updated_at timestamptz not null default now(),
  primary key (user_id, message_id)
);

alter table public.message_member_preferences enable row level security;

grant select, insert, update, delete
  on public.message_member_preferences
  to authenticated;

drop policy if exists "Members can view their message preferences"
  on public.message_member_preferences;
create policy "Members can view their message preferences"
  on public.message_member_preferences
  for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Members can create their message preferences"
  on public.message_member_preferences;
create policy "Members can create their message preferences"
  on public.message_member_preferences
  for insert
  to authenticated
  with check (
    auth.uid() = user_id
    and exists (
      select 1
      from public.messages m
      where m.id = message_id
        and (m.sender_id = auth.uid() or m.recipient_id = auth.uid())
    )
  );

drop policy if exists "Members can update their message preferences"
  on public.message_member_preferences;
create policy "Members can update their message preferences"
  on public.message_member_preferences
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (
    auth.uid() = user_id
    and exists (
      select 1
      from public.messages m
      where m.id = message_id
        and (m.sender_id = auth.uid() or m.recipient_id = auth.uid())
    )
  );

drop policy if exists "Members can remove their message preferences"
  on public.message_member_preferences;
create policy "Members can remove their message preferences"
  on public.message_member_preferences
  for delete
  to authenticated
  using (auth.uid() = user_id);

create index if not exists message_member_preferences_saved_idx
  on public.message_member_preferences (user_id, is_saved)
  where is_saved = true and is_deleted = false;
