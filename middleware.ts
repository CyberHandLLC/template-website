import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function runs on every request
export async function middleware(request: NextRequest) {
  // Get the current path
  const path = request.nextUrl.pathname;
  
  // Clone the request headers so we can modify them if needed
  const requestHeaders = new Headers(request.headers);

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
