# Infynex Technologies — Website

Premium multi-page marketing website for Infynex Technologies.
React 19 · TypeScript · Vite · React Router 7 · Framer Motion · Tailwind CSS 4 · Lucide icons.

## Run

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build → dist/
npm run preview    # serve the production build
```

Deploy `dist/` to any static host. Because the site uses client-side routing, configure the host to serve `index.html` for all paths (Netlify: `_redirects` with `/* /index.html 200`; Vercel: rewrites; nginx: `try_files $uri /index.html`).

## Routes

| Route | Page |
| --- | --- |
| `/` | Home (14 sections) |
| `/services` | Service directory |
| `/services/amc` · `/services/hardware` · `/services/it-infra` · `/services/cloud-server` · `/services/tele-services` · `/services/robotic-duct-cleaning` · `/services/technical-support` · `/services/helpdesk` · `/services/vehicle-vendor` · `/services/solar` · `/services/b2b-b2c` | Eleven dedicated service pages, each with its own composition and motion |
| `/about` | About |
| `/blog` · `/blog/:slug` | Insights listing and articles |
| `/contact` | Contact form (validation, loading and success states) |

## Where to edit content

| What | File |
| --- | --- |
| Contact details, WhatsApp / LinkedIn links, client names/logos | `src/data/site.ts` |
| Service copy, highlights, capabilities, process steps | `src/data/services.ts` |
| Blog articles | `src/data/blog.ts` |
| Image sources | `src/data/images.ts` |
| Logo | `public/logo.png` (supplied Infynex logo, transparent background) |
| Company history / leadership | `src/pages/About.tsx` (placeholder section) |
| Form submission endpoint | `src/pages/Contact.tsx` → `submit()` |

### Images

Photography currently points at Unsplash (royalty-free) as illustrative imagery. It does **not** depict Infynex projects, staff or clients, and the footer says so. To use real photography, drop files into `public/` and update `src/data/images.ts`. Every image is rendered through `SmartImage`, which shows a brand-coloured abstract fallback if a remote file fails to load.

### Client logos

`src/data/site.ts` lists HiringTag, Sandha and Company and Locus as wordmarks. Add `logo: '/clients/name.svg'` to each entry once the official files are available — no logos are generated.

## Architecture

```
src/
  components/
    layout/    Navbar (mega-menu + mobile), Footer, PageTransition, Cursor, Layout
    ui/        AnimatedText, ParallaxImage, ImageReveal, MagneticButton, TiltCard,
               ServiceCard, ServiceHero, SectionHeading, CTASection, ProcessTimeline,
               BlogCard, FeatureList, CapabilityGrid, ScrollIndicator, SmartImage, Reveal
    visuals/   Particles, NetworkVisual, DuctScene, ScanOverlay
    home/      Homepage sections
  pages/       Route components (services/ holds the 11 service pages)
  data/        site, services, blog, images
  hooks/       useMedia (desktop / mobile / reduced-motion / motion level), usePageTitle
  utils/       motion variants and easings
```

## Motion & accessibility

- Framer Motion drives page transitions, scroll-linked parallax, pinned horizontal storytelling, 3D tilt, masked reveals and layout animations.
- `useMotionLevel()` scales parallax/3D intensity: full on desktop, reduced on tablet and mobile, off with `prefers-reduced-motion`. Particles and the custom cursor render on desktop pointer devices only.
- Semantic HTML, labelled form fields with inline validation, ARIA on menus and tabs.

## Content accuracy

No clients, testimonials, statistics, SLAs, uptime figures, employee counts or company history have been invented. Items that need real data are marked `EDIT` or described as placeholders in the source.
