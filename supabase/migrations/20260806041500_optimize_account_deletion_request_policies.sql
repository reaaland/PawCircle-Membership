drop policy if exists "Members can view their own deletion requests"
  on public.account_deletion_requests;

drop policy if exists "Members can submit their own deletion request"
  on public.account_deletion_requests;

create policy "Members can view their own deletion requests"
  on public.account_deletion_requests
  for select
  to authenticated
  using (user_id = (select auth.uid()));

create policy "Members can submit their own deletion request"
  on public.account_deletion_requests
  for insert
  to authenticated
  with check (
    user_id = (select auth.uid())
    and account_email is not null
    and lower(trim(account_email)) = lower(
      coalesce((select auth.jwt()) ->> 'email', '')
    )
  );
