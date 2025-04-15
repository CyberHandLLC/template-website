# AI Agent Customization Guide for Next.js Location-Based SEO Template

This document provides detailed technical guidance for AI agents on customizing and extending this template. It covers configuration patterns, component architecture, and advanced customization strategies.

## Table of Contents

1. [Configuration System](#configuration-system)
2. [Component Architecture](#component-architecture)
3. [Styling System](#styling-system)
4. [Location-Based Routing](#location-based-routing)
5. [Advanced Customization](#advanced-customization)
6. [Deployment Considerations](#deployment-considerations)
7. [Industry-Specific Adaptations](#industry-specific-adaptations)

## Configuration System

The template uses a JSON-based configuration system for maximum flexibility without code changes. This pattern makes it ideal for AI agents to quickly adapt the template for different clients.

### Core Configuration Files

#### `config/site.json`

Contains site-wide settings and company information:

```json
{
  "name": "Protech Heating & Cooling",
  "tagline": "Professional HVAC Services",
  "description": "Professional heating, cooling, and air quality services for residential and commercial properties.",
  "logo": "/images/logo.svg",
  "contact": {
    "phone": "330-555-1234",
    "email": "info@protechheatingandcooling.net",
    "address": {
      "street": "123 Main Street",
      "city": "Orrville",
      "state": "OH",
      "zip": "44667"
    }
  },
  "social": {
    "facebook": "https://facebook.com/protechohio",
    "twitter": "https://twitter.com/protechohio",
    "instagram": "https://instagram.com/protechohio"
  },
  "seo": {
    "titleTemplate": "%s | Protech Heating & Cooling",
    "defaultTitle": "Professional HVAC Services | Protech Heating & Cooling",
    "defaultDescription": "Professional heating, cooling, and air quality services for residential and commercial properties. Serving your local area with expert HVAC solutions."
  },
  "domains": [
    "protech-ohio.com",
    "protechheatingandcooling.net"
  ]
}
```

#### `config/theme.json`

Defines styling variables and theme settings:

```json
{
  "colors": {
    "primary": {
      "50": "#f0f9ff",
      "100": "#e0f2fe",
      "200": "#bae6fd",
      "300": "#7dd3fc",
      "400": "#38bdf8",
      "500": "#0ea5e9",
      "600": "#0284c7",
      "700": "#0369a1",
      "800": "#075985",
      "900": "#0c4a6e",
      "950": "#082f49"
    },
    "secondary": {
      "50": "#f8fafc",
      "100": "#f1f5f9",
      "200": "#e2e8f0",
      "300": "#cbd5e1",
      "400": "#94a3b8",
      "500": "#64748b",
      "600": "#475569",
      "700": "#334155",
      "800": "#1e293b",
      "900": "#0f172a",
      "950": "#020617"
    },
    "accent": {
      "light": "#f0f9ff",
      "DEFAULT": "#0ea5e9",
      "dark": "#0369a1"
    },
    "background": {
      "light": "#ffffff",
      "dark": "#1e293b"
    }
  },
  "fonts": {
    "heading": "Inter, system-ui, sans-serif",
    "body": "Inter, system-ui, sans-serif"
  },
  "borderRadius": {
    "sm": "0.25rem",
    "DEFAULT": "0.5rem",
    "lg": "0.75rem",
    "xl": "1rem"
  },
  "boxShadow": {
    "sm": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    "DEFAULT": "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    "lg": "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
  }
}
```

#### `config/services.json`

Defines available services and related text content:

```json
{
  "serviceTypes": [
    {
      "id": "ac-install",
      "name": "AC Installation",
      "description": "Professional air conditioning installation services for residential and commercial properties in your area. Our certified technicians ensure proper sizing, efficient installation, and optimal performance.",
      "shortDescription": "Expert installation of energy-efficient air conditioning systems",
      "slug": "ac-install",
      "icon": "snowflake",
      "metaTitle": "AC Installation Services | %location%",
      "metaDescription": "Professional air conditioning installation in %location%. Energy-efficient systems installed by certified technicians."
    },
    // Additional services...
  ],
  "sectionTitles": {
    "servicesPage": "Our Services",
    "serviceDetails": "Service Details",
    "locationService": "Local Service Information"
  },
  "callToActions": {
    "viewService": "View Details",
    "contactUs": "Contact Us",
    "backToServices": "Back to Services",
    "backToHome": "Back to Home",
    "viewAllServices": "View All Services",
    "learnMore": "Learn More"
  }
}
```

### Accessing Configuration

The configuration system is accessed through type-safe utility functions in `lib/config/index.ts`:

```typescript
// Get the entire site configuration
const siteConfig = getSiteConfig();

// Get specific values
const { name } = getSiteConfig();
const { callToActions } = getServicesConfig();

// Format text with location
const formattedText = formatWithLocation("Service in %location%", "Cleveland, OH");
```

## Component Architecture

The template follows a modular component architecture with clear separation of concerns:

### Layout Components

- `PageLayout`: Main page structure with title and subtitle
- `Container`: Responsive container with configurable width
- `ContentCard`: Styled content container with consistent appearance

### Service Components

- `ServiceCard`: Card display for individual service with consistent styling
- Other service-specific components as needed

### UI Components

- `Button`: Stylized button with variants (uses shadcn/ui)
- Additional UI components can be added from shadcn/ui as needed

### Best Practices for Creating Components

When adding new components, follow these guidelines:

1. Place components in appropriate directories:
   - UI components: `components/ui/`
   - Layout components: `components/layout/`
   - Feature-specific components: `components/[feature]/`

2. Use TypeScript interfaces or types for props:
   ```typescript
   type MyComponentProps = {
     title: string;
     description?: string;
     onClick?: () => void;
   };
   ```

3. Use the `cn()` utility for class composition:
   ```typescript
   import { cn } from '@/lib/utils';
   
   function MyComponent({ className, ...props }: MyComponentProps) {
     return (
       <div className={cn("base-classes", className)}>
         {/* Component content */}
       </div>
     );
   }
   ```

4. Make components configurable through props with sensible defaults.

## Styling System

The template uses Tailwind CSS for styling with shadcn/ui components. Theme values from `config/theme.json` can be connected to Tailwind using a script or directly in `tailwind.config.js`.

### Tailwind Configuration

For optimal results, extend the tailwind.config.js with theme values:

```javascript
// Example extension
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: theme.colors.primary,
        secondary: theme.colors.secondary,
        // Additional color mappings
      },
      fontFamily: {
        sans: [theme.fonts.body],
        heading: [theme.fonts.heading],
      },
      // Other theme extensions
    }
  }
  // Rest of Tailwind config
}
```

### Component Styling

Components should use Tailwind classes consistently and leverage the `cn()` utility for class composition. For example:

```tsx
<Button
  className={cn(
    "bg-primary-600 hover:bg-primary-700",
    isActive && "ring-2 ring-primary-300"
  )}
>
  Click Me
</Button>
```

## Location-Based Routing

The template implements location-based routing using the following pattern:

### URL Structure

- `/services`: Main services listing
- `/services/[service]`: Service-specific page (e.g., `/services/ac-install`)
- `/services/[service]/[location]`: Location-specific service page (e.g., `/services/ac-install/cleveland-oh`)

### Location Detection

Location detection happens in `middleware.ts` and `lib/location/location-service.ts`:

1. Middleware captures Vercel geolocation headers
2. `location-service.ts` parses these headers to extract city, region, country
3. Pages use this information to display location-specific content

### Adding New Location-Based Routes

To add new location-based routes:

1. Create a new dynamic route in the appropriate directory:
   ```
   app/[feature]/[location]/page.tsx
   ```

2. Use the location data in the page component:
   ```tsx
   export default async function LocationBasedPage({ params }) {
     const { location } = params;
     const locationDisplay = formatLocationName(location);
     
     // Rest of the component
   }
   ```

## Advanced Customization

### Adding New Page Types

1. **Create Configuration**: Add new content type definition in `/config`
2. **Create Utility Functions**: Add helper functions in `/lib`
3. **Create Page Templates**: Add pages in `/app` directory
4. **Create Components**: Add components in `/components`

### Customizing for Different Industries

To adapt the template for different industries:

1. **Update Service Definitions**: Modify `services.json` with industry-specific offerings
2. **Update Content**: Change text and descriptions to match industry terminology
3. **Adjust Design**: Update theme colors to match industry expectations
4. **Add Industry Features**: Add industry-specific components and functionality

### Industry Examples

#### Law Firm

```json
// services.json for a law firm
{
  "serviceTypes": [
    {
      "id": "family-law",
      "name": "Family Law",
      "description": "Comprehensive family law services including divorce, custody, and support matters.",
      "shortDescription": "Expert representation in family legal matters",
      "slug": "family-law",
      "icon": "scale"
    },
    // Additional legal services...
  ]
}
```

#### Restaurant

```json
// services.json for a restaurant
{
  "serviceTypes": [
    {
      "id": "catering",
      "name": "Catering Services",
      "description": "Professional catering for events of all sizes. Our team delivers exceptional food and service.",
      "shortDescription": "Exceptional catering for any occasion",
      "slug": "catering",
      "icon": "utensils"
    },
    // Additional restaurant services...
  ]
}
```

## Deployment Considerations

### Vercel Deployment

For optimal performance with location detection:

1. Deploy to Vercel to utilize their geolocation headers
2. Enable Edge Runtime in middleware.ts with `export const runtime = 'edge'`
3. Configure appropriate environment variables

### Environment Variables

The template may require these environment variables:

```
# .env.local
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_DEFAULT_LOCATION=Columbus, OH
```

## Optimization Techniques

### Image Optimization

For handling images:

1. Use Next.js Image component for optimal loading
2. Store image paths in configuration
3. Implement responsive images with appropriate sizes

### Performance Considerations

For optimal performance:

1. Use Server Components where possible
2. Implement proper caching strategies
3. Use streaming where appropriate for large data sets
4. Set appropriate revalidation intervals

## Troubleshooting Guide

### Common Issues

| Issue | Possible Solution |
|-------|-------------------|
| Location detection not working | Check middleware.ts configuration |
| Configuration changes not reflected | Clear .next cache and restart server |
| TypeScript errors with configuration | Ensure proper typing in lib/config files |
| Styling inconsistencies | Check tailwind.config.js integration |

## Final Tips for AI Agents

1. **Start with Configuration**: Always begin customization by updating configuration files
2. **Follow Component Patterns**: Maintain consistency with existing component architecture
3. **Leverage Type Safety**: Utilize TypeScript for safer code generation
4. **Test Location Features**: Verify location detection works correctly
5. **Document Changes**: Update documentation when adding significant features
