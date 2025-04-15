import React from 'react';
import { getLocationData } from '@/lib/location/location-service';
import { Providers } from './providers';
import './globals.css';

export const metadata = {
  title: 'Next.js Template App',
  description: 'A modern Next.js application template with location-based content customization.',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locationData = await getLocationData();
  
  return (
    <html lang="en">
      <body className="antialiased text-body bg-background text-slate-200">
        <Providers locationData={locationData}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
