import { getLocationData } from '@/lib/location/location-service';
import { createLocationSlug } from '@/lib/utils';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PageLayout } from '@/components/services/PageLayout';
import { ContentCard } from '@/components/services/ContentCard';
import { ServiceCard } from '@/components/services/ServiceCard';
import { getAllServices, getServiceSectionTitles, getServiceCTAText } from '@/lib/services/service-utils';
import { getSiteConfig } from '@/lib/config';

// Force dynamic rendering to ensure location data is fresh on each request
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ServicesPage() {
  const [services, sectionTitles, ctaText, siteConfig] = [
    getAllServices(),
    getServiceSectionTitles(),
    getServiceCTAText(),
    getSiteConfig()
  ];
  
  const { city, region, country } = await getLocationData();
  const displayLocation = city && region ? `${city}, ${region}` : (city || region || country || 'your area');
  const locationSlug = createLocationSlug(city, region, displayLocation.toLowerCase().replace(/\s+/g, '-'));

  return (
    <PageLayout 
      title={sectionTitles.servicesPage} 
      subtitle={
        <>{siteConfig.name} offers professional services in <span className="font-semibold text-sky-400">{displayLocation}</span></>
      }
    >
      <ContentCard>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {services.map(service => (
            <ServiceCard key={service.id} service={service} locationSlug={locationSlug} />
          ))}
        </div>
      </ContentCard>
      
      <div className="text-center mt-8">
        <Button asChild variant="outline">
          <Link href="/">{ctaText.backToHome}</Link>
        </Button>
      </div>
    </PageLayout>
  );
}

export function generateMetadata() {
  const { name, description } = getSiteConfig();
  return {
    title: `Services | ${name}`,
    description: `${description} Serving your local area with professional solutions.`,
  };
}