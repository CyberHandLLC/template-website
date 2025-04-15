import type { LocationData } from "./location-context";
export type { LocationData };

export {
  VALID_LOCATIONS,
  validateLocation,
  formatLocationName,
  generateLocationSlug as cityNameToSlug,
  generateLocationSlug as slugToCityName,
  validateLocation as isValidLocationSlug,
  getLocationInfo,
  type LocationParams,
  type LocationInfo,
} from "./location-utils";

export {
  getLocationData,
  getLiteLocationFromHeaders,
} from "./location-service";

export interface LocationContextType {
  location: LocationData;
  overrideLocation: (newLocation: Partial<LocationData>) => void;
  resetLocation: () => void;
  isLoading: boolean;
  hasOverride: boolean;
}

export type LocationSlug = string;
