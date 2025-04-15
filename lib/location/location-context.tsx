"use client";

import { createContext, useContext, ReactNode, useState, useEffect } from "react";

export interface LocationData {
  country?: string;
  city?: string;
  region?: string;
  timezone?: string;
  continent?: string;
  latitude?: number;
  longitude?: number;
  isDetected: boolean;
  lastUpdated: number;
}

export interface LocationContextType {
  location: LocationData;
  overrideLocation: (newLocation: Partial<LocationData>) => void;
  resetLocation: () => void;
  isLoading: boolean;
  hasOverride: boolean;
}

const DEFAULT_LOCATION: LocationData = {
  isDetected: false,
  lastUpdated: Date.now(),
};

const LOCATION_OVERRIDE_KEY = "location-override";

const LocationContext = createContext<LocationContextType>({
  location: DEFAULT_LOCATION,
  overrideLocation: () => {},
  resetLocation: () => {},
  isLoading: false,
  hasOverride: false,
});

export function LocationProvider({
  children,
  initialLocation,
}: {
  children: ReactNode;
  initialLocation: LocationData;
}) {
  const [location, setLocation] = useState<LocationData>(initialLocation);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasOverride, setHasOverride] = useState<boolean>(false);

  useEffect(() => {
    try {
      const savedOverride = localStorage.getItem(LOCATION_OVERRIDE_KEY);
      if (savedOverride) {
        const parsedOverride = JSON.parse(savedOverride) as LocationData;
        setLocation(parsedOverride);
        setHasOverride(true);
      }
    } catch (error) {
      console.error("Error loading location override:", error);
    } finally {
      setIsLoading(false);
    }
  }, [initialLocation]);

  const overrideLocation = (newLocation: Partial<LocationData>) => {
    const updatedLocation: LocationData = {
      ...location,
      ...newLocation,
      isDetected: false,
      lastUpdated: Date.now(),
    };

    setLocation(updatedLocation);
    setHasOverride(true);

    try {
      localStorage.setItem(LOCATION_OVERRIDE_KEY, JSON.stringify(updatedLocation));
    } catch (error) {
      console.error("Error saving location override:", error);
    }
  };

  const resetLocation = () => {
    setLocation(initialLocation);
    setHasOverride(false);

    try {
      localStorage.removeItem(LOCATION_OVERRIDE_KEY);
    } catch (error) {
      console.error("Error removing location override:", error);
    }
  };

  const contextValue: LocationContextType = {
    location,
    overrideLocation,
    resetLocation,
    isLoading,
    hasOverride,
  };

  return <LocationContext.Provider value={contextValue}>{children}</LocationContext.Provider>;
}

export function useLocation() {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
}
