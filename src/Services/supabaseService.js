import { supabase } from "../lib/supabase";

export async function getProfiles() {
  const { data, error } = await supabase
    .from("profiles")
    .select("*");

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