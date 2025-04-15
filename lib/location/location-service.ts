/**
 * Location Service
 *
 * Server-side utilities for working with geolocation data.
 * Extracts location information from headers set by middleware.
 */

import type { LocationData } from "./location-context";
import { headers } from "next/headers";

// Default location when no data is available
const DEFAULT_LOCATION: LocationData = {
  isDetected: false,
  lastUpdated: Date.now(),
};

/**
 * Extract location data from headers object
 */
function extractLocationFromHeaders(headersList: Headers): LocationData {
  try {
    // Extract geolocation headers
    const country = headersList.get("x-vercel-ip-country") || undefined;
    const city = headersList.get("x-vercel-ip-city") || undefined;
    const region = headersList.get("x-vercel-ip-country-region") || undefined;
    const timezone = headersList.get("x-vercel-ip-timezone") || undefined;
    const continent = headersList.get("x-vercel-ip-continent") || undefined;
    
    // Parse coordinate headers if present
    const latitudeStr = headersList.get("x-vercel-ip-latitude");
    const longitudeStr = headersList.get("x-vercel-ip-longitude");
    const latitude = latitudeStr ? parseFloat(latitudeStr) : undefined;
    const longitude = longitudeStr ? parseFloat(longitudeStr) : undefined;
    
    return {
      country,
      city,
      region,
      timezone,
      continent,
      latitude,
      longitude,
      isDetected: Boolean(country || city),
      lastUpdated: Date.now(),
    };
  } catch (error) {
    console.error("Error extracting location from headers:", error);
    return { ...DEFAULT_LOCATION, lastUpdated: Date.now() };
  }
}

/**
 * Get location data from request headers (Server Component Only)
 * Uses the headers() API at the component level
 *
 * @returns Location data from request headers
 */
export function getLocationData(): LocationData {
  try {
    // In Next.js 15, headers() returns a ReadonlyHeaders object directly
    const headersList = headers();
    // If using mock data in development, return default values
    if (!headersList) {
      console.log('Headers not available, using default location');
      return { ...DEFAULT_LOCATION, lastUpdated: Date.now() };
    }
    
    return extractLocationFromHeaders(headersList);
  } catch (error) {
    console.warn('Error getting location data:', error);
    return { ...DEFAULT_LOCATION, lastUpdated: Date.now() };
  }
}

/**
 * Server Component helper to check if a user is in a specific country
 */
export async function isInCountry(countryCode: string): Promise<boolean> {
  try {
    const { country } = await getLocationData();
    return country === countryCode;
  } catch (_) {
    return false;
  }
}

/**
 * Server Component helper to check if a user is in a specific region/state
 */
export async function isInRegion(regionCode: string): Promise<boolean> {
  try {
    const { region } = await getLocationData();
    return region === regionCode;
  } catch (_) {
    return false;
  }
}

/**
 * Server Component helper to check if a user is in a specific continent
 */
export async function isInContinent(continentCode: string): Promise<boolean> {
  try {
    const { continent } = await getLocationData();
    return continent === continentCode;
  } catch (_) {
    return false;
  }
}

/**
 * Server Component helper to format the user's location as a string
 * Example: "San Francisco, CA, US"
 */
export async function getFormattedLocation(): Promise<string> {
  try {
    const { city, region, country } = await getLocationData();

    if (!city && !region && !country) {
      return "Unknown Location";
    }

    const parts: string[] = [];
    if (city) parts.push(city);
    if (region) parts.push(region);
    if (country) parts.push(country);

    return parts.join(", ");
  } catch (_) {
    return "Unknown Location";
  }
}

/**
 * Lighter version of location extraction for middleware
 * Only extracts the most essential fields to minimize processing
 */
export function getLiteLocationFromHeaders(headers: Headers): {
  country?: string;
  city?: string;
  region?: string;
} {
  try {
    return {
      country: headers.get("x-vercel-ip-country") || undefined,
      city: headers.get("x-vercel-ip-city") || undefined,
      region: headers.get("x-vercel-ip-country-region") || undefined,
    };
  } catch (_) {
    console.error("Error extracting lite location from headers");
    return {};
  }
}
