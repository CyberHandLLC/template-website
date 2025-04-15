# Next.js Location-Based SEO Template

A minimal, production-ready template for building web applications with location-based SEO using Next.js App Router and server components. This template demonstrates geolocation detection and location-specific content customization.

## Key Features

- **Vercel Geolocation Integration**: Automatically detects user location from request headers
- **Location-Specific Pages**: Generates optimized pages for different geographic locations
- **SEO Optimization**: Custom metadata for each location to improve search engine visibility
- **Edge Runtime Support**: Compatible with Vercel Edge for location detection
- **TypeScript**: Fully typed codebase for type safety and better developer experience

## How It Works

### Geolocation Detection

This template uses Vercel's built-in geolocation headers to detect the user's location:

- `x-vercel-ip-country`: User's country code
- `x-vercel-ip-city`: User's city name
- `x-vercel-ip-region`: User's region/state
- `x-vercel-ip-latitude` and `x-vercel-ip-longitude`: Geographic coordinates

The location detection logic is implemented in `lib/location/location-service.ts` and handles both development and production environments.

### Location-Specific Pages

The template generates optimized pages for each location at build time:

1. `app/services/[location]/page.tsx` defines a dynamic route for each location
2. `generateStaticParams` pre-generates pages for all locations in the `VALID_LOCATIONS` array
3. Each page has custom metadata appropriate for the specific location

### SEO Benefits

- **Localized Content**: Providing location-specific content improves relevance for local searches
- **Custom Metadata**: Each location page has unique title and description tags
- **Generated URLs**: Clean, SEO-friendly URLs (e.g., `/services/columbus-oh`)

## Getting Started

1. **Clone the Repository**
   ```
   git clone <repository-url>
   cd <repository-name>
   ```

2. **Install Dependencies**
   ```
   npm install
   ```

3. **Run Development Server**
   ```
   npm run dev
   ```

4. **Build for Production**
   ```
   npm run build
   ```

5. **Deploy to Vercel**
   For full geolocation functionality, deploy to Vercel:
   ```
   vercel
   ```

## Configuration

### Adding Locations

Edit `lib/location/location-utils.ts` to add or modify the `VALID_LOCATIONS` array:

```typescript
export const VALID_LOCATIONS: string[] = [
  "Columbus, OH",
  "Cleveland, OH",
  // Add more locations here
];
```

### Customizing Location Content

Modify `app/services/[location]/page.tsx` to add custom content for each location.

## Project Structure

```
├── app/                     # Next.js App Router 
│   ├── page.tsx             # Homepage
│   ├── services/            # Services pages
│   │   ├── page.tsx         # Main services page
│   │   └── [location]/      # Location-specific pages
│   │       └── page.tsx     # Dynamic location page template
├── lib/                     # Utility functions
│   └── location/            # Location detection code
│       ├── index.ts         # Main exports
│       ├── location-context.ts    # Location context types
│       ├── location-service.ts    # Geolocation service
│       └── location-utils.ts      # Location utilities
├── middleware.ts            # Next.js middleware for headers
└── public/                  # Static assets
```

## Deployment Notes

For optimal performance with location detection:

1. Deploy to Vercel to utilize their geolocation headers
2. Enable Edge Runtime in middleware.ts with `export const runtime = 'edge'`
3. Verify geolocation headers are properly received in production

## License

[MIT](LICENSE)
