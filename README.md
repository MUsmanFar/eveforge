# Everforge

Premium single-page digital agency site — Next.js App Router, TypeScript, Tailwind CSS v4, GSAP, Lenis, React Three Fiber, Resend.

## Quick start

```sh
npm install
npm run dev          # http://localhost:3000
npm run dev:3004     # http://localhost:3004
```

| Script | Purpose |
| --- | --- |
| `npm run build` | Production build |
| `npm start` | Serve production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript (`tsc --noEmit`) |

## Folder structure

```text
EverForge/
├── docs/                         # Source brand & design references (not served)
│   ├── brand/                    # Original logo / favicon / preloader art
│   ├── references/               # Reference video & concept images
│   └── previews/                 # Design preview captures
├── public/
│   ├── og-image.jpg
│   └── assets/
│       ├── brand/                # Optimized logo, icon-e, favicon derivatives
│       ├── projects/             # Verified project screenshots
│       ├── apps/                 # App UI captures (YalaRide, Go-Jetter)
│       └── previews/             # Optional tall desktop/mobile captures
├── src/
│   ├── app/                      # App Router: layout, page, SEO, API
│   │   ├── api/contact/          # Resend contact endpoint
│   │   ├── privacy/ & terms/
│   │   ├── globals.css           # Design tokens + section styles
│   │   ├── layout.tsx
│   │   ├── page.tsx              # Single-page marketing experience
│   │   ├── robots.ts
│   │   └── sitemap.ts
│   ├── components/
│   │   ├── layout/               # Navbar, Preloader, Footer, SiteShell
│   │   ├── sections/             # Hero → Contact page sections
│   │   ├── work/                 # Laptop/phone frames + showcase/gallery
│   │   ├── visualizations/       # Service stage SVGs
│   │   ├── three/                # R3F DigitalForge particle sculpture
│   │   ├── providers/            # Lenis + ScrollTrigger / reveals
│   │   └── ui/                   # Button, Container, BrandLogo, …
│   ├── data/                     # Site copy, services, projects, process
│   │   └── logo-points.json      # Sampled Everforge E particle map
│   ├── hooks/                    # Shared React hooks
│   └── lib/                      # Utilities (cn, …)
├── .env.example
├── next.config.ts
├── postcss.config.mjs
└── package.json
```

Import alias: `@/*` → `src/*`

## Environment

Copy `.env.example` → `.env.local`:

```env
RESEND_API_KEY=
CONTACT_FROM_EMAIL=Everforge <onboarding@resend.dev>
CONTACT_TO_EMAIL=everforge9@gmail.com
NEXT_PUBLIC_FACEBOOK_URL=
NEXT_PUBLIC_INSTAGRAM_URL=
NEXT_PUBLIC_SITE_URL=
```

Contact form stays honestly unconfigured until Resend is set. Mailto fallback always works for `everforge9@gmail.com`.

## Content rules

- Project data lives in `src/data/projects.ts` only
- Technical PM roles (America Needs Nurses, YalaRide, Go-Jetter App) stay labeled accurately
- No personal portfolio URL on the public site
- Social links appear only when env URLs are provided

## Design notes

Silver/blue direction informed by `docs/references/reference-video.mp4`. Hero uses the sampled logo particle map (`logo-points.json`), not a generic letter. Reduced-motion and non-WebGL fall back to the brand mark.
