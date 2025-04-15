import { VALID_LOCATIONS, CITY_NAME_MAP } from "./location-utils";

export type SharedLocationInfo = {
  displayName: string;
  originalSlug: string;
  normalizedSlug: string;
  country?: string;
  region?: string;
  isValid: boolean;
};

export const LOCATION_REGIONS: Record<string, { country: string; region: string }> = {
  "new-york": { country: "US", region: "NY" },
  "lewis-center": { country: "US", region: "OH" },
  "los-angeles": { country: "US", region: "CA" },
  chicago: { country: "US", region: "IL" },
  "san-francisco": { country: "US", region: "CA" },
  miami: { country: "US", region: "FL" },
  seattle: { country: "US", region: "WA" },
  austin: { country: "US", region: "TX" },
  boston: { country: "US", region: "MA" },
  denver: { country: "US", region: "CO" },
  atlanta: { country: "US", region: "GA" },
};

export function formatLocationName(slug: string): string {
  if (!slug) return "";

  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function normalizeLocationSlug(location: string): string {
  if (!location) return "";

  return location
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export function isValidLocationSlug(location: string): boolean {
  if (!location) return false;
  const normalizedSlug = normalizeLocationSlug(location);

  return (
    VALID_LOCATIONS.includes(normalizedSlug) ||
    (normalizedSlug.length >= 3 && /^[a-z0-9][a-z0-9-]*[a-z0-9]$/.test(normalizedSlug))
  );
}

export function getSharedLocationInfo(locationSlug: string): SharedLocationInfo {
  if (!locationSlug) {
    return {
      isValid: false,
      displayName: "",
      originalSlug: "",
      normalizedSlug: "",
    };
  }

  const normalizedSlug = normalizeLocationSlug(locationSlug);
  const isValid = isValidLocationSlug(normalizedSlug);
  let displayName = "";

  if (CITY_NAME_MAP[normalizedSlug]) {
    displayName = CITY_NAME_MAP[normalizedSlug];
  } else {
    displayName = formatLocationName(normalizedSlug);
  }

  const regionData = LOCATION_REGIONS[normalizedSlug] || { country: "US", region: "" };

  return {
    isValid,
    displayName,
    originalSlug: locationSlug,
    normalizedSlug,
    ...regionData,
  };
}

export function getAmpLocationUrl(location: string): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://cyber-hand.com";
  return `${siteUrl}/services/${normalizeLocationSlug(location)}?amp=1`;
}
