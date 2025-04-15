import React from 'react';
import { getLocationData } from '../lib/location/location-service';
import Link from 'next/link';

export default async function HomePage() {
  // Force fresh data retrieval with no caching
  const locationData = await getLocationData();
  console.log('Homepage location data:', locationData);
  
  const { city, region, country } = locationData;
  const displayLocation = city || region || country || 'your area';
  const locationSlug = displayLocation.toLowerCase().replace(/\s+/g, '-').replace(/\./, '');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
      <section className="max-w-3xl mx-auto py-16 bg-white/10 backdrop-blur-sm p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl md:text-5xl font-bold text-sky-400 mb-6">Protech Heating & Cooling</h1>
        
        <p className="text-lg md:text-xl mb-8">
          We offer <span className="font-semibold text-sky-400">Template Service</span> in <span className="font-semibold text-sky-400">{displayLocation}</span>
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href={`/template-service/${locationSlug}`} 
            className="px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-lg shadow-lg transition"
          >
            Learn More
          </Link>
        </div>
      </section>
    </div>
  );
}
