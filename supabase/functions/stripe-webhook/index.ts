import "@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

Deno.serve(async (req) => {
  try {
    const body = await req.json();

    console.log("Stripe webhook received:", body.type);

    if (body.type !== "checkout.session.completed") {
      return Response.json({ received: true });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !serviceRoleKey) {
      throw new Error("Missing Supabase environment variables.");
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const { data: settings, error: fetchError } = await supabase
      .from("site_settings")
      .select("member_count")
      .eq("id", 1)
      .single();

    if (fetchError) {
      throw fetchError;
    }

    const nextMemberCount = settings.member_count + 1;

    const { error: updateError } = await supabase
      .from("site_settings")
      .update({ member_count: nextMemberCount })
      .eq("id", 1);

    if (updateError) {
      throw updateError;
    }

    return Response.json({
      received: true,
      member_count: nextMemberCount,
    });
  } catch (error) {
    console.error("Webhook error:", error.message);

    return Response.json(
      { error: error.message },
      { status: 400 },
    );
  }
});