# Brand Reconciliation — Batch 001 Correction

Records how the client-approved brand kit was reconciled against the existing
implementation, and every decision made where the two differed.

## Inputs

| Input | What it contained |
| --- | --- |
| `Young_Elevated_Client_Full_Branding_Runner_Logo_(4).zip` | 32 files: approved references, PNG logos, icon/favicon set, social sizes, brand guide, implementation notes |
| `references/approved_runner_YE_icon_original.png` | Approved YE runner icon (495×282) |
| `references/approved_full_logo_concept.png` | Approved full logo (1536×1024, stacked) |
| `references/approved_homepage_reference.png` | Approved homepage layout (1536×1024) |
| `references/approved_intake_form_reference.png` | Approved intake styling (1102×1427) |
| `references/new_brand_system_visual_board.png` | Illustrative directions — explicitly *not* a substitute for the approved logo |

## Logo: what changed

The previous site used a hand-built plain **YE** monogram. That is now retired and
deleted. The approved runner mark replaces it in:

- navigation and footer (`components/Logo.tsx`)
- browser favicon (`favicon.svg`, `favicon.ico`, PNG set)
- Apple / app icons (`apple-touch-icon.png`, `favicon-192.png`, `favicon-512.png`)
- Open Graph imagery (`og-image.png`, rebuilt from the traced full lockup)
- every route that renders the header, including registration and waivers
- social avatar export (`ye-runner-social-1024.png`)

### Vector production method

The approved artwork is raster, so a hand-drawn approximation would have drifted from
the concept. Instead the artwork was **colour-separated and auto-traced**:

- silver layer and gold layer split by pixel classification
- each layer traced with potrace into editable Bézier paths
- recombined into one SVG with brand fills

Measured fidelity (pixel IoU vs the approved PNG):

| Master | Overall IoU |
| --- | --- |
| `ye-runner-mark.svg` | 0.978 |
| `ye-runner-lockup.svg` | 0.980 |

The SVGs contain real paths only — no embedded raster. They are still a *trace* of a
raster concept, so the inventory labels them as pending final client vector sign-off
for print/embroidery.

## Homepage: what changed

The approved reference was read with OCR and luminance analysis to recover its
structure, then reconciled against the existing page.

| Approved reference element | Action |
| --- | --- |
| Dark cinematic hero, oversized headline, gold accents | Already present — kept |
| Eyebrow "Young & Elevated Sports Performance" | Already present — kept |
| H1 "Build Winning Habits." | Already present — kept |
| Supporting line | **Kept the locked directive copy** rather than the mockup's shorter line, because the directive specified the hero copy as exact |
| Primary CTA "Athlete Intake Form" | Kept the locked CTA labels "Start Training" / "Meet Coach Young"; registration is reachable from both |
| Discipline ticker (Speed · Strength · Agility · Explosive Power · Injury Prevention) | **Added** — animated marquee, paused under `prefers-reduced-motion` |
| "Data-Driven Training for Measurable Results." + five pillars | **Added** — Movement Analysis, Performance Tracking, Recovery & Readiness, Sports Technology, Training Intelligence |
| Coach Reggie Young section | Already present — kept |
| Eight-program grid | Already present — kept |
| "Training in Dallas–Fort Worth" + three pillars | **Added** — Elite Training, Elite Facility, DFW Athletes |

### Deliberate deviations

1. **Hero copy.** The directive locked the H1 and supporting paragraph as exact text.
   The mockup shows a shorter variant. The locked copy wins; the layout around it
   matches the reference.
2. **Nav item "DFW".** The reference includes a DFW nav item. No `/dfw` route exists
   in the approved 18-route list, so the DFW content is delivered as a homepage
   section instead of inventing a route.
3. **Mockup people.** The people in the approved reference are illustrative. No mockup
   person is published as a photo of Reggie or of a client athlete; the site keeps its
   labelled illustrative imagery.

## Registration and waivers

Per the implementation notes, the registration UI follows the approved intake styling
but **submission stays disabled** and all waiver documents remain
`DRAFT — LEGAL REVIEW REQUIRED`. Photo/media consent remains a separate optional
consent from participation. No legal text was published as binding.

## What did not change

- Next.js frontend-only; no admin, CRM, CMS, or payments
- Resend used for Class A inquiries only
- No OPERON or TAYA live integration
- No domain cutover
- No force-push; `main` untouched; PR #1 left open for PM review
