# PawCircle Account and Data Deletion Runbook

## Purpose

Use this checklist for every account or personal-data deletion request. Deletion is a verified administrative process, not a one-click client action.

## Non-negotiable business rule

**Account deletion does not create a refund. Membership fees already paid remain non-refundable.**

A deletion request is separate from membership cancellation. Do not promise or issue a refund unless PawCircle is legally required to do so or Rebecca makes a separate documented exception.

## Intake paths

1. Preferred: the signed-in member submits the request from Account Settings. The request is stored in `public.account_deletion_requests`, and receipt emails are sent to PawCircle and the member.
2. Fallback: a person who cannot sign in emails `hello@pawcirclemembership.com` from the account email with the subject `Account Deletion Request`.

Never ask for a password, full payment-card number, or security code.

## Step 1 — Verify the request

- Confirm the request ID and account email.
- Confirm that the requester controls the signed-in account or account email.
- Request only the additional information reasonably necessary to verify identity.
- Change the request status to `identity_verified` only after verification.

## Step 2 — Check membership and billing

Review the PawCircle profile and Stripe customer/subscription before deleting anything.

### Active membership

Ask the member to choose one option in writing:

- **Delete promptly:** cancel future renewal in Stripe, complete deletion after confirmation, and end remaining PawCircle access when deletion is completed. No refund is issued for unused time.
- **Delete after paid term:** preserve access through the paid billing period, ensure renewal is canceled, and schedule deletion after Stripe reports the subscription ended.

### Inactive membership

Confirm that no active or scheduled Stripe renewal remains before processing deletion.

Record the chosen timing. Do not infer it.

## Step 3 — Mark processing and prepare

- Set request status to `processing` and update `updated_at`.
- Record the request ID in the support notes.
- Confirm the member has received the non-refund and deletion-timing explanation.
- Confirm whether any legal hold, unresolved payment dispute, fraud/security investigation, or required business record affects deletion scope.

## Step 4 — Complete deletion

After final confirmation and the chosen timing:

1. Stop future Stripe renewal when applicable. Do not issue a refund.
2. Delete objects under the member's user-ID folder in the `profile-photos` storage bucket.
3. Delete the member's `public.profiles` row. Current foreign keys cascade related messages and conversation preferences tied to that profile.
4. Delete the Supabase Auth user. This removes authentication access and cascades any remaining Auth-owned conversation preferences.
5. Preserve only records reasonably necessary for payment/tax records, legal compliance, security/fraud prevention, dispute handling, enforcement, or proof that the deletion request was completed.

Deletion is irreversible. Recheck the user ID and request ID immediately before each destructive action.

## Step 5 — Close the request

- Send the completion notice to the member before clearing the request email.
- Update the request by ID:
  - `status = 'completed'`
  - `completed_at = now()`
  - `updated_at = now()`
  - `account_email = null` after the completion email is sent and the address is no longer required
- The Auth-user deletion sets `user_id` to null automatically, leaving a privacy-minimized request ID, status, and timestamps.

## Unable to complete or member withdraws

Use `declined` only when PawCircle cannot lawfully or safely complete the request and explain the reason to the requester. Use `canceled` when the verified requester withdraws the request before deletion.

## Required final verification

- Future Stripe renewal stopped when applicable
- No refund issued
- Profile removed
- Profile-photo objects removed
- Messages and preferences removed through verified cascade behavior
- Supabase Auth user removed
- Completion email sent
- Request record privacy-minimized and marked completed
