import { notFound } from 'next/navigation';
import { getLocationData } from '@/lib/location/location-service';
import { createLocationSlug, formatServiceName } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
const VALID_SERVICES = ['template-service', 'ac-install', 'furnace-repair', 'hvac-maintenance'];

export default async function ServicePage({ params }: { params: Promise<{ service: string }> }) {
  const { service } = await params;

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
            <Button
              asChild
              variant="default"
              size="default"
            >
              <Link href={`/${service}/${locationSlug}`}>
                {serviceDisplay} in {displayLocation}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}