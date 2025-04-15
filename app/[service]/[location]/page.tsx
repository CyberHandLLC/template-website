import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const VALID_SERVICES = ['template-service', 'ac-install', 'furnace-repair', 'hvac-maintenance'];

// Format text from slug (e.g., 'service-name' -> 'Service Name')
function formatName(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Format location with city-state detection
function formatLocationName(locationSlug: string): string {
  try {
    // Decode URL-encoded characters if needed
    if (locationSlug.includes('%')) locationSlug = decodeURIComponent(locationSlug);
    
    const parts = locationSlug.split('-');
    
    // Check for state code pattern (city-state format)
    if (parts.length > 1 && parts[parts.length - 1].length === 2) {
      const state = parts.pop()?.toUpperCase();
      const city = parts.map(word => formatName(word)).join(' ');
      return `${city}, ${state}`;
    }
    
    // Just format as regular location name
    return formatName(locationSlug);
  } catch (e) {
    return formatName(locationSlug);
  }
}

export default async function ServiceLocationPage({ params }: { params: Promise<{ service: string; location: string }> }) {
  const { service, location } = await params;
  
  if (!VALID_SERVICES.includes(service)) {
    notFound();
  }
  
  const serviceDisplay = formatName(service);
  const locationDisplay = formatLocationName(location);
  
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-sky-400">{serviceDisplay} in {locationDisplay}</h1>
        <div className="mb-8 p-6 bg-white/10 backdrop-blur-sm rounded-lg shadow-lg">
          <p className="text-lg mb-4">Protech Heating & Cooling provides professional {serviceDisplay.toLowerCase()} services in {locationDisplay}.</p>
          <p className="mb-6">Our team of experienced technicians is ready to help with all your HVAC needs in the {locationDisplay} area.</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button asChild>
              <Link href="/">Back to Home</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href={`/${service}`}>View All Locations</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ service: string; location: string }> }) {
  const { service, location } = await params;
  const serviceDisplay = formatName(service);
  const locationDisplay = formatLocationName(location);
  
  return {
    title: `${serviceDisplay} in ${locationDisplay} | Protech Heating & Cooling`,
    description: `Professional ${serviceDisplay.toLowerCase()} services in ${locationDisplay}. Contact Protech Heating & Cooling for all your HVAC needs.`
  };
}