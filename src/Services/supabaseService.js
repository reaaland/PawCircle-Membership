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
  const { data, error } = await supabase
    .from("profiles")
    .upsert(profile, { onConflict: "email" })
    .select();

  if (error) {
    console.error("Error saving profile:", error);
    return { data: null, error };
  }

  return { data, error: null };
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