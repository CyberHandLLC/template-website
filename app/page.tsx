import React from 'react';
import { getLocationData } from '@/lib/location/location-service';
import Link from 'next/link';

// Force dynamic rendering to ensure location data is fresh on each request
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Generate location URL slug with city-state format
function createLocationSlug(city?: string, region?: string, fallback = 'your-area'): string {
  if (city && region) {
    const citySlug = city.toLowerCase().replace(/[\s]+/g, '-');
    return `${citySlug}-${region.toLowerCase()}`;
  }
  return fallback;
}

export default async function HomePage() {
  const { city, region, country } = await getLocationData();
  
  // Format location for display
  const displayLocation = city && region ? `${city}, ${region}` : (city || region || country || 'your area');
  
  // Create URL-friendly slug
  const locationSlug = createLocationSlug(
    city, 
    region, 
    displayLocation.toLowerCase().replace(/\s+/g, '-')
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
      <section className="max-w-3xl mx-auto py-16 bg-white/10 backdrop-blur-sm p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl md:text-5xl font-bold text-sky-400 mb-6">Protech Heating & Cooling</h1>
        <p className="text-lg md:text-xl mb-8">
          We offer <span className="font-semibold text-sky-400">Template Service</span> in <span className="font-semibold text-sky-400">{displayLocation}</span>
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={`/template-service/${locationSlug}`} className="px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-lg shadow-lg transition">Learn More</Link>
        </div>
      </section>
    </div>
  );
}
