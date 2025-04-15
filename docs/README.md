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

---

## Directory Structure & App Router

The template leverages the Next.js **App Router** (`/app` directory) for routing, layouts, and dynamic page generation. Pages for locations and services are generated dynamically using route segments (e.g., `/app/[service]/[location]/page.tsx`).

```
protech-ohio.com/
├── app/
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   ├── [service]/           # Dynamic service routes
│   │   └── [location]/      # Dynamic location routes
│   │       └── page.tsx     # Service/location-specific page
│   └── api/                 # API routes (if needed)
├── config/                  # JSON configuration files
├── lib/                     # Utility functions (config, location, etc.)
├── public/                  # Static assets
└── ...
```

- **/app**: Uses the App Router for layouts, nested routing, and server/client components. Dynamic routes allow for efficient generation of location- and service-specific pages.
- **/config**: Stores all business, theme, and service configuration in JSON files for easy, code-free updates.
- **/lib**: Contains utility functions to read config files and implement location logic.

---

## Data Fetching & Config Usage

Configuration files are loaded **at build time** for static generation (using `generateStaticParams` and `generateMetadata` in the `/app` directory). This ensures fast, SEO-friendly pages and leverages Next.js’s recommended data-fetching patterns.

- **Static Generation (Recommended):**
  - Use `generateStaticParams` to generate all possible routes for services and locations.
  - Use `generateMetadata` to inject SEO metadata per page.
  - Utility functions in `lib/config` read the JSON config files and provide type-safe access.
- **Runtime Data:**
  - For features like geolocation, data is detected at runtime in middleware or server components using Vercel headers.

---

## SEO Implementation

SEO metadata is dynamically injected for each service/location page using the Next.js **`metadata` export** in the App Router (`/app/[service]/[location]/page.tsx`). This aligns with [Next.js SEO best practices](https://nextjs.org/docs/app/building-your-application/optimizing/metadata).

- For older `/pages` directory, use `<Head>`.
- For the `/app` directory, use the `metadata` export and `generateMetadata`.

---

## Middleware & Geolocation

Location detection is implemented using **Next.js Middleware** (`middleware.ts`) and Vercel’s geolocation headers. This allows for edge-based detection and routing based on user location.

- See [Next.js Middleware docs](https://nextjs.org/docs/app/building-your-application/routing/middleware) for usage and best practices.

---

## Further Reading

- [Next.js Documentation](https://nextjs.org/docs)
- [App Router](https://nextjs.org/docs/app/building-your-application/routing)
- [Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching)
- [Middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware)
- [SEO & Metadata](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)

---

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
