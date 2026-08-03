// Setup type definitions for Supabase Edge Functions
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { withSupabase } from "jsr:@supabase/server@^1";
import { corsHeaders } from "jsr:@supabase/supabase-js@2/cors";

interface NotificationRequest {
  message_id: string;
}

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const MESSAGES_URL =
  "https://www.pawcirclemembership.com/messages";

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

const notificationHandler = withSupabase(
    { auth: "user" },

    async (req, ctx) => {
      if (req.method !== "POST") {
        return Response.json(
          { error: "Method not allowed" },
          { status: 405 },
        );
      }

      if (!RESEND_API_KEY) {
        console.error("RESEND_API_KEY is missing");

        return Response.json(
          { error: "Email service is not configured" },
          { status: 500 },
        );
      }

      try {
        const payload: NotificationRequest = await req.json();
        const senderId = ctx.userClaims?.id;

        if (!payload.message_id || !senderId) {
          return Response.json(
            { error: "Invalid notification request" },
            { status: 400 },
          );
        }

        const { data: message, error: messageError } =
          await ctx.supabaseAdmin
            .from("messages")
            .select("id, sender_id, recipient_id, created_at")
            .eq("id", payload.message_id)
            .single();

        if (messageError || !message) {
          console.error("Message lookup failed:", messageError);

          return Response.json(
            { error: "Message could not be found" },
            { status: 404 },
          );
        }

        if (message.sender_id !== senderId) {
          return Response.json(
            { error: "You cannot send this notification" },
            { status: 403 },
          );
        }

        const messageAge =
          Date.now() - new Date(message.created_at).getTime();
        const clockSkewAllowance = 60 * 1000;
        const tenMinutes = 10 * 60 * 1000;

        if (
          messageAge < -clockSkewAllowance ||
          messageAge > tenMinutes
        ) {
          return Response.json(
            { error: "This message is too old to notify" },
            { status: 409 },
          );
        }

        const { data: recipient, error: recipientError } =
          await ctx.supabaseAdmin
            .from("profiles")
            .select("email, display_name")
            .eq("id", message.recipient_id)
            .single();

        if (recipientError || !recipient?.email) {
          console.error(
            "Recipient lookup failed:",
            recipientError,
          );

          return Response.json(
            { error: "Recipient could not be found" },
            { status: 404 },
          );
        }

        const recipientName = escapeHtml(
          recipient.display_name || "PawCircle Member",
        );

        const resendResponse = await fetch(
          "https://api.resend.com/emails",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${RESEND_API_KEY}`,
              "Content-Type": "application/json",
              "User-Agent": "PawCircle/1.0",
              "Idempotency-Key":
                `pawcircle-message-${message.id}`,
            },
            body: JSON.stringify({
              from:
                "PawCircle <notifications@pawcirclemembership.com>",
              to: [recipient.email],
              subject: "You have a new PawCircle message 🐾",

              text: `Hi ${recipient.display_name || "PawCircle Member"},

You have a new introductory message waiting for you on PawCircle.

To protect your privacy, messages are only available after logging in to your PawCircle account.

View your messages:
${MESSAGES_URL}

Thank you for being part of the PawCircle community.

— The PawCircle Team`,

              html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 560px; margin: 0 auto;">
                  <h2 style="margin-bottom: 20px;">🐾 PawCircle</h2>

                  <p>Hi ${recipientName},</p>

                  <p>
                    You have a new introductory message waiting for
                    you on PawCircle.
                  </p>

                  <p>
                    To protect your privacy, messages are only
                    available after logging in to your PawCircle
                    account.
                  </p>

                  <p style="margin: 28px 0;">
                    <a
                      href="${MESSAGES_URL}"
                      style="
                        display: inline-block;
                        padding: 12px 20px;
                        background: #222;
                        color: #fff;
                        text-decoration: none;
                        border-radius: 6px;
                      "
                    >
                      View My Messages
                    </a>
                  </p>

                  <p>
                    Thank you for being part of the PawCircle
                    community.
                  </p>

                  <p>— The PawCircle Team</p>
                </div>
              `,
            }),
          },
        );

        const resendResult = await resendResponse.json();

        if (!resendResponse.ok) {
          console.error("Resend error:", resendResult);

          return Response.json(
            {
              error: "Notification email could not be sent",
              details: resendResult,
            },
            { status: 502 },
          );
        }

        console.info(
          `Notification sent for message ${message.id}`,
        );

        return Response.json({
          success: true,
          email_id: resendResult.id,
        });
      } catch (error) {
        console.error("Notification function error:", error);

        return Response.json(
          { error: "Unexpected notification error" },
          { status: 500 },
        );
      }
    },
  );

export default {
  async fetch(req: Request) {
    if (req.method === "OPTIONS") {
      return new Response("ok", { headers: corsHeaders });
    }

    const response = await notificationHandler(req);
    const responseHeaders = new Headers(response.headers);

    Object.entries(corsHeaders).forEach(([key, value]) => {
      responseHeaders.set(key, value);
    });

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });
  },
};
