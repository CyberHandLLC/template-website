import { notFound } from 'next/navigation';
import { getLocationData } from '@/lib/location/location-service';
import { createLocationSlug, formatServiceName } from '@/lib/utils';

const VALID_SERVICES = ['template-service', 'ac-install', 'furnace-repair', 'hvac-maintenance'];

type ServicePageParams = {
  service: string;
};

export default async function ServicePage({ params }: { params: ServicePageParams }) {
  const { service } = params;
  
  if (!VALID_SERVICES.includes(service)) {
    notFound();
  }
  
  const { city, region, country } = await getLocationData();
  const displayLocation = city && region ? `${city}, ${region}` : (city || region || country || 'your area');
  const locationSlug = createLocationSlug(city, region, displayLocation.toLowerCase().replace(/\s+/g, '-'));
  const serviceDisplay = formatServiceName(service);
  
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-sky-400">{serviceDisplay}</h1>
        <div className="mb-8 p-6 bg-white/10 backdrop-blur-sm rounded-lg shadow-lg">
          <p className="text-lg mb-4">We offer {serviceDisplay} in {displayLocation}.</p>
          <p className="mb-4">Click below to see specific information for your location.</p>
          <div className="mt-6">
            <a 
              href={`/${service}/${locationSlug}`}
              className="px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-lg shadow-lg transition inline-block"
            >
              {serviceDisplay} in {displayLocation}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}