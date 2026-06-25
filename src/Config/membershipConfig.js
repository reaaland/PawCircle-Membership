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
    name: "Founder Membership",
    price: "$10/year",
    billing: "Annual",
    description:
      "Founder Members lock in Founder pricing while their membership remains active.",
  },

  owner: {
    name: "Pet Owner Membership",
    price: "$1.50/month or $15/year",
    billing: "Monthly or Annual",
    description: "For members looking for pet services.",
  },

  provider: {
    name: "Pet Service Provider Membership",
    price: "$1.50/month or $15/year",
    billing: "Monthly or Annual",
    description: "For members offering pet services.",
  },

  both: {
    name: "Owner + Provider Membership",
    price: "$2/month or $20/year",
    billing: "Monthly or Annual",
    description:
      "For members who are both pet owners and pet service providers.",
  },
};


export const stripePricingTables = {
  owner: "prctbl_1TgtKXGgktsetxqRUcLjBLie",
  provider: "prctbl_1TgtMDGgktsetxqREu7vZP8J",
  both: "prctbl_1TgtNzGgktsetxqR7UC17Bfu",
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