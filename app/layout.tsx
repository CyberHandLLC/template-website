import React from 'react';
import { getLocationData } from '../lib/location/location-service';
import { Providers } from './providers';
import './globals.css';

/**
 * Root Layout Component - Server Component
 *
 * Next.js 15 layout best practices:
 * - Server Component by default for improved performance
 * - Comprehensive metadata setup with separate viewport config
 * - Providers isolated to client-only needs
 * - Performance monitoring with Web Vitals
 */

// Structured metadata for better SEO
export const metadata = {
  title: 'Next.js Template App',
  description: 'A modern Next.js application template with location-based content customization.',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locationData = await getLocationData();
  return (
    <html lang="en">
      <head>
        {/* Basic meta tags for viewport and charset */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="antialiased text-body bg-background text-slate-200">
        {/* Apply providers at the root level */}
        <Providers locationData={locationData}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
