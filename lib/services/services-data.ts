export interface Service {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  slug: string;
  icon?: string; // Used for icon representation
}

export const services: Service[] = [
  {
    id: 'ac-install',
    name: 'AC Installation',
    description: 'Professional air conditioning installation services for residential and commercial properties in your area. Our certified technicians ensure proper sizing, efficient installation, and optimal performance.',
    shortDescription: 'Expert installation of energy-efficient air conditioning systems',
    slug: 'ac-install',
    icon: 'snowflake'
  },
  {
    id: 'furnace-repair',
    name: 'Furnace Repair',
    description: 'Quick and reliable furnace repair services to restore heating to your home or business. We diagnose and fix issues with all furnace types and brands, with same-day service available in most areas.',
    shortDescription: 'Fast, reliable repairs for all furnace makes and models',
    slug: 'furnace-repair',
    icon: 'flame'
  },
  {
    id: 'hvac-maintenance',
    name: 'HVAC Maintenance',
    description: 'Regular maintenance plans to keep your heating and cooling systems running efficiently year-round. Our comprehensive tune-ups prevent costly breakdowns and extend the life of your equipment.',
    shortDescription: 'Preventative maintenance to maximize system efficiency and lifespan',
    slug: 'hvac-maintenance',
    icon: 'settings'
  },
  {
    id: 'template-service',
    name: 'Template Service',
    description: 'This is a placeholder service that can be customized for any additional HVAC service. Add your specific service details and offerings here to provide customers with relevant information.',
    shortDescription: 'Customizable template for additional HVAC services',
    slug: 'template-service',
    icon: 'file'
  }
];

/**
 * Get a service by its slug
 */
export function getServiceBySlug(slug: string): Service | undefined {
  return services.find(service => service.slug === slug);
}

/**
 * Check if a service slug is valid
 */
export function isValidService(slug: string): boolean {
  return services.some(service => service.slug === slug);
}

/**
 * Get all service slugs - useful for static path generation
 */
export function getAllServiceSlugs(): string[] {
  return services.map(service => service.slug);
}
