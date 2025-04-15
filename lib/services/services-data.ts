export interface Service {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  icon?: string;
  imageUrl?: string;
}

const SERVICES: Service[] = [
  {
    id: 'ac-install',
    name: 'AC Installation',
    description: 'Professional air conditioning installation services for residential and commercial properties. Our expert technicians ensure your new system is properly sized and installed for maximum efficiency and comfort.',
    shortDescription: 'Expert installation of air conditioning systems for optimal comfort and efficiency.',
    icon: 'fan',
  },
  {
    id: 'furnace-repair',
    name: 'Furnace Repair',
    description: 'Fast, reliable furnace repair services to keep your home warm and comfortable. Our team can diagnose and fix any heating issue, from minor repairs to major system failures.',
    shortDescription: 'Quick and reliable heating system repairs to restore comfort to your home.',
    icon: 'flame',
  },
  {
    id: 'hvac-maintenance',
    name: 'HVAC Maintenance',
    description: 'Regular maintenance programs to keep your heating and cooling systems running efficiently year-round. Preventative maintenance helps avoid costly breakdowns and extends the life of your equipment.',
    shortDescription: 'Preventative care programs to optimize performance and extend equipment life.',
    icon: 'wrench',
  },
  {
    id: 'template-service',
    name: 'Template Service',
    description: 'This is a template service description that can be customized based on your specific offerings. Detailed information about the service would go here.',
    shortDescription: 'Customizable template for showcasing additional services.',
    icon: 'settings',
  },
];

export function getAllServices(): Service[] {
  return SERVICES;
}

export function getServiceById(id: string): Service | undefined {
  return SERVICES.find(service => service.id === id);
}

export function isValidService(id: string): boolean {
  return SERVICES.some(service => service.id === id);
}
