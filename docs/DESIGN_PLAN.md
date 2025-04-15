# 🔧 **ProTech Heating & Cooling Website – MVP Design Plan**

## 🧠 **Design Philosophy**
- **Clean, modern, trustworthy** look
- Prioritize **speed, clarity, and user action**
- Optimized for **mobile first**, but avoids long scrolling fatigue
- Inspired by [CustomHeat](https://customheat.co.uk/) but with **tighter section heights** and more defined CTAs
- Built to build trust, showcase expertise, and make booking easy
- **Location-aware content** that personalizes the experience for each visitor

---

### 🔷 **Page Sections – MVP Breakdown**

---

### 1. **Header / Navigation (Sticky Top)**
- **Logo left**, quick nav links right (`Services`, `About`, `Contact`)
- Sticky on scroll, lightweight and minimal
- A bold **primary CTA button**: “Book Service” or “Request Quote”

---

### 2. **Hero Section (Above the Fold)**
- Full-width image or soft blue gradient background
- Headline: _"Reliable HVAC Service in [Location]"_ (dynamically uses visitor's location)
- Subheadline: _"Emergency repairs, installs & tune-ups"_
- Two buttons:
  - "Schedule Now"
  - "Check My ZIP" (for localized services)
- Location detection notice: subtle text showing detected city/region
- **Max height on mobile: 60vh** — avoids scroll overload

---

### 3. **Service Cards (Snap to View on Mobile)**
- A **horizontal scroll** layout on mobile (swipeable)
- 3–5 essential services:
  - AC Repair
  - Furnace Installation
  - Mini-Splits
  - Emergency HVAC
- Each card = icon, short title, and “Learn More” badge

---

### 4. **Trust Section (Why ProTech)**
- 3–4 side-by-side badges with icons:
  - 24/7 Emergency Response
  - Licensed & Insured
  - 5-Star Local Reviews
  - Fast Scheduling
- Icons and clean typography — **no bulky paragraphs**

---

### 5. **Client Showcase Carousel (NEW)**
> Your requested feature 

- A **horizontal scroll logo strip** labeled:  
  _“Businesses We’ve Worked With”_
- Logos scroll automatically (or swipeable on mobile)
- Examples: Local stores, restaurants, data centers, etc. (use dummy logos if needed)
- **Small and neat**, fits above the fold on most phones

---

### 6. **Testimonials (Short Quotes)**
- 1–2 client reviews in large font
- Swipeable or fading rotation
- Star ratings shown subtly below each quote
- Add trust badges (e.g., Google 5 Stars, 60+ Reviews)

---

### 7. **CTA Section (Strong Ending)**
- Contrasting background (orange or dark blue)
- Short message: _“Need fast HVAC help? We’re ready.”_
- Big CTA: “Get a Free Quote” (single full-width button on mobile)

---

### 8. **Footer**
- Simple and clean:
  - Phone, address, email
  - Social media icons
  - Quick links to key pages
  - Legal: Privacy, Terms

---

## 🌎 **Location-Specific Pages**

### 1. **Service + Location Pages**
- URL structure: `/services/[service]/[location]` (e.g., `/services/ac-repair/orrville-oh`)
- Location data displayed prominently in page title: _"AC Repair in Orrville, OH"_
- Custom content sections that reference the specific location:
  - Service area map highlighting the specific city/region
  - Local testimonials from customers in that area
  - Mentions of local landmarks or neighborhoods when appropriate
- "Nearby Services" section showing other locations we serve

### 2. **Location Detection System**
- Automatic geolocation detection on page load (with permission request)
- Fallback to IP-based location when permission denied
- Manual location selector dropdown ("Not in [detected location]?")
- Location persistence across sessions (saved in browser storage)
- Custom location-specific meta tags for SEO

### 3. **Multi-Location Strategy**
- Dedicated landing pages for each major service area
- Location selector in header or hero section
- Service radius information
- Local phone numbers when available

---

### 📱 **Mobile UX Tips (Short Page Flow)**
- Each section limited to **1 screen height**
- Avoid large image banners or long FAQ sections
- Use **carousels and collapsible components** (like service cards and testimonials) to reduce scroll fatigue
- Bottom sticky bar (optional): Call | Message | Schedule
- Location reminder in sticky footer on location pages

## 🔄 **Technical Implementation Notes**

### Location Detection Priority
1. Browser geolocation API (requires user permission)
2. Vercel IP-based geolocation headers
3. Default location fallback ("Northeast Ohio")

### Common Location Issues & Solutions
- **Homepage vs. Service Pages Discrepancy**: Ensure middleware consistently handles all routes. Special attention to homepage ('/') which often requires different handling than dynamic routes.
- **Middleware Configuration**: Use a consistent matcher pattern that includes both static and dynamic routes.
- **Header Handling**: Normalize header access across all components to prevent issues with case sensitivity.

### Performance Considerations
- Lazy load location-specific content
- Cache location data in localStorage
- Prerender popular location pages
- Implement route prefetching for commonly visited location combinations

### SEO Strategy for Location Pages
- Unique metadata for each service+location combination
- Structured data markup (LocalBusiness schema)
- Location sitemaps for Google
- Canonical URL structure to avoid duplicate content issues
- Location-specific keywords in page titles, URLs, and headings

---

## 📊 **Analytics & Tracking Plan**

- Track location detection accuracy
- Monitor user-initiated location changes
- Measure conversion rates by location
- Analyze which locations have highest engagement
- Set up goals for location-specific calls-to-action