import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getServiceById, isValidService } from '@/lib/services/services-data';
import { Button } from '@/components/ui/button';

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
  
  // Validate service
  if (!isValidService(service)) {
    notFound();
  }
  
  // Get service data
  const serviceData = getServiceById(service);
  
  // Format location for display
  const locationDisplay = formatLocationName(location);
  
  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Button asChild variant="ghost" size="sm">
              <Link href={`/services/${service}`}>
                ← Back to {serviceData?.name}
              </Link>
            </Button>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-sky-400">{serviceData?.name} in {locationDisplay}</h1>
        </header>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-lg shadow-lg p-6 mb-8">
          <p className="text-lg mb-6">
            Protech Heating & Cooling provides professional {serviceData?.name.toLowerCase()} services in {locationDisplay}.
            Our team of certified technicians is available to assist you with all your HVAC needs.
          </p>
          
          <h2 className="text-xl font-semibold mb-4 text-sky-400">Why Choose Us in {locationDisplay}</h2>
          <ul className="list-disc list-inside space-y-2 mb-6">
            <li>Local expertise and familiarity with {locationDisplay} building codes and regulations</li>
            <li>Fast response times throughout the {locationDisplay} area</li>
            <li>Competitive pricing for all {locationDisplay} residents</li>
            <li>Fully licensed and insured for your peace of mind</li>
          </ul>
          
          <div className="flex flex-wrap gap-4 mt-6">
            <Button asChild>
              <Link href="/">
                Back to Home
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/services">
                View All Services
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ service: string; location: string }> }) {
  const { service, location } = await params;
  const serviceData = getServiceById(service);
  const locationDisplay = formatLocationName(location);
  
  return {
    title: `${serviceData?.name} in ${locationDisplay} | Protech Heating & Cooling`,
    description: `Professional ${serviceData?.name.toLowerCase()} services in ${locationDisplay}. Contact Protech Heating & Cooling for reliable HVAC solutions.`,
  };
}
