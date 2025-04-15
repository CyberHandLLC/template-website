import type { LocationData } from "./location-context";
import { headers } from "next/headers";

const DEFAULT_LOCATION: LocationData = {
  isDetected: false,
  lastUpdated: Date.now(),
};

const MOCK_LOCATION: LocationData = {
  country: "US",
  city: "Orrville",
  region: "OH",
  timezone: "America/New_York",
  continent: "NA",
  latitude: 40.836,
  longitude: -81.764,
  isDetected: true,
  lastUpdated: Date.now(),
};

import siteConfig from '../../config/site.json';

export async function getLocationData(): Promise<LocationData> {
  try {
    // Use mock data during build time
    if (process.env.NEXT_PHASE === 'phase-production-build') {
      return MOCK_LOCATION;
    }
    
    // For client-side rendering, use default location
    if (typeof window !== 'undefined') {
      return DEFAULT_LOCATION;
    }
    
    // Get headers safely - properly await in Next.js 15
    const headersList = await headers();
    
    // Extract location data from headers
    const country = headersList.get("x-vercel-ip-country") || undefined;
    const city = headersList.get("x-vercel-ip-city") || undefined;
    const region = headersList.get("x-vercel-ip-country-region") || undefined;
    const timezone = headersList.get("x-vercel-ip-timezone") || undefined;
    const continent = headersList.get("x-vercel-ip-continent") || undefined;
    
    // Parse coordinates if available
    const latStr = headersList.get("x-vercel-ip-latitude");
    const lngStr = headersList.get("x-vercel-ip-longitude");
    const latitude = latStr ? parseFloat(latStr) : undefined;
    const longitude = lngStr ? parseFloat(lngStr) : undefined;
    
    // Check if we have any location data
    const hasLocation = Boolean(country || city || region);

    // Prioritize service area matching
    const serviceAreas = siteConfig.serviceAreas || [];
    let matchedArea = null;
    let matchedCity = undefined;
    let matchedZip = undefined;
    let matchedCounty = undefined;

    // Try to match by city
    if (city) {
      for (const area of serviceAreas) {
        if (area.cities && area.cities.map(c => c.toLowerCase()).includes(city.toLowerCase())) {
          matchedArea = area;
          matchedCity = city;
          matchedCounty = area.county;
          break;
        }
      }
    }
    // Try to match by zip
    if (!matchedArea && headersList.get("x-vercel-ip-zip")) {
      const zip = headersList.get("x-vercel-ip-zip");
      for (const area of serviceAreas) {
        if (area.zips && area.zips.includes(zip)) {
          matchedArea = area;
          matchedZip = zip;
          matchedCounty = area.county;
          break;
        }
      }
    }

    // If no location data is found, return mock location
    if (!hasLocation) {
      return MOCK_LOCATION;
    }

    // Handle URL-encoded city names
    let decodedCity = city;
    if (city && city.includes('%')) {
      try {
        decodedCity = decodeURIComponent(city);
      } catch {
        // Keep original if decoding fails
        decodedCity = city;
      }
    }

    // If matched to a service area, prioritize its info
    if (matchedArea) {
      return {
        country: country || "US",
        city: matchedCity || decodedCity,
        region: region,
        timezone,
        continent,
        latitude,
        longitude,
        isDetected: true,
        lastUpdated: Date.now(),
        county: matchedCounty,
        zip: matchedZip,
        serviceAreaCounty: matchedCounty,
      };
    }

    return {
      country,
      city: decodedCity,
      region,
      timezone,
      continent,
      latitude,
      longitude,
      isDetected: true,
      lastUpdated: Date.now(),
    };
  } catch {
    return MOCK_LOCATION;
  }
}

export async function isInCountry(countryCode: string): Promise<boolean> {
  try {
    const { country } = await getLocationData();
    return country === countryCode;
  } catch {
    return false;
  }
}

export async function isInRegion(regionCode: string): Promise<boolean> {
  try {
    const { region } = await getLocationData();
    return region === regionCode;
  } catch {
    return false;
  }
}

export async function isInContinent(continentCode: string): Promise<boolean> {
  try {
    const { continent } = await getLocationData();
    return continent === continentCode;
  } catch {
    return false;
  }
}

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
  } catch {
    return "Unknown Location";
  }
}

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
  } catch {
    return {};
  }
}