import siteConfig from '@/config/site.json';
import themeConfig from '@/config/theme.json';
import servicesConfig from '@/config/services.json';

export type SiteConfig = typeof siteConfig;
export type ThemeConfig = typeof themeConfig;
export type ServicesConfig = typeof servicesConfig;

/**
 * Site configuration with company info, contact details, and SEO settings
 */
export const getSiteConfig = (): SiteConfig => {
  return siteConfig;
};

/**
 * Theme configuration with colors, fonts, and styling options
 */
export const getThemeConfig = (): ThemeConfig => {
  return themeConfig;
};

/**
 * Services configuration with service types and text content
 */
export const getServicesConfig = (): ServicesConfig => {
  return servicesConfig;
};

/**
 * Get a specific service by its slug
 */
export const getServiceBySlug = (slug: string) => {
  return servicesConfig.serviceTypes.find(service => service.slug === slug);
};

/**
 * Check if a service slug is valid
 */
export const isValidService = (slug: string): boolean => {
  return servicesConfig.serviceTypes.some(service => service.slug === slug);
};

/**
 * Get all service slugs - useful for static path generation
 */
export const getAllServiceSlugs = (): string[] => {
  return servicesConfig.serviceTypes.map(service => service.slug);
};

/**
 * Get formatted metadata title using the site's title template
 */
export const getFormattedTitle = (title: string): string => {
  return siteConfig.seo.titleTemplate.replace('%s', title);
};

/**
 * Replace location placeholder in strings with actual location
 * @example "Services in %location%" becomes "Services in New York, NY"
 */
export const formatWithLocation = (text: string, location: string): string => {
  return text.replace(/%location%/g, location);
};
