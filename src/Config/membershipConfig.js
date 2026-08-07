import { supabase } from "../lib/supabase";

export async function getSiteSettings() {
 const { data, error } = await supabase
  .from("site_settings")
  .select("member_count, founder_count, founder_limit")
  .eq("id", 1)
  .maybeSingle();
  console.log("Site settings:", data);

  if (error) {
    console.error("Error loading site settings:", error.message);

    return {
      member_count: 0,
      founder_count: 0,
      founder_limit: 500,
    };
  }

  return data;
}

export const membershipInfo = {
  founder: {
    name: "Original Founder Membership",
    price: "Retired",
    billing: "No live billing",
    description:
      "Founder Members lock in Founder pricing while their membership remains active.",
  },

  owner: {
    name: "Pet Owner Membership",
    price: "Demo role",
    billing: "No live billing",
    description: "For members looking for pet services.",
  },

  provider: {
    name: "Pet Service Provider Membership",
    price: "Demo role",
    billing: "No live billing",
    description: "For members offering pet services.",
  },

  both: {
    name: "Owner + Provider Membership",
    price: "Demo role",
    billing: "No live billing",
    description:
      "For members who are both pet owners and pet service providers.",
  },
};

export const availabilityStatuses = [
  {
    value: "accepting",
    label: "🟢 Accepting New Clients",
  },
  {
    value: "limited",
    label: "🟡 Limited Availability (Select Requests)",
  },
  {
    value: "notAccepting",
    label: "🔴 Not Accepting New Clients",
  },
];
