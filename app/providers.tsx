"use client";

import React, { ReactNode, createContext, useState } from "react";
import { ThemeProvider } from "@/lib/theme-context";
import type { LocationData } from "@/lib/location";

interface LocationContextType {
  location: LocationData;
}

const LocationContext = createContext<LocationContextType | null>(null);

function LocationProvider({ children, initialLocation }: { children: ReactNode; initialLocation: LocationData }) {
  const [location] = useState(initialLocation);
  return <LocationContext.Provider value={{ location }}>{children}</LocationContext.Provider>;
}

export function Providers({ children, locationData }: { children: ReactNode; locationData: LocationData }) {
  return (
    <ThemeProvider>
      <LocationProvider initialLocation={locationData}>{children}</LocationProvider>
    </ThemeProvider>
  );
}
