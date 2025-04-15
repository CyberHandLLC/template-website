import React from 'react';
import Link from 'next/link';
import { getLocationData } from '@/lib/location/location-service';
import { createLocationSlug } from '@/lib/utils';
import { getAllServices } from '@/lib/services/services-data';
import { Button } from '@/components/ui/button';

// Force dynamic rendering to ensure location data is fresh on each request
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ServicesPage() {
  // Get user's location data
  const { city, region, country } = await getLocationData();
  const displayLocation = city && region ? `${city}, ${region}` : (city || region || country || 'your area');
  const locationSlug = createLocationSlug(city, region, displayLocation.toLowerCase().replace(/\s+/g, '-'));
  
  // Get all services
  const services = getAllServices();

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <section className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-sky-400">Our Services</h1>
          <p className="text-lg max-w-3xl mx-auto">
            Protech Heating & Cooling offers professional HVAC services in {displayLocation}. 
            Explore our range of services below.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div 
              key={service.id}
              className="bg-white/10 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden hover:bg-white/15 transition-colors"
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2 text-sky-400">{service.name}</h2>
                <p className="mb-4 text-sm">{service.shortDescription}</p>
                <div className="flex justify-between items-center">
                  <Button asChild variant="default" size="sm">
                    <Link href={`/services/${service.id}`}>
                      View Details
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/services/${service.id}/${locationSlug}`}>
                      In {city || 'Your Area'}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export async function generateMetadata() {
  return {
    title: 'HVAC Services | Protech Heating & Cooling',
    description: 'Professional heating, cooling, and HVAC services for residential and commercial properties. Serving Orrville, OH and surrounding areas.'
  };
}
