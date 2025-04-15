import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combine class names with Tailwind utility
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generate location URL slug with city-state format
 * @param city - City name
 * @param region - Region/state code
 * @param fallback - Fallback slug if location not available
 * @returns URL-friendly location slug
 */
export function createLocationSlug(city?: string, region?: string, fallback = 'your-area'): string {
  if (city && region) {
    const citySlug = city.toLowerCase().replace(/[\s]+/g, '-');
    return `${citySlug}-${region.toLowerCase()}`;
  }
  return fallback;
}

/**
 * Format service name from slug
 * @param slug - Service slug (e.g., 'ac-install')
 * @returns Formatted service name (e.g., 'AC Install')
 */
export function formatServiceName(slug: string): string {
  return slug.split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
