import { notFound } from 'next/navigation';
import { getLocationData } from '@/lib/location/location-service';

const VALID_SERVICES = ['template-service', 'ac-install', 'furnace-repair', 'hvac-maintenance'];

// Format service name from slug (e.g., 'ac-install' -> 'Ac Install')
function formatServiceName(slug: string): string {
  return slug.split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Generate location URL slug with city-state format
function createLocationSlug(city?: string, region?: string, fallback = 'your-area'): string {
  if (city && region) {
    const citySlug = city.toLowerCase().replace(/[\s]+/g, '-');
    return `${citySlug}-${region.toLowerCase()}`;
  }
  return fallback;
}

export default async function ServicePage({ params }: { params: Promise<{ service: string }> }) {
  const { service } = await params;
  
  if (!VALID_SERVICES.includes(service)) {
    notFound();
  }
  
  const { city, region, country } = await getLocationData();
  const displayLocation = city && region ? `${city}, ${region}` : (city || region || country || 'your area');
  const locationSlug = createLocationSlug(city, region, displayLocation.toLowerCase().replace(/\\s+/g, '-'));
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