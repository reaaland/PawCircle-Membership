import "@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";
import Stripe from "npm:stripe@^22";

const cryptoProvider = Stripe.createSubtleCryptoProvider();

const PRICE_TIERS: Record<
  string,
  {
    membership_level: string;
    membership_type: string;
    profile_type: string;
  }
> = {
  // Founder
  price_1TfSx6GgktsetxqR2IXgVcpB: {
    membership_level: "founder",
    membership_type: "founder",
    profile_type: "both",
  },

  // Pet Owner
  price_1TgtBFGgktsetxqRcI8kc831: {
    membership_level: "standard",
    membership_type: "owner",
    profile_type: "pet_owner",
  },
  price_1TgtBFGgktsetxqRLjMQtz9F: {
    membership_level: "standard",
    membership_type: "owner",
    profile_type: "pet_owner",
  },

  // Pet Service Provider
  price_1TgtFqGgktsetxqRqRICJsFe: {
    membership_level: "standard",
    membership_type: "provider",
    profile_type: "pet_provider",
  },
  price_1TgtFqGgktsetxqRZYcQBrxR: {
    membership_level: "standard",
    membership_type: "provider",
    profile_type: "pet_provider",
  },

  // Pet Owner + Service Provider
  price_1TgtHYGgktsetxqRpQ7kyshl: {
    membership_level: "standard",
    membership_type: "both",
    profile_type: "both",
  },
  price_1TgtHYGgktsetxqRS71vhuji: {
    membership_level: "standard",
    membership_type: "both",
    profile_type: "both",
  },
};

async function getCheckoutPriceId(sessionId: string, stripeSecretKey: string) {
  const cleanStripeSecretKey = stripeSecretKey.trim();

  const response = await fetch(
    `https://api.stripe.com/v1/checkout/sessions/${sessionId}/line_items?limit=1`,
    {
      headers: {
        Authorization: `Bearer ${cleanStripeSecretKey}`,
      },
    },
  );

  const lineItems = await response.json();

  if (!response.ok) {
    throw new Error(`Stripe line items error: ${lineItems.error?.message}`);
  }

  const priceId = lineItems.data?.[0]?.price?.id;

  if (!priceId) {
    throw new Error("No Stripe price ID found on checkout session.");
  }

  return priceId;
}

function parseSignupReference(clientReferenceId: string | null | undefined) {
  const match = /^pc_(pet_owner|pet_provider|both)__([a-z0-9_-]{1,80})$/.exec(
    clientReferenceId || "",
  );

  if (!match) return null;

  return {
    profileType: match[1],
    source: match[2],
  };
}

Deno.serve(async (req) => {
  let claimedEventId: string | null = null;
  let supabase: ReturnType<typeof createClient<any>> | null = null;

  const markEventProcessed = async () => {
    if (!supabase || !claimedEventId) return;

    const { error } = await supabase.rpc(
      "mark_stripe_webhook_event_processed",
      {
        p_event_id: claimedEventId,
      },
    );

    if (error) throw error;

    claimedEventId = null;
  };

  try {
    const rawBody = await req.text();
    const signature = req.headers.get("stripe-signature");

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY")?.trim();
    const stripeWebhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET")?.trim();

    if (
      !supabaseUrl ||
      !serviceRoleKey ||
      !stripeSecretKey ||
      !stripeWebhookSecret
    ) {
      throw new Error("Missing environment variables.");
    }
    if (!signature) {
      throw new Error("Missing Stripe-Signature header.");
    }

    const stripe = new Stripe(stripeSecretKey);

    const body = await stripe.webhooks.constructEventAsync(
      rawBody,
      signature,
      stripeWebhookSecret,
      undefined,
      cryptoProvider,
    );

    console.log("Verified Stripe webhook received:", body.type);
    supabase = createClient(supabaseUrl, serviceRoleKey);

    const { data: claimed, error: claimError } = await supabase.rpc(
      "claim_stripe_webhook_event",
      {
        p_event_id: body.id,
        p_event_type: body.type,
      },
    );

    if (claimError) throw claimError;

    if (!claimed) {
      return Response.json({
        received: true,
        duplicate: true,
      });
    }

    claimedEventId = body.id;

    if (body.type === "checkout.session.completed") {
      const session = body.data.object;

      const customerId = session.customer;
      const subscriptionId = session.subscription;
      const metadata = session.metadata || {};
      const signupReference = parseSignupReference(
        session.client_reference_id,
      );

      let membershipType = metadata.membership_type;
      let membershipLevel = metadata.membership_level;
      let profileType = metadata.profile_type;

      if (!membershipType || !membershipLevel || !profileType) {
        if (!stripeSecretKey) {
          throw new Error("Missing STRIPE_SECRET_KEY for price lookup.");
        }

        const priceId = await getCheckoutPriceId(session.id, stripeSecretKey);
        const tier = PRICE_TIERS[priceId];

        if (!tier) {
          throw new Error(
            `No PawCircle membership mapping found for price: ${priceId}`,
          );
        }

        membershipType = tier.membership_type;
        membershipLevel = tier.membership_level;
        profileType = tier.profile_type;
      }

      if (signupReference) {
        profileType = signupReference.profileType;
      }

      const rawEmail =
        session.customer_details?.email || session.customer_email || "";

      const email = rawEmail.toLowerCase().trim();

      if (!email) {
        throw new Error("No customer email found on checkout session.");
      }

      const { data: activationRows, error: activationError } =
        await supabase.rpc("activate_membership_atomic", {
          p_email: email,
          p_membership_level: membershipLevel,
          p_membership_type: membershipType,
          p_profile_type: profileType,
          p_stripe_customer_id:
            typeof customerId === "string"
              ? customerId
              : (customerId?.id ?? null),
          p_stripe_subscription_id:
            typeof subscriptionId === "string"
              ? subscriptionId
              : (subscriptionId?.id ?? null),
        });

      if (activationError) throw activationError;

      const activation = activationRows?.[0];

      if (!activation) {
        throw new Error("Membership activation did not return a result.");
      }

      if (signupReference?.source) {
        const { error: trackingError } = await supabase
          .from("profiles")
          .update({ signup_source: signupReference.source })
          .eq("email", email);

        if (trackingError) {
          console.error("Unable to save signup source:", trackingError.message);
        }
      }

      await markEventProcessed();

      return Response.json({
        received: true,
        membership_status: "active",
        membership_level: membershipLevel,
        membership_type: membershipType,
        profile_type: profileType,
        member_number: activation.member_number,
        member_count: activation.member_count,
        founder_count: activation.founder_count,
        created_new_member: activation.created_new_member,
      });
    }

    if (
      body.type === "customer.subscription.created" ||
      body.type === "customer.subscription.updated"
    ) {
      const subscription = body.data.object;
      const customerId = subscription.customer;

      const membershipStatus =
        subscription.status === "active" || subscription.status === "trialing"
          ? "active"
          : "inactive";

      const { error } = await supabase
        .from("profiles")
        .update({
          membership_status: membershipStatus,
          stripe_customer_id: customerId,
          stripe_subscription_id: subscription.id,
        })
        .eq("stripe_customer_id", customerId);

      if (error) throw error;

      await markEventProcessed();

      return Response.json({
        received: true,
        membership_status: membershipStatus,
      });
    }

    if (
      body.type === "customer.subscription.deleted" ||
      body.type === "invoice.payment_failed"
    ) {
      const customerId = body.data.object.customer;

      const { error } = await supabase
        .from("profiles")
        .update({
          membership_status: "inactive",
        })
        .eq("stripe_customer_id", customerId);

      if (error) throw error;

      await markEventProcessed();

      return Response.json({
        received: true,
        membership_status: "inactive",
      });
    }

    await markEventProcessed();

    return Response.json({ received: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown webhook error";

    if (supabase && claimedEventId) {
      const { error: markFailedError } = await supabase.rpc(
        "mark_stripe_webhook_event_failed",
        {
          p_event_id: claimedEventId,
          p_error: message,
        },
      );

      if (markFailedError) {
        console.error(
          "Failed to mark Stripe webhook event as failed:",
          markFailedError.message,
        );
      }
    }

    console.error("Webhook error:", message);
    return Response.json({ error: message }, { status: 400 });
  }
});
