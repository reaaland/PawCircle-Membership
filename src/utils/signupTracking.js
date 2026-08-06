export const ROLE_OPTIONS = [
  {
    value: "owner",
    profileType: "pet_owner",
    label: "Pet Owner",
    description: "I am looking for trusted pet care.",
  },
  {
    value: "provider",
    profileType: "pet_provider",
    label: "Pet Service Provider",
    description: "I offer pet care services.",
  },
  {
    value: "both",
    profileType: "both",
    label: "Pet Owner + Provider",
    description: "I both need and provide pet care.",
  },
];

const TRACKING_PARAMETERS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
];

export function getValidRole(value) {
  return ROLE_OPTIONS.some((option) => option.value === value) ? value : "";
}

export function getProfileType(role) {
  return (
    ROLE_OPTIONS.find((option) => option.value === role)?.profileType || ""
  );
}

export function sanitizeTrackingValue(value, fallback = "website") {
  const normalized = String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9_-]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 80);

  return normalized || fallback;
}

export function getSignupSource(searchParams, fallback = "join_page") {
  return sanitizeTrackingValue(
    searchParams.get("utm_source") || searchParams.get("source"),
    fallback,
  );
}

export function buildClientReference(profileType, source) {
  if (!profileType) return "";

  return `pc_${profileType}__${sanitizeTrackingValue(source)}`;
}

export function buildCheckoutUrl(
  paymentLink,
  { profileType, source, searchParams },
) {
  if (!paymentLink || !profileType) return "";

  const checkoutUrl = new URL(paymentLink);
  checkoutUrl.searchParams.set(
    "client_reference_id",
    buildClientReference(profileType, source),
  );

  TRACKING_PARAMETERS.forEach((parameter) => {
    const value = searchParams.get(parameter);

    if (value) {
      checkoutUrl.searchParams.set(
        parameter,
        sanitizeTrackingValue(value, ""),
      );
    }
  });

  return checkoutUrl.toString();
}

export function buildProviderJoinUrl(search) {
  const incomingParams = new URLSearchParams(search);

  incomingParams.set("role", "provider");

  if (!incomingParams.has("source")) {
    incomingParams.set("source", "for_providers");
  }

  return `/join?${incomingParams.toString()}`;
}
