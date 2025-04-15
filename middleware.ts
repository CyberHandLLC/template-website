import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function runs on every request
export async function middleware(request: NextRequest) {
  // Log which path is being processed
  const path = request.nextUrl.pathname;
  console.log(`Middleware processing path: ${path}`);
  
  // Clone the request headers so we can modify them
  const requestHeaders = new Headers(request.headers);

  // Check specifically for important Vercel headers
  const hasCountryHeader = requestHeaders.has('x-vercel-ip-country');
  const hasCityHeader = requestHeaders.has('x-vercel-ip-city');
  const hasRegionHeader = requestHeaders.has('x-vercel-ip-country-region');
  
  console.log(`Path ${path} - Vercel headers present:`, {
    country: hasCountryHeader, 
    city: hasCityHeader, 
    region: hasRegionHeader
  });
  
  // Log all headers for debugging
  console.log(`Headers for ${path}:`, Object.fromEntries([...requestHeaders.entries()]));

  // You can add custom logic here if needed to transform Vercel headers to your app's expected format
  // For now, we'll pass through the Vercel headers as they are

  // Return the response with potentially modified headers
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

// Define the paths this middleware should apply to
export const config = {
  matcher: ['/', '/:path*'],
};
