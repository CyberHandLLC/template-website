import { notFound } from 'next/navigation';
import { getLocationData } from '@/lib/location/location-service';
import { createLocationSlug } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PageLayout } from '@/components/services/PageLayout';
import { ContentCard } from '@/components/services/ContentCard';
import { getServiceBySlug, isValidService, getServiceCTAText } from '@/lib/services/service-utils';
import { getSiteConfig } from '@/lib/config';

export default async function ServicePage({ params }: { params: Promise<{ service: string }> }) {
    const { service } = await params;
    if (!isValidService(service)) notFound();

    const serviceData = getServiceBySlug(service);
    if (!serviceData) notFound();
    
    const { name: siteName } = getSiteConfig();
    const { backToServices } = getServiceCTAText();
    const { city, region, country } = await getLocationData();
    
    const displayLocation = city && region ? `${city}, ${region}` : (city || region || country || 'your area');
    const locationSlug = createLocationSlug(city, region, displayLocation.toLowerCase().replace(/\s+/g, '-'));

    return (
        <PageLayout 
            title={serviceData.name} 
            subtitle={
                <>{siteName} offers <span className="font-semibold text-sky-400">{serviceData.name}</span> in <span className="font-semibold">{displayLocation}</span></>
            }
        >
            <ContentCard>
                <div className="space-y-4">
                    <p className="text-lg">{serviceData.description}</p>
                    <p>Click below to see specific information for your location.</p>
                    
                    <div className="flex flex-wrap gap-4 mt-6">
                        <Button asChild variant="default">
                            <Link href={`/services/${service}/${locationSlug}`}>
                                {serviceData.name} in {displayLocation}
                            </Link>
                        </Button>
                        <Button asChild variant="outline">
                            <Link href="/services">{backToServices}</Link>
                        </Button>
                    </div>
                </div>
            </ContentCard>
        </PageLayout>
    );
}