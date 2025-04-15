import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PageLayout } from '@/components/services/PageLayout';
import { ContentCard } from '@/components/services/ContentCard';
import { getServiceBySlug, isValidService, getServiceCTAText } from '@/lib/services/service-utils';

// Format text from slug (e.g., 'service-name' -> 'Service Name')
function formatName(slug: string): string {
    return slug.split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

// Format location with city-state detection
function formatLocationName(locationSlug: string): string {
    try {
        if (locationSlug.includes('%')) locationSlug = decodeURIComponent(locationSlug);
        const parts = locationSlug.split('-');
        
        if (parts.length > 1 && parts[parts.length - 1].length === 2) {
            const state = parts.pop()?.toUpperCase();
            const city = parts.map(word => formatName(word)).join(' ');
            return `${city}, ${state}`;
        }
        
        return formatName(locationSlug);
    } catch {
        return formatName(locationSlug);
    }
}

export default async function ServiceLocationPage({ params }: { params: Promise<{ service: string; location: string }> }) {
    const { service, location } = await params;
    if (!isValidService(service)) notFound();

    const serviceData = getServiceBySlug(service);
    const { backToHome, backToServices } = getServiceCTAText();
    
    const serviceDisplay = serviceData?.name || formatName(service);
    const locationDisplay = formatLocationName(location);
    
    return (
        <PageLayout 
            title={<>{serviceDisplay} in {locationDisplay}</>} 
            subtitle={<>Professional <span className="font-semibold text-sky-400">{serviceDisplay.toLowerCase()}</span> services in <span className="font-semibold">{locationDisplay}</span></>}
        >
            <ContentCard>
                <div className="space-y-4">
                    <p className="text-lg">{serviceData?.description}</p>
                    <p>Our team of experienced technicians is ready to help with all your needs in the {locationDisplay} area.</p>
                    
                    <div className="flex flex-wrap gap-4 mt-8">
                        <Button asChild>
                            <Link href="/">{backToHome}</Link>
                        </Button>
                        <Button asChild variant="outline">
                            <Link href={`/services/${service}`}>Back to Service</Link>
                        </Button>
                        <Button asChild variant="secondary">
                            <Link href="/services">{backToServices}</Link>
                        </Button>
                    </div>
                </div>
            </ContentCard>
        </PageLayout>
    );
}

export async function generateMetadata({ params }: { params: Promise<{ service: string; location: string }> }) {
    const { service, location } = await params;
    const serviceData = getServiceBySlug(service);
    const serviceDisplay = serviceData?.name || formatName(service);
    const locationDisplay = formatLocationName(location);

    return {
        title: `${serviceDisplay} in ${locationDisplay}`,
        description: `Professional ${serviceDisplay.toLowerCase()} services in ${locationDisplay}. Contact us for all your needs.`
    };
}