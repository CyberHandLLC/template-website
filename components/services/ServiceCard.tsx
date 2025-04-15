import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getServicesConfig } from '@/lib/config';
import { cn } from '@/lib/utils';

// Define service type based on our config structure
interface Service {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  slug: string;
  icon?: string;
  metaTitle?: string;
  metaDescription?: string;
}

type ServiceCardProps = {
  service: Service;
  locationSlug?: string;
}

export function ServiceCard({ service, locationSlug }: ServiceCardProps) {
  const { viewService } = getServicesConfig().callToActions;
  const href = locationSlug ? `/services/${service.slug}/${locationSlug}` : `/services/${service.slug}`;
  
  return (
    <div className="p-6 bg-white/5 hover:bg-white/10 rounded-lg shadow-lg transition-colors border border-sky-900/20">
      <h2 className="text-2xl font-semibold mb-3 text-sky-400">{service.name}</h2>
      <p className="mb-4 text-gray-300">{service.shortDescription}</p>
      <Button asChild className="w-full mt-2">
        <Link href={href}>{viewService}</Link>
      </Button>
    </div>
  );
}
