import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

interface DeletionNotificationRequest {
  request_id: string;
}

interface EmailPayload {
  to: string;
  subject: string;
  text: string;
  html: string;
  idempotencyKey: string;
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const SUPPORT_EMAIL = "pawcirclellc@gmail.com";
const ACCOUNT_URL = "https://www.pawcirclemembership.com/account";

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function sendEmail(
  resendApiKey: string,
  payload: EmailPayload,
): Promise<void> {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
      "User-Agent": "PawCircle/1.0",
      "Idempotency-Key": payload.idempotencyKey,
    },
    body: JSON.stringify({
      from: "PawCircle Membership <notifications@pawcirclemembership.com>",
      to: [payload.to],
      subject: payload.subject,
      text: payload.text,
      html: payload.html,
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    console.error("Resend deletion-request email failed:", result);
    throw new Error("Notification email could not be sent");
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return Response.json(
      { error: "Method not allowed" },
      { status: 405, headers: corsHeaders },
    );
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const resendApiKey = Deno.env.get("RESEND_API_KEY");
  const authorization = req.headers.get("Authorization");

  if (
    !supabaseUrl ||
    !supabaseAnonKey ||
    !serviceRoleKey ||
    !resendApiKey
  ) {
    console.error("Deletion-request function environment is incomplete");
    return Response.json(
      { error: "Notification service is not configured" },
      { status: 500, headers: corsHeaders },
    );
  }

  if (!authorization) {
    return Response.json(
      { error: "Authentication is required" },
      { status: 401, headers: corsHeaders },
    );
  }

  try {
    const payload: DeletionNotificationRequest = await req.json();

    if (
      !payload.request_id ||
      !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
        .test(payload.request_id)
    ) {
      return Response.json(
        { error: "A valid request ID is required" },
        { status: 400, headers: corsHeaders },
      );
    }

    const userClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authorization } },
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const {
      data: { user },
      error: userError,
    } = await userClient.auth.getUser();

    if (userError || !user?.email) {
      return Response.json(
        { error: "The signed-in account could not be verified" },
        { status: 401, headers: corsHeaders },
      );
    }

    const adminClient = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const { data: deletionRequest, error: requestError } =
      await adminClient
        .from("account_deletion_requests")
        .select(
          "id, user_id, account_email, status, requested_at, confirmation_sent_at",
        )
        .eq("id", payload.request_id)
        .maybeSingle();

    if (requestError || !deletionRequest) {
      console.error("Deletion request lookup failed:", requestError);
      return Response.json(
        { error: "The deletion request could not be found" },
        { status: 404, headers: corsHeaders },
      );
    }

    const accountEmail = user.email.toLowerCase().trim();

    if (
      deletionRequest.user_id !== user.id ||
      !deletionRequest.account_email ||
      deletionRequest.account_email.toLowerCase().trim() !== accountEmail
    ) {
      return Response.json(
        { error: "You cannot send a receipt for this request" },
        { status: 403, headers: corsHeaders },
      );
    }

    if (deletionRequest.confirmation_sent_at) {
      return Response.json(
        { success: true, already_sent: true },
        { headers: corsHeaders },
      );
    }

    if (
      !["pending", "identity_verified", "processing"].includes(
        deletionRequest.status,
      )
    ) {
      return Response.json(
        { error: "This deletion request is no longer open" },
        { status: 409, headers: corsHeaders },
      );
    }

    const { data: profile } = await adminClient
      .from("profiles")
      .select("display_name, membership_status")
      .eq("id", user.id)
      .maybeSingle();

    const memberName = profile?.display_name || "PawCircle Membership Member";
    const membershipStatus = profile?.membership_status || "unknown";
    const requestedAt = new Date(deletionRequest.requested_at)
      .toLocaleString("en-US", {
        timeZone: "America/Chicago",
        dateStyle: "medium",
        timeStyle: "short",
      });

    const safeName = escapeHtml(memberName);
    const safeEmail = escapeHtml(accountEmail);
    const safeStatus = escapeHtml(membershipStatus);
    const safeRequestId = escapeHtml(deletionRequest.id);
    const safeRequestedAt = escapeHtml(requestedAt);

    await sendEmail(resendApiKey, {
      to: SUPPORT_EMAIL,
      subject: `PawCircle Membership deletion request — ${deletionRequest.id.slice(0, 8)}`,
      idempotencyKey: `pawcircle-deletion-admin-${deletionRequest.id}`,
      text: `A signed-in member of PawCircle Membership submitted an account and data deletion request.

Request ID: ${deletionRequest.id}
Member: ${memberName}
Account email: ${accountEmail}
Membership status: ${membershipStatus}
Requested: ${requestedAt} CT

The request is stored in public.account_deletion_requests.

Do not delete the account until identity, membership status, and deletion timing have been confirmed. Submitting this request did not automatically cancel billing, delete data, or create a refund. Membership fees already paid remain non-refundable.`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #243e63; max-width: 620px; margin: 0 auto;">
          <h2>🐾 PawCircle Membership account deletion request</h2>
          <p>A signed-in member submitted an account and data deletion request.</p>
          <table style="border-collapse: collapse; width: 100%; margin: 24px 0;">
            <tr><td style="padding: 8px; font-weight: 700;">Request ID</td><td style="padding: 8px;">${safeRequestId}</td></tr>
            <tr><td style="padding: 8px; font-weight: 700;">Member</td><td style="padding: 8px;">${safeName}</td></tr>
            <tr><td style="padding: 8px; font-weight: 700;">Account email</td><td style="padding: 8px;">${safeEmail}</td></tr>
            <tr><td style="padding: 8px; font-weight: 700;">Membership status</td><td style="padding: 8px;">${safeStatus}</td></tr>
            <tr><td style="padding: 8px; font-weight: 700;">Requested</td><td style="padding: 8px;">${safeRequestedAt} CT</td></tr>
          </table>
          <p><strong>The request is stored in the Supabase account_deletion_requests table.</strong></p>
          <p>Do not delete the account until identity, membership status, and deletion timing have been confirmed.</p>
          <p><strong>Submitting this request did not automatically cancel billing, delete data, or create a refund. Membership fees already paid remain non-refundable.</strong></p>
        </div>
      `,
    });

    await sendEmail(resendApiKey, {
      to: accountEmail,
      subject: "We received your PawCircle Membership deletion request",
      idempotencyKey: `pawcircle-deletion-member-${deletionRequest.id}`,
      text: `Hi ${memberName},

We received your request to delete your PawCircle Membership account and personal data.

Request ID: ${deletionRequest.id}
Requested: ${requestedAt} CT

This request did not immediately delete your account, cancel your membership, or create a refund. Membership fees already paid remain non-refundable.

PawCircle Membership will verify the request and contact you at this email address. If your membership is active, we will confirm whether deletion should occur now or after your paid access period ends.

You may review the request status in Account Settings:
${ACCOUNT_URL}

— PawCircle Membership`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #243e63; max-width: 620px; margin: 0 auto;">
          <h2>🐾 We received your deletion request</h2>
          <p>Hi ${safeName},</p>
          <p>We received your request to delete your PawCircle Membership account and personal data.</p>
          <p><strong>Request ID:</strong> ${safeRequestId}<br><strong>Requested:</strong> ${safeRequestedAt} CT</p>
          <p><strong>This request did not immediately delete your account, cancel your membership, or create a refund. Membership fees already paid remain non-refundable.</strong></p>
          <p>PawCircle Membership will verify the request and contact you at this email address. If your membership is active, we will confirm whether deletion should occur now or after your paid access period ends.</p>
          <p style="margin: 28px 0;"><a href="${ACCOUNT_URL}" style="display: inline-block; padding: 12px 20px; background: #5b21ff; color: #fff; text-decoration: none; border-radius: 999px; font-weight: 700;">View Account Settings</a></p>
          <p>— PawCircle Membership</p>
        </div>
      `,
    });

    const confirmationSentAt = new Date().toISOString();
    const { error: updateError } = await adminClient
      .from("account_deletion_requests")
      .update({
        confirmation_sent_at: confirmationSentAt,
        updated_at: confirmationSentAt,
      })
      .eq("id", deletionRequest.id)
      .eq("user_id", user.id)
      .is("confirmation_sent_at", null);

    if (updateError) {
      console.error("Deletion request receipt timestamp failed:", updateError);
    }

    return Response.json(
      { success: true, confirmation_sent_at: confirmationSentAt },
      { headers: corsHeaders },
    );
  } catch (error) {
    console.error("Deletion request notification error:", error);
    return Response.json(
      { error: "The request was saved, but its email receipt could not be sent" },
      { status: 502, headers: corsHeaders },
    );
  }
});
