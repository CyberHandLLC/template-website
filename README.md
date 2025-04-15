# Next.js Location-Based SEO Template

A highly customizable, configuration-driven template for building web applications with location-based SEO using Next.js 15, the App Router, server components, and shadcn/ui. This template provides a solid foundation for AI agents to quickly generate tailored websites for local businesses across various industries.

## Key Features

- **Configuration-Driven Architecture**: JSON-based configuration files for easy customization without code changes
- **Vercel Geolocation Integration**: Automatically detects user location from request headers
- **Location-Specific Pages**: Generates optimized pages for different geographic locations
- **Service Management System**: Easily configurable service offerings with metadata
- **Component Library**: Built with shadcn/ui for consistent, customizable UI components
- **SEO Optimization**: Custom metadata for each location to improve search engine visibility
- **Edge Runtime Support**: Compatible with Vercel Edge for location detection
- **TypeScript**: Fully typed codebase for type safety and better developer experience
- **Responsive Design**: Mobile-first approach using Tailwind CSS

## How It Works

### Configuration System

The template uses a JSON-based configuration system for easy customization:

- **Site Configuration** (`config/site.json`): Company information, contact details, SEO settings
- **Theme Configuration** (`config/theme.json`): Styling variables including colors, fonts, spacing
- **Services Configuration** (`config/services.json`): Service offerings, descriptions, and metadata

These configuration files are accessed through utility functions in `lib/config/index.ts` for type-safe access.

### Geolocation Detection

This template uses Vercel's built-in geolocation headers to detect the user's location:

- `x-vercel-ip-country`: User's country code
- `x-vercel-ip-city`: User's city name
- `x-vercel-ip-region`: User's region/state

The location detection logic is implemented in `lib/location/location-service.ts` and handles both development and production environments. A mock location is used during build time and when geolocation fails.

### Page Structure

The template uses a hierarchical routing structure for location-based content:

1. `/services` - Main services listing page
2. `/services/[service]` - Service-specific page
3. `/services/[service]/[location]` - Location-specific service page

Each page uses reusable components with consistent styling:

- `PageLayout` - Standard page structure
- `ContentCard` - Content containers with consistent styling
- `ServiceCard` - Display for individual services

### SEO Benefits

- **Localized Content**: Location-specific pages improve relevance for local searches
- **Custom Metadata**: Each page has unique title and description tags based on service and location
- **Generated URLs**: Clean, SEO-friendly URLs (e.g., `/services/ac-install/cleveland-oh`)
- **Structured Data**: Ready for JSON-LD implementation

## Getting Started

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Customize Configuration Files**
   Edit the files in the `config` directory:
   - `site.json`: Update company information
   - `theme.json`: Adjust colors and styling
   - `services.json`: Modify service offerings

4. **Run Development Server**
   ```bash
   npm run dev
   ```

5. **Build for Production**
   ```bash
   npm run build
   ```

6. **Deploy to Vercel**
   For full geolocation functionality, deploy to Vercel:
   ```bash
   vercel
   ```

## Customization Guide for AI Agents

### Modifying Site Information

Update `config/site.json` to change basic site information:

```json
{
  "name": "Company Name",
  "tagline": "Company Tagline",
  "description": "Company description for SEO",
  "contact": {
    "phone": "123-456-7890",
    "email": "info@example.com"
  }
}
```

### Customizing Theme and Styling

Edit `config/theme.json` to change colors, fonts, and other styling variables:

```json
{
  "colors": {
    "primary": {
      "500": "#0ea5e9",
      "600": "#0284c7"
    }
  },
  "fonts": {
    "heading": "Inter, system-ui, sans-serif",
    "body": "Inter, system-ui, sans-serif"
  }
}
```

### Managing Services

Update `config/services.json` to modify service offerings:

```json
{
  "serviceTypes": [
    {
      "id": "service-slug",
      "name": "Service Name",
      "description": "Detailed service description",
      "shortDescription": "Brief overview for cards",
      "slug": "service-slug",
      "icon": "icon-name"
    }
  ]
}
```

### Adding Custom Components

Place new components in the appropriate directories:
- UI components: `components/ui/`
- Layout components: `components/layout/`
- Service-specific components: `components/services/`

### Extending Location System

The template automatically generates location-based pages from user geolocation. To add predefined locations for SEO:

1. Modify middleware.ts to handle specific region patterns
2. Create static path generation in location-specific pages

## Project Structure

```
├── app/                     # Next.js App Router 
│   ├── page.tsx             # Homepage
│   └── services/            # Services section
│       ├── page.tsx         # Services listing page
│       ├── [service]/       # Service-specific pages
│       │   ├── page.tsx     # Service page template
│       │   └── [location]/  # Location-specific service pages
│           └── page.tsx     # Location+service page template
├── components/              # Reusable components
│   ├── layout/             # Layout components
│   │   └── Container.tsx   # Container component
│   ├── services/           # Service-related components
│   │   ├── ContentCard.tsx # Content container
│   │   ├── PageLayout.tsx  # Page wrapper
│   │   └── ServiceCard.tsx # Service display card
│   └── ui/                 # UI components
│       └── button.tsx      # Button component
├── config/                  # Configuration files
│   ├── services.json       # Service definitions
│   ├── site.json           # Site information
│   └── theme.json          # Theme variables
├── lib/                     # Utility functions
│   ├── config/             # Configuration utilities
│   │   └── index.ts        # Config access functions
│   ├── location/           # Location detection
│   │   ├── location-context.tsx   # Location context
│   │   ├── location-data-service.ts # Data service
│   │   └── location-service.ts    # Geolocation service
│   ├── services/           # Service utilities
│   │   └── service-utils.ts # Service helper functions
│   └── utils.ts            # General utilities
├── middleware.ts            # Next.js middleware for headers
└── public/                  # Static assets
```

## Scaling Guide for AI Agents

### Adding New Pages

To add additional page types beyond services:

1. Create new configuration files in `/config` for the content type
2. Add utility functions in `/lib` to access the configuration
3. Create page templates in the appropriate `/app` directory
4. Update components as needed to support the new content type

### Advanced Customizations

#### Integrating CMS

For content management, you can extend this template by:

1. Adding API routes in `/app/api` to connect to headless CMS
2. Modifying service utilities to fetch from CMS instead of config files
3. Implementing caching strategies for CMS content

#### Adding Authentication

For member areas or admin functionality:

1. Add authentication provider (NextAuth.js recommended)
2. Create protected routes with middleware
3. Add user dashboard pages in `/app/dashboard`

#### E-commerce Extensions

For service booking or product sales:

1. Add product/pricing configuration in `/config`
2. Create cart and checkout components
3. Integrate payment processors through API routes

## Deployment Notes

For optimal performance with location detection:

1. Deploy to Vercel to utilize their geolocation headers
2. Enable Edge Runtime in middleware.ts with `export const runtime = 'edge'`
3. Verify geolocation headers are properly received in production

## Troubleshooting for AI Agents

### Common Issues

#### Location Detection Not Working
- Ensure middleware.ts is properly configured
- Check that location-service.ts is handling headers correctly
- Verify deployment to Vercel or add mock data for local testing

#### Configuration Not Applied
- Clear next cache: `rm -rf .next`
- Restart development server
- Ensure imports are using the correct paths

#### TypeScript Errors
- Run `npm run type-check` to identify issues
- Ensure proper typing for configuration access
- Check component prop types for consistency

## License

[MIT](LICENSE)
