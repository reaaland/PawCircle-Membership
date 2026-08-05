import { supabase } from "../lib/supabase";

export async function getProfiles() {
  const { data, error } = await supabase.from("profiles").select("*");

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}

export async function getProviders() {
  const profiles = await getProfiles();

  return profiles.filter(
    (profile) =>
      profile.profile_type === "pet_provider" ||
      profile.profile_type === "both"
  );
}

export async function getPetOwners() {
  const profiles = await getProfiles();

  return profiles.filter(
    (profile) =>
      profile.profile_type === "pet_owner" ||
      profile.profile_type === "both"
  );
}

export async function saveProfile(profile) {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    const error =
      userError || new Error("You must be logged in to save a profile.");

    console.error("Error finding authenticated user:", error);

    return {
      data: null,
      error,
    };
  }

  const normalizedEmail = user.email?.toLowerCase().trim();

  const profileToSave = {
    ...profile,
    id: user.id,
    email: normalizedEmail,
  };

  const { data, error } = await supabase
    .from("profiles")
    .upsert(profileToSave, { onConflict: "email" })
    .select()
    .single();

  if (error) {
    console.error("Error saving profile:", error);

    return {
      data: null,
      error,
    };
  }

  return {
    data,
    error: null,
  };
}

export async function incrementMemberCount() {
  const { data: settings, error: fetchError } = await supabase
    .from("site_settings")
    .select("member_count")
    .eq("id", 1)
    .single();

  if (fetchError) {
    console.error("Error loading member count:", fetchError);
    return { data: null, error: fetchError };
  }

  const { data, error } = await supabase
    .from("site_settings")
    .update({
      member_count: settings.member_count + 1,
    })
    .eq("id", 1)
    .select()
    .single();

  if (error) {
    console.error("Error updating member count:", error);
    return { data: null, error };
  }

  return { data, error: null };
}

export async function sendMessage(recipientId, messageText) {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return {
      data: null,
      error: userError || new Error("Not authenticated"),
    };
  }

  const { data, error } = await supabase
    .from("messages")
    .insert({
      sender_id: user.id,
      recipient_id: recipientId,
      message_text: messageText.trim(),
    })
    .select()
    .single();

  return { data, error };
}

export async function getMessages() {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return {
      data: [],
      error: userError || new Error("Not authenticated"),
    };
  }

  const { data, error } = await supabase
    .from("messages")
    .select(`
      id,
      sender_id,
      recipient_id,
      message_text,
      is_read,
      created_at,
      sender:profiles!messages_sender_id_fkey (
        id,
        display_name
      ),
      recipient:profiles!messages_recipient_id_fkey (
        id,
        display_name
      )
    `)
    .or(`sender_id.eq.${user.id},recipient_id.eq.${user.id}`)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error loading messages:", error);

    return {
      data: [],
      error,
    };
  }

  return {
    data,
    error: null,
  };
}

export async function getMessagePreferences() {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return {
      data: {},
      error: userError || new Error("Not authenticated"),
    };
  }

  const { data, error } = await supabase
    .from("message_member_preferences")
    .select("message_id, is_saved, is_deleted")
    .eq("user_id", user.id);

  if (error) {
    console.error("Error loading message preferences:", error);
    return { data: {}, error };
  }

  const preferencesByMessageId = (data || []).reduce(
    (preferences, preference) => {
      preferences[preference.message_id] = {
        is_saved: preference.is_saved,
        is_deleted: preference.is_deleted,
      };

      return preferences;
    },
    {}
  );

  return { data: preferencesByMessageId, error: null };
}

export async function setMessagePreference(messageId, preference) {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return {
      data: null,
      error: userError || new Error("Not authenticated"),
    };
  }

  const { data, error } = await supabase
    .from("message_member_preferences")
    .upsert(
      {
        user_id: user.id,
        message_id: messageId,
        is_saved: Boolean(preference.is_saved),
        is_deleted: Boolean(preference.is_deleted),
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id,message_id" }
    )
    .select("message_id, is_saved, is_deleted")
    .single();

  if (error) {
    console.error("Error updating message preference:", error);
  }

  return { data, error };
}

export async function markConversationRead(otherMemberId) {
  const { error } = await supabase.rpc(
    "mark_conversation_read",
    {
      other_member_id: otherMemberId,
    }
  );

  if (error) {
    console.error(
      "Error marking conversation as read:",
      error
    );
  }

  return { error };
}
