import { NextRequest, NextResponse } from "next/server";

interface VercelGeolocation {
  city?: string;
  country?: string;
  countryRegion?: string;
  latitude?: string;
  longitude?: string;
  region?: string;
}

interface VercelNextRequest extends NextRequest {
  geo?: VercelGeolocation;
}

export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    const geo = (request as VercelNextRequest).geo || null;
    
    return NextResponse.json({
      geo,
      hasGeo: Boolean(geo),
      headers: Object.fromEntries(request.headers),
      environment: {
        nodeEnv: process.env.NODE_ENV,
        isVercel: process.env.VERCEL === "1",
        vercelEnv: process.env.VERCEL_ENV || "unknown"
      },
      url: request.url,
      method: request.method,
      timestamp: new Date().toISOString(),
      tips: [
        "Geolocation requires Vercel Pro or Enterprise plan",
        "Edge runtime declaration (edge) is required in middleware"
      ]
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Error getting geolocation data",
        message: error instanceof Error ? error.message : String(error),
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
