drop trigger if exists "message-email-notification"
on public.messages;

drop function if exists public.send_message_notification_webhook();
