# SEO Readiness Review: Studio Kanban

This document evaluates the SEO readiness of the Studio Kanban application and provides recommendations for improvements.

## Current State Assessment

### 1. Semantic HTML & Document Structure
The application uses modern semantic HTML, which is a strong foundation for SEO.
- **`<main>`**: Used in `Board.tsx` to wrap the primary content.
- **Headings**: 
  - `<h1>` is used for the main title "Studio Kanban" in `Board.tsx`.
  - `<h2>` is used for "Execution pipeline" in `Board.tsx`.
  - `<h3>` is used for card titles in `Card.tsx`.
- **Sections**: `<section>` tags are used appropriately to define regions like the board hero and the board panel.
- **Articles**: `<article>` tags are used for individual cards, which is correct for self-contained pieces of content.

### 2. Metadata (Next.js App Router)
The global layout (`frontend/src/app/layout.tsx`) currently includes basic metadata:
```typescript
export const metadata: Metadata = {
  title: 'Studio Kanban',
  description: 'A polished single-board Kanban MVP built with Next.js.',
};
```
While functional, it lacks advanced tags for social sharing and search engine fine-tuning.

### 3. Rendering Strategy
The application is currently heavily client-side rendered (`'use client'`). 
- **Impact**: Search engines are much better at crawling JavaScript-heavy sites now, but server-side rendering (SSR) or static site generation (SSG) of the initial board state would provide a faster "Time to First Meaningful Paint" and guarantee indexing even for simpler crawlers.

### 4. Accessibility (A11y)
Good accessibility often translates to good SEO.
- `aria-label` is used for regions and buttons.
- Semantic roles like `role="region"` are present.

---

## Recommendations for SEO Implementation

### Priority 1: Advanced Metadata
Enhance `frontend/src/app/layout.tsx` to include OpenGraph, Twitter Cards, and canonical URLs.

**Proposed Changes:**
```typescript
export const metadata: Metadata = {
  title: 'Studio Kanban | Minimalist Team Planning',
  description: 'A polished, single-board Kanban tool for focused teams. Manage your execution pipeline with zero clutter.',
  openGraph: {
    title: 'Studio Kanban',
    description: 'A polished, single-board Kanban tool for focused teams.',
    url: 'https://your-domain.com',
    siteName: 'Studio Kanban',
    images: [
      {
        url: 'https://your-domain.com/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Studio Kanban',
    description: 'Minimalist planning for high-performance teams.',
    images: ['https://your-domain.com/twitter-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};
```

### Priority 2: Structured Data (JSON-LD)
Add Schema.org structured data to help search engines understand that this is a "SoftwareApplication". This can be added in `layout.tsx` or a dedicated component.

```html
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Studio Kanban",
      "operatingSystem": "Web",
      "applicationCategory": "BusinessApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    })
  }}
/>
```

### Priority 3: Improve Document Outline
- **Column Headers**: In `Column.tsx`, the column title is inside a `<button>`. Consider wrapping it in an `<h2>` or `<h3>` (and adjusting the hierarchy) to include column names in the document outline.
  - *Current*: `<button ...>{column.title}</button>`
  - *Recommended*: `<h3>{column.title}</h3>` (styled to look like the button).

### Priority 4: Performance & Core Web Vitals
- **Image Optimization**: If you add a logo or hero images, use the Next.js `<Image />` component.
- **Font Optimization**: Use `next/font` to prevent layout shifts.

### Priority 5: Technical SEO Files
Create the following files in `frontend/public/` or `frontend/src/app/`:
- `robots.txt`: Define crawl rules.
- `sitemap.ts`: Generate a dynamic sitemap if more pages are added.

---

## Conclusion
The components are **80% SEO ready** due to their excellent use of semantic HTML and accessibility features. By implementing the recommended metadata and structured data, Studio Kanban will be fully optimized for search engines and social media sharing.
