create table public.stripe_webhook_events (
  event_id text primary key,
  event_type text not null,
  status text not null default 'processing'
    check (status in ('processing', 'processed', 'failed')),
  attempt_count integer not null default 1
    check (attempt_count > 0),
  last_error text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  processed_at timestamptz
);

alter table public.stripe_webhook_events enable row level security;

revoke all on table public.stripe_webhook_events
from public, anon, authenticated;

grant all on table public.stripe_webhook_events
to service_role;

create or replace function public.claim_stripe_webhook_event(
  p_event_id text,
  p_event_type text
)
returns boolean
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  claimed_event_id text;
begin
  insert into public.stripe_webhook_events (
    event_id,
    event_type,
    status,
    attempt_count,
    updated_at
  )
  values (
    p_event_id,
    p_event_type,
    'processing',
    1,
    now()
  )
  on conflict (event_id) do update
  set
    event_type = excluded.event_type,
    status = 'processing',
    attempt_count = public.stripe_webhook_events.attempt_count + 1,
    last_error = null,
    updated_at = now(),
    processed_at = null
  where
    public.stripe_webhook_events.status = 'failed'
    or (
      public.stripe_webhook_events.status = 'processing'
      and public.stripe_webhook_events.updated_at
        < now() - interval '10 minutes'
    )
  returning event_id into claimed_event_id;

  return claimed_event_id is not null;
end;
$$;

create or replace function public.mark_stripe_webhook_event_processed(
  p_event_id text
)
returns void
language sql
security definer
set search_path = public, pg_temp
as $$
  update public.stripe_webhook_events
  set
    status = 'processed',
    processed_at = now(),
    updated_at = now(),
    last_error = null
  where event_id = p_event_id;
$$;

create or replace function public.mark_stripe_webhook_event_failed(
  p_event_id text,
  p_error text
)
returns void
language sql
security definer
set search_path = public, pg_temp
as $$
  update public.stripe_webhook_events
  set
    status = 'failed',
    updated_at = now(),
    last_error = left(p_error, 2000)
  where event_id = p_event_id;
$$;

revoke all on function public.claim_stripe_webhook_event(text, text)
from public, anon, authenticated;

revoke all on function public.mark_stripe_webhook_event_processed(text)
from public, anon, authenticated;

revoke all on function public.mark_stripe_webhook_event_failed(text, text)
from public, anon, authenticated;

grant execute on function public.claim_stripe_webhook_event(text, text)
to service_role;

grant execute on function public.mark_stripe_webhook_event_processed(text)
to service_role;

grant execute on function public.mark_stripe_webhook_event_failed(text, text)
to service_role;