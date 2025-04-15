import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getLocationData } from '@/lib/location/location-service';
import { createLocationSlug } from '@/lib/utils';
import { getServiceById, isValidService } from '@/lib/services/services-data';
import { Button } from '@/components/ui/button';

// Force dynamic rendering to ensure location data is fresh on each request
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ServicePage({ params }: { params: Promise<{ service: string }> }) {
  const { service } = await params;
  
  // Validate service
  if (!isValidService(service)) {
    notFound();
  }
  
  // Get service data
  const serviceData = getServiceById(service);
  
  // Get location data
  const { city, region, country } = await getLocationData();
  const displayLocation = city && region ? `${city}, ${region}` : (city || region || country || 'your area');
  const locationSlug = createLocationSlug(city, region, displayLocation.toLowerCase().replace(/\s+/g, '-'));
  
  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Button asChild variant="ghost" size="sm">
              <Link href="/services">
                ← All Services
              </Link>
            </Button>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-sky-400">{serviceData?.name}</h1>
        </header>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-lg shadow-lg p-6 mb-8">
          <p className="text-lg mb-6">{serviceData?.description}</p>
          <h2 className="text-xl font-semibold mb-4 text-sky-400">Service Available in {displayLocation}</h2>
          <p className="mb-6">
            Our team of certified technicians provides professional {serviceData?.name.toLowerCase()} services
            in {displayLocation} and surrounding areas.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild>
              <Link href={`/services/${service}/${locationSlug}`}>
                {serviceData?.name} in {displayLocation}
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/">
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ service: string }> }) {
  const { service } = await params;
  const serviceData = getServiceById(service);
  
  if (!serviceData) {
    return {
      title: 'Service Not Found',
      description: 'The requested service was not found.'
    };
  }
  
  return {
    title: `${serviceData.name} | Protech Heating & Cooling`,
    description: serviceData.description,
  };
}
