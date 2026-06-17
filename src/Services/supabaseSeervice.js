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