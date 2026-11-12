# Route Inventory

All routes are implemented and statically generated unless noted.

| Route | File | Type | Purpose |
| --- | --- | --- | --- |
| `/` | `app/page.tsx` | Static | Homepage, approved hero copy |
| `/about` | `app/about/page.tsx` | Static | Founder bio, verified credentials |
| `/training` | `app/training/page.tsx` | Static | 8 disciplines + 6 formats |
| `/performance-technology` | `app/performance-technology/page.tsx` | Static | Output Sports, Valor, VertiMax, Vertec |
| `/athletes` | `app/athletes/page.tsx` | Static | 4-stage athlete pathway |
| `/results` | `app/results/page.tsx` | Static | Reporting standard, empty state |
| `/media` | `app/media/page.tsx` | Static | Illustrative gallery |
| `/contact` | `app/contact/page.tsx` | Static | Class A contact form |
| `/start-training` | `app/start-training/page.tsx` | Static | Class A training inquiry |
| `/registration` | `app/registration/page.tsx` | Static | 4 registration pathways |
| `/registration/athlete` | `app/registration/athlete/page.tsx` | Static | Full intake preview, submit disabled |
| `/registration/parent` | `app/registration/parent/page.tsx` | Static | Guardian-led process, waivers |
| `/registration/school` | `app/registration/school/page.tsx` | Static | Class A school inquiry |
| `/registration/partner` | `app/registration/partner/page.tsx` | Static | Class A partner inquiry |
| `/waivers` | `app/waivers/page.tsx` | Static | W01–W13 inventory |
| `/waivers/[slug]` | `app/waivers/[slug]/page.tsx` | SSG (13) | Printable draft document |
| `/policies` | `app/policies/page.tsx` | Static | Policy index |
| `/privacy` | `app/privacy/page.tsx` | Static | Privacy policy (draft) |
| `/terms` | `app/terms/page.tsx` | Static | Website terms (draft) |
| `/accessibility` | `app/accessibility/page.tsx` | Static | WCAG 2.2 AA commitment |
| `/api/inquiry` | `app/api/inquiry/route.ts` | Dynamic | Class A inquiry endpoint |
| `/api/school-inquiry` | `app/api/school-inquiry/route.ts` | Dynamic | Class A school inquiry endpoint |
| `/sitemap.xml` | `app/sitemap.ts` | Static | Sitemap |
| `/robots.txt` | `app/robots.ts` | Static | Robots |
| not found | `app/not-found.tsx` | Static | 404 |
| error | `app/error.tsx` | Client | Route error boundary |

Build output: **39 static pages** (including 13 waiver documents), 2 dynamic API routes.
