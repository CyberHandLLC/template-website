import { getServicesConfig, formatWithLocation } from '@/lib/config';

export interface ServiceData {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  slug: string;
  icon?: string;
  metaTitle?: string;
  metaDescription?: string;
}

/**
 * Get all available services from configuration
 */
export function getAllServices(): ServiceData[] {
  const { serviceTypes } = getServicesConfig();
  return serviceTypes;
}

/**
 * Get a service by its slug
 */
export function getServiceBySlug(slug: string): ServiceData | undefined {
  const services = getAllServices();
  return services.find(service => service.slug === slug);
}

/**
 * Check if a service slug is valid
 */
export function isValidService(slug: string): boolean {
  const services = getAllServices();
  return services.some(service => service.slug === slug);
}

/**
 * Get all service slugs - useful for static path generation
 */
export function getAllServiceSlugs(): string[] {
  const services = getAllServices();
  return services.map(service => service.slug);
}

/**
 * Get service metadata for a specific location
 */
export function getServiceMetadata(service: ServiceData, location: string) {
  const title = service.metaTitle 
    ? formatWithLocation(service.metaTitle, location)
    : `${service.name} in ${location}`;
    
  const description = service.metaDescription
    ? formatWithLocation(service.metaDescription, location)
    : `Professional ${service.name.toLowerCase()} services in ${location}. Contact us for all your needs.`;
    
  return {
    title,
    description
  };
}

/**
 * Get text for buttons and CTAs from configuration
 */
export function getServiceCTAText() {
  const { callToActions } = getServicesConfig();
  return callToActions;
}

/**
 * Get section titles from configuration
 */
export function getServiceSectionTitles() {
  const { sectionTitles } = getServicesConfig();
  return sectionTitles;
}
