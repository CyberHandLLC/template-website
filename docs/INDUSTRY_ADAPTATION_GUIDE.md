# Industry Adaptation Guide

This guide provides instructions for AI agents to adapt this template for different industries while maintaining the location-based SEO benefits.

## Table of Contents

1. [HVAC & Home Services](#hvac--home-services)
2. [Legal Services](#legal-services)  
3. [Healthcare Providers](#healthcare-providers)
4. [Restaurants & Food Services](#restaurants--food-services)
5. [Real Estate](#real-estate)
6. [Retail & E-commerce](#retail--e-commerce)
7. [Professional Services](#professional-services)

## Core Adaptation Process

For any industry, follow these key steps:

1. **Update Configuration Files**:
   - Modify `site.json` with relevant company info
   - Adjust `theme.json` for industry-appropriate colors
   - Rebuild `services.json` with industry-specific offerings

2. **Adjust Terminology**:
   - Rename "Services" if applicable (e.g., "Treatments" for healthcare)
   - Update CTA text to match industry conventions

3. **Add Industry-Specific Components**:
   - Create specialized components for the industry

4. **Extend Schemas**:
   - Add required fields to data structures for the industry

## HVAC & Home Services

Already implemented as the primary template example.

### Sample Directory Structure
```
app/
├── services/            # HVAC services
│   ├── page.tsx         # Services listing
│   ├── [service]/       # Individual service
│   │   ├── page.tsx
│   │   └── [location]/  # Location-specific 
│           └── page.tsx
```

### Service Types
- AC Installation
- Furnace Repair
- HVAC Maintenance
- Duct Cleaning
- Emergency Repairs

## Legal Services

### Directory Structure
```
app/
├── practice-areas/      # Renamed from "services"
│   ├── page.tsx         # Practice areas listing
│   ├── [area]/          # Individual practice area
│   │   ├── page.tsx
│   │   └── [location]/  # Location-specific
│           └── page.tsx
├── attorneys/           # Attorney profiles
│   ├── page.tsx
│   └── [attorney]/
│       └── page.tsx
├── case-results/        # Results & testimonials
│   └── page.tsx
```

### Service Types (Practice Areas)
- Family Law
- Personal Injury
- Criminal Defense
- Estate Planning
- Business Law

### Additional Components
- `CaseResultCard.tsx` - Display case outcomes
- `AttorneyCard.tsx` - Attorney profile card
- `ConsultationForm.tsx` - Request legal consultation

## Healthcare Providers

### Directory Structure
```
app/
├── services/            # Medical services
│   ├── page.tsx
│   ├── [service]/
│   │   ├── page.tsx
│   │   └── [location]/
│           └── page.tsx
├── providers/           # Doctors/staff
│   ├── page.tsx
│   └── [provider]/
│       └── page.tsx
├── locations/           # Physical locations
│   ├── page.tsx
│   └── [location]/
│       └── page.tsx
├── patient-info/        # Patient resources
    └── page.tsx
```

### Service Types
- Primary Care
- Pediatrics
- Cardiology
- Orthopedics
- Mental Health

### Additional Components
- `ProviderCard.tsx` - Doctor/provider profile
- `InsuranceList.tsx` - Accepted insurance
- `AppointmentRequest.tsx` - Booking form

## Restaurants & Food Services

### Directory Structure
```
app/
├── menu/                # Renamed from "services"
│   ├── page.tsx         # Menu categories
│   ├── [category]/      # Food category
│   │   ├── page.tsx
│   │   └── [location]/  # Location menu variations
│           └── page.tsx
├── locations/           # Restaurant locations
│   ├── page.tsx
│   └── [location]/
│       └── page.tsx
├── catering/            # Catering service
│   └── page.tsx
├── reservations/        # Booking system
    └── page.tsx
```

### Menu Categories
- Appetizers
- Main Courses
- Desserts
- Drinks
- Specials

### Additional Components
- `MenuItemCard.tsx` - Food item display
- `ReservationForm.tsx` - Table booking
- `OrderOnline.tsx` - Online ordering

## Real Estate

### Directory Structure
```
app/
├── properties/          # Renamed from "services"
│   ├── page.tsx         # Property listings
│   ├── [type]/          # Property type
│   │   ├── page.tsx
│   │   └── [location]/  # Location-specific listings
│           └── page.tsx
├── agents/              # Real estate agents
│   ├── page.tsx
│   └── [agent]/
│       └── page.tsx
├── resources/           # Buyer/seller resources
│   └── page.tsx
├── mortgage/            # Mortgage calculator
    └── page.tsx
```

### Property Types
- Single Family Homes
- Condos & Townhomes
- Commercial Properties
- Land & Lots
- Luxury Properties

### Additional Components
- `PropertyCard.tsx` - Property listing card
- `AgentCard.tsx` - Agent profile
- `MortgageCalculator.tsx` - Financial tool
- `PropertySearch.tsx` - Advanced search

## Retail & E-commerce

### Directory Structure
```
app/
├── products/            # Renamed from "services"
│   ├── page.tsx         # Product categories
│   ├── [category]/      # Product category
│   │   ├── page.tsx
│   │   └── [product]/   # Individual product
│           └── page.tsx
├── locations/           # Store locations
│   ├── page.tsx
│   └── [location]/
│       └── page.tsx
├── cart/                # Shopping cart
│   └── page.tsx
├── checkout/            # Checkout process
    └── page.tsx
```

### Product Categories
- Clothing
- Electronics
- Home Goods
- Accessories
- Sale Items

### Additional Components
- `ProductCard.tsx` - Product display
- `AddToCart.tsx` - Cart functionality
- `ProductGallery.tsx` - Image gallery
- `StoreLocator.tsx` - Find local stores

## Professional Services

### Directory Structure
```
app/
├── services/
│   ├── page.tsx
│   ├── [service]/
│   │   ├── page.tsx
│   │   └── [location]/
│           └── page.tsx
├── about/               # Company information
│   ├── page.tsx
│   ├── team/            # Team members
│   │   ├── page.tsx
│   │   └── [member]/
│           └── page.tsx
├── portfolio/           # Work examples
│   ├── page.tsx
│   └── [project]/
│       └── page.tsx
├── contact/             # Contact information
    └── page.tsx
```

### Service Types
- Consulting
- Design Services
- Marketing
- Technical Support
- Training

### Additional Components
- `ProjectCard.tsx` - Portfolio item
- `TeamMemberCard.tsx` - Staff profiles
- `ProcessTimeline.tsx` - Service workflow
- `ROICalculator.tsx` - Value proposition

## Configuration Example

### Adjusting for Law Firm

```json
// site.json
{
  "name": "Smith & Associates Law Firm",
  "tagline": "Experienced Legal Representation",
  "description": "Dedicated attorneys providing expert legal services in family law, personal injury, and criminal defense.",
  // Additional firm info...
}

// services.json (renamed to practice-areas.json)
{
  "serviceTypes": [
    {
      "id": "family-law",
      "name": "Family Law",
      "description": "Our family law attorneys provide compassionate representation in divorce, custody, and support matters.",
      "shortDescription": "Expert representation in family legal matters",
      "slug": "family-law",
      "icon": "scale"
    }
    // Additional practice areas...
  ],
  "sectionTitles": {
    "servicesPage": "Practice Areas",
    "serviceDetails": "Legal Services",
    "locationService": "Local Legal Representation"
  }
}

// theme.json
{
  "colors": {
    "primary": {
      "500": "#1a365d", // Navy blue for professional appearance
      "600": "#153e75"
    },
    // Additional color settings...
  }
}
```

## Component Modification Example

Transforming `ServiceCard.tsx` to `PracticeAreaCard.tsx` for a law firm:

```tsx
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getPracticeAreaConfig } from '@/lib/config';
import { cn } from '@/lib/utils';

interface PracticeArea {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  slug: string;
  icon?: string;
}

type PracticeAreaCardProps = {
  practiceArea: PracticeArea;
  locationSlug?: string;
};

export function PracticeAreaCard({ practiceArea, locationSlug }: PracticeAreaCardProps) {
  const { learnMore } = getPracticeAreaConfig().callToActions;
  const href = locationSlug 
    ? `/practice-areas/${practiceArea.slug}/${locationSlug}` 
    : `/practice-areas/${practiceArea.slug}`;
  
  return (
    <div className="p-6 bg-white/5 hover:bg-white/10 rounded-lg shadow-lg transition-colors border border-primary-900/20">
      <h2 className="text-2xl font-semibold mb-3 text-primary-400">{practiceArea.name}</h2>
      <p className="mb-4 text-gray-300">{practiceArea.shortDescription}</p>
      <Button asChild className="w-full mt-2">
        <Link href={href}>{learnMore}</Link>
      </Button>
    </div>
  );
}
```
