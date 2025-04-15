import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function runs on every request
export async function middleware(request: NextRequest) {
  // Clone the request headers so we can modify them
  const requestHeaders = new Headers(request.headers);

  // Log incoming request headers
  console.log('Incoming request headers:', Object.fromEntries([...requestHeaders.entries()]));

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
  matcher: ['/', '/services/:path*'],
};
