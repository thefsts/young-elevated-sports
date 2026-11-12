# Young & Elevated Sports Performance

Premium athletic development website for **Young & Elevated Sports Performance (YESP)** — Dallas–Fort Worth, Texas.

- **Brand:** YOUNG & ELEVATED · SPORTS PERFORMANCE · monogram **YE**
- **Domain:** youngelevatedsports.com
- **Repository:** `thefsts/young-elevated-sports`
- **Batch:** 001 — foundation, brand, public site, registration front end, draft legal documents

---

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict) |
| UI | React 19, Tailwind CSS 3 |
| Validation | Zod |
| Email | Resend |
| Tests | Vitest |
| Hosting | Vercel |

Server components are the default. Client components are used only where interactivity is required (navigation, reveal animations, forms).

## Getting started

```bash
nvm use            # Node 22 (see .nvmrc)
npm install
cp .env.example .env.local   # fill in Resend values to enable inquiry email
npm run dev
```

Open http://localhost:3000.

## Scripts

```bash
npm run dev         # development server
npm run build       # production build
npm run start       # serve the production build
npm run lint        # ESLint (next/core-web-vitals + typescript)
npm run typecheck   # tsc --noEmit
npm run test        # Vitest unit tests
npm run check:assets  # verify referenced local assets exist
npm run check:routes  # verify required routes exist
npm run verify      # lint + typecheck + test + build
```

## Project structure

```
app/                 App Router routes, layout, metadata, sitemap, robots
  api/               Class A inquiry endpoints (inquiry, school-inquiry)
  waivers/[slug]/    Printable draft waiver documents
components/          Header, footer, UI primitives, forms, logo
lib/
  content/           Typed content (site, programs, bio, technology, waivers)
  validation.ts      Zod schemas shared by client and server
  email.ts           Resend templates and delivery
  rate-limit.ts      In-memory fixed-window limiter (best effort)
  seo.tsx            Metadata helpers + JSON-LD
public/
  brand/             approved runner-mark SVG masters, PNG exports, favicons, OG image
  media/             Illustrative imagery (not client athletes)
scripts/             Brand build, asset and route checks
tests/               Vitest suites
docs/                Full documentation set (see docs/)
```

## Important status notes

- **Brand assets** are true vector SVGs (text converted to outlines) plus transparent PNG exports.
- **Imagery** in `public/media/` is illustrative and clearly labelled. It does not depict client athletes.
- **Contact details** (phone, address, hours) are intentionally unset. The public inquiry form is the only verified contact channel.
- **Sensitive registration and waiver submission are disabled.** The forms are complete front ends; nothing is stored or transmitted.
- **All waivers (W01–W13) are drafts** labelled `DRAFT — LEGAL REVIEW REQUIRED`.
- **OPERON and TAYA** are specified as contracts only — no live integration.

## Documentation

See [`docs/`](docs/) for architecture, brand guidelines, route inventory, compliance matrix, privacy/security plan, integration contracts, test results, and open issues.

## License / ownership

Proprietary. © Young & Elevated Sports Performance. All rights reserved.
