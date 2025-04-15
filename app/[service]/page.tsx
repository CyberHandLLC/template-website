import { notFound } from 'next/navigation';
import { getLocationData } from '@/lib/location/location-service';

// List of valid services
const VALID_SERVICES = ['template-service', 'ac-install', 'furnace-repair', 'hvac-maintenance'];

export default async function ServicePage({ params }: { params: { service: string } }) {
  const { service } = params;
  
  // Check if service is valid
  if (!VALID_SERVICES.includes(service)) {
    notFound();
  }
  
  // Get user's location
  const locationData = await getLocationData();
  const { city, region, country } = locationData;
  const displayLocation = city || region || country || 'your area';
  const locationSlug = displayLocation.toLowerCase().replace(/\\s+/g, '-');
  
  // Convert service slug to display name
  const serviceDisplay = service
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-sky-400">{serviceDisplay}</h1>
        
        <div className="mb-8 p-6 bg-white/10 backdrop-blur-sm rounded-lg shadow-lg">
          <p className="text-lg mb-4">
            We offer {serviceDisplay} in {displayLocation}.
          </p>
          
          <p className="mb-4">
            Click below to see specific information for your location.
          </p>
          
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