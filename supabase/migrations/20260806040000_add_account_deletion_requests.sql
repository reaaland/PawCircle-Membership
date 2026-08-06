create table public.account_deletion_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  account_email text,
  status text not null default 'pending',
  requested_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  confirmation_sent_at timestamptz,
  completed_at timestamptz,
  constraint account_deletion_requests_email_valid
    check (
      account_email is null
      or char_length(trim(account_email)) between 3 and 320
    ),
  constraint account_deletion_requests_status_check
    check (
      status in (
        'pending',
        'identity_verified',
        'processing',
        'completed',
        'declined',
        'canceled'
      )
    )
);

comment on table public.account_deletion_requests is
  'Authenticated member requests for account and personal-data deletion. Processing remains a verified administrative workflow.';

comment on column public.account_deletion_requests.account_email is
  'Authenticated account email used during verification and communication. Clear after the completion notice when no longer required.';

create unique index account_deletion_requests_one_open_per_user
  on public.account_deletion_requests (user_id)
  where user_id is not null
    and status in ('pending', 'identity_verified', 'processing');

create index account_deletion_requests_requested_at_idx
  on public.account_deletion_requests (requested_at desc);

alter table public.account_deletion_requests enable row level security;

revoke all on table public.account_deletion_requests
  from public, anon, authenticated;

grant select (
  id,
  user_id,
  status,
  requested_at,
  updated_at,
  confirmation_sent_at,
  completed_at
) on public.account_deletion_requests to authenticated;

grant insert (
  user_id,
  account_email
) on public.account_deletion_requests to authenticated;

create policy "Members can view their own deletion requests"
  on public.account_deletion_requests
  for select
  to authenticated
  using (user_id = auth.uid());

create policy "Members can submit their own deletion request"
  on public.account_deletion_requests
  for insert
  to authenticated
  with check (
    user_id = auth.uid()
    and account_email is not null
    and lower(trim(account_email)) = lower(
      coalesce(auth.jwt() ->> 'email', '')
    )
  );
