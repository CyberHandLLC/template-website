import { notFound } from 'next/navigation';
import Link from 'next/link';

// List of valid services
const VALID_SERVICES = ['template-service', 'ac-install', 'furnace-repair', 'hvac-maintenance'];

// Generate service display name from slug
function formatServiceName(serviceSlug: string): string {
  return serviceSlug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Generate location display name from slug
function formatLocationName(locationSlug: string): string {
  // First decode any URL-encoded characters (like %20 for space)
  try {
    if (locationSlug.includes('%')) {
      locationSlug = decodeURIComponent(locationSlug);
    }
  } catch (e) {
    // If decoding fails, continue with the original string
    console.error('Error decoding location slug:', e);
  }
  
  // Split the slug into parts
  const parts = locationSlug.split('-');
  
  // Check if the last part looks like a state code (2 letters)
  // Example: "lewis-center-oh" -> ["lewis", "center", "oh"]
  let cityParts = parts;
  let statePart = null;
  
  if (parts.length > 1 && parts[parts.length - 1].length === 2) {
    // It looks like a state code is present
    statePart = parts[parts.length - 1].toUpperCase();
    cityParts = parts.slice(0, parts.length - 1);
  }
  
  // Format the city name (capitalize each word)
  const cityFormatted = cityParts
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  // If we have a state code, format as "City, STATE"
  if (statePart) {
    return `${cityFormatted}, ${statePart}`;
  }
  
  // Otherwise just return the formatted city name
  return cityFormatted;
}

export default async function ServiceLocationPage({ 
  params 
}: { 
  params: Promise<{ service: string; location: string }> 
}) {
  // In Next.js 15, params is a Promise that needs to be awaited
  const { service, location } = await params;
  
  // Check if service is valid
  if (!VALID_SERVICES.includes(service)) {
    notFound();
  }
  
  // Format service and location for display
  const serviceDisplay = formatServiceName(service);
  const locationDisplay = formatLocationName(location);
  
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-sky-400">
          {serviceDisplay} in {locationDisplay}
        </h1>
        
        <div className="mb-8 p-6 bg-white/10 backdrop-blur-sm rounded-lg shadow-lg">
          <p className="text-lg mb-4">
            Protech Heating & Cooling provides professional {serviceDisplay.toLowerCase()} services in {locationDisplay}.
          </p>
          
          <p className="mb-6">
            Our team of experienced technicians is ready to help with all your HVAC needs in the {locationDisplay} area.
          </p>
          
          <div className="mt-8">
            <Link 
              href="/"
              className="px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-lg shadow-lg transition inline-block mr-4"
            >
              Back to Home
            </Link>
            
            <Link 
              href={`/${service}`}
              className="px-6 py-3 bg-transparent border border-sky-500 hover:bg-sky-500/10 text-sky-400 font-semibold rounded-lg shadow-lg transition inline-block"
            >
              View All Locations
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Generate metadata for the page
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ service: string; location: string }> 
}) {
  // In Next.js 15, params is a Promise that needs to be awaited
  const { service, location } = await params;
  const serviceDisplay = formatServiceName(service);
  const locationDisplay = formatLocationName(location);
  
  return {
    title: `${serviceDisplay} in ${locationDisplay} | Protech Heating & Cooling`,
    description: `Professional ${serviceDisplay.toLowerCase()} services in ${locationDisplay}. Contact Protech Heating & Cooling for all your HVAC needs.`
  };
}