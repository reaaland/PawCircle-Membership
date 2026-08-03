create or replace function public.send_message_notification_webhook()
returns trigger
language plpgsql
security definer
set search_path = public, vault, net, pg_temp
as $$
declare
  v_api_key text;
  v_payload jsonb;
begin
  select
  (regexp_match(
    secret,
    '(sb_secret_[A-Za-z0-9._-]+)'
  ))[1]
into v_api_key
from vault.decrypted_secrets
where name = 'message_notification_api_key'
limit 1;

  if v_api_key is null or v_api_key not like 'sb_secret_%' then
    raise warning
      'The message notification API key in Vault is invalid.';

    return new;
  end if;

  v_payload := jsonb_build_object(
    'type', tg_op,
    'table', tg_table_name,
    'schema', tg_table_schema,
    'record', to_jsonb(new),
    'old_record', null
  );

  perform net.http_post(
    url :=
      'https://brdluzydodjjrqhacwfh.supabase.co/functions/v1/send-message-notification',
    body := v_payload,
    params := '{}'::jsonb,
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'apikey', v_api_key
    ),
    timeout_milliseconds := 5000
  );

  return new;
end;
$$;

revoke all
on function public.send_message_notification_webhook()
from public, anon, authenticated;

drop trigger if exists "message-email-notification"
on public.messages;

create trigger "message-email-notification"
after insert on public.messages
for each row
execute function public.send_message_notification_webhook();