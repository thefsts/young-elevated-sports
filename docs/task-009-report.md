# Task 009 / 009A — Complete Homepage, Reviews Scaffold & Visual Content

**Branch:** `feature/task-009-homepage-complete` (created from
`feature/task-007-athlete-skyline-header` at `161965b`)
**Draft PR:** #2 — https://github.com/thefsts/young-elevated-sports/pull/2
**Status:** ready for PM visual approval. **Not merged. Production DNS unchanged.**

---

## 1. Repository and deployment check (Phase 1)

`git fetch --all --prune` reported four remote branches only:
`feature/batch-001-foundation`, `feature/correction-005-visual-fidelity`,
`feature/task-007-athlete-skyline-header`, `main`.

There is **no Task 008 branch**. The newest homepage, branding, classes,
registration and waiver work all lives on
`feature/task-007-athlete-skyline-header`, whose tip before this task was
`161965b` (seven-step registration intake). The isolated branch for this task was
cut from that tip, so every approved asset and route is preserved byte-for-byte.

Vercel builds the branch automatically (commit status context `Vercel`). The
deployment completes successfully, but every preview alias is still behind
**Deployment Protection (Vercel Authentication)**: an anonymous request returns
`302 → https://vercel.com/sso-api`. This is a project setting, not a build
failure. A protection-bypass token or a share link is required to hand the PM a
public preview URL.

---

## 2. Section inventory (14 required)

| # | Section | Implementation | State |
| --- | --- | --- | --- |
| 01 | Navigation & Hero | `SiteHeader.tsx`, hero block in `app/page.tsx` | Existing, preserved (icon-only header, full athlete head, readable headline) |
| 02 | Meet Coach Reggie Young | coach split block in `app/page.tsx` | Existing, preserved (approved portrait, verified bio, About link) |
| 03 | Performance Technology | technology block in `app/page.tsx` | Existing, preserved (five cards) |
| 04 | Training Objectives | `id="objectives"` | Existing, preserved (eight objectives) |
| 05 | Dallas–Fort Worth | `id="dfw"` | Existing, preserved (full panorama, angled gold panel) |
| 06 | Our Training Programs | `ProgramsSection` | **New** — four cards |
| 07 | Classes & Membership | `PricingSection` | **New** — seven approved prices |
| 08 | Why Train With YESP | `WhySection` | **New** — six reasons |
| 09 | Athlete Reviews | `ReviewsSection` | **New** — "Athlete Stories Coming Soon" |
| 10 | Athlete Development | `DevelopmentSection` | **New** — five stages |
| 11 | Photo Gallery | `GallerySection` | **New** — six tiles |
| 12 | FAQ | `FaqSection` | **New** — eight questions |
| 13 | Final CTA | `FinalCtaSection` | **New** — three buttons |
| 14 | Footer | `SiteFooter.tsx` | Existing + 009A logo sizing |

Nine `id`-bearing sections render in addition to the hero, coach/technology
split and final CTA, so all fourteen directive sections are present and
addressable by anchor.

### 06 — Our Training Programs

Four cards, each with a photograph, description, benefit list and a working link
to its class route:

| Program | Route |
| --- | --- |
| Speed & Agility | `/classes/speed-agility` |
| Explosive Force & Vertical Jump Mechanics | `/classes/explosive-force-vertical-jump` |
| Multi-Directional Agility & Deceleration | `/classes/multi-directional-agility-deceleration` |
| Athletic Strength & Conditioning | `/classes/athletic-strength-conditioning` |

### 07 — Classes & Membership

Prices are **read from `lib/content/classes.ts`** and rendered through
`formatPrice`, so the approved figures cannot drift from the source of truth:

- Single Drop-In — $35
- 4-Session Flex — $130
- 8-Session Flex — $230
- Monthly 4 — $120 / month
- Monthly 8 — $200 / month
- Monthly 12 — $250 / month
- Monthly 16 — $300 / month

75-minute session length is stated. Flex bundles are visually separated from
monthly membership, and the Flex 60-day expiry plus mixing/family/payment policy
text is reproduced from `pricingPolicy`. No availability or capacity is invented.

### 09 — Athlete Reviews

`lib/content/homepage.ts` exports `export const testimonials: Testimonial[] = [];`.
`ReviewsSection` branches on `testimonials.length > 0`. While the array is empty
it renders a branded dashed-border gold panel titled **"Athlete stories coming
soon"**, with copy that explicitly states no testimonials, ratings, client names
or achievements will be invented, plus a CTA to `/training`. `ReviewCard` already
supports name, role/context, quote, verified date and authorised photo, so real
reviews can be dropped in later without touching layout.

### 10 — Athlete Development

Assessment → Training plan → Coaching → Progress tracking → Continued
development. Carries an explicit disclaimer: *"Individual progress varies. No
training outcome, scholarship, recruiting result, or professional contract is
promised."*

### 12 — FAQ

Eight questions covering who can register, sports supported, session length,
package mechanics, parent/guardian registration for minors, what to bring,
scheduling/availability, and what happens after an inquiry. Answers restate only
approved facts. The submission answer states plainly that online submission is
not yet enabled and that nothing entered is transmitted, stored or logged. No
policy or age eligibility is invented.

---

## 3. Photography

Thirteen placeholder categories ship at three derivatives each (full 1536×1024,
`-md` 960 px, `-sm` 480 px). The `facility` category was added for the gallery.

| Category | Used on |
| --- | --- |
| `sprinting` | Hero, final CTA, programs |
| `strength` | Programs |
| `agility-footwork` | Programs |
| `vertical-jump` | Programs |
| `coach-instruction` | Gallery |
| `facility` | Gallery |
| `group-sessions` | Reviews panel |
| `football`, `basketball`, `female-athletes`, `youth-development`, `assessment-equipment` | Classes, training, technology |
| `dfw-skyline` | DFW band |

Every entry carries `placeholder: true` and
`credit: "AI-generated placeholder — not a YESP athlete or client"`. No image is
captioned as a real YESP athlete, client or facility, and no fake YE logo is
burned into any scene. Provenance and licensing are recorded in
`docs/media-inventory.md`.

---

## 4. Task 009A — footer logo

`components/SiteFooter.tsx`:

```tsx
<Link href={path("/")} className="inline-block w-[190px] max-w-full shrink-0 sm:w-[220px] lg:w-[240px]">
  <FullLogo className="h-auto w-full max-w-full object-contain" />
</Link>
```

Previous value was `w-[16rem] sm:w-[20rem] lg:w-[26rem]` (416 px desktop).
Measured after the change: the logo box is 190×127 at 390, 834 and 1536 px —
inside the 240 px desktop cap and the 180–200 px mobile target, with
`height: auto` preserving aspect ratio. Header logo, hero, sections and brand
artwork were not touched.

---

## 5. QA results

| Gate | Result |
| --- | --- |
| `tsc --noEmit` | exit 0 |
| `next lint` | no warnings or errors |
| `npm run build` | succeeded |
| `npm test` | **69 / 69 passing** |
| axe-core, 390 / 834 / 1536 | **0 violations** |
| Horizontal overflow | 0 at all three widths |
| Console / page errors | 0 |
| Broken-link crawl | **30 internal routes, 0 non-200** |
| Asset validation | 13 categories × 3 derivatives, **0 missing** |
| Footer logo | 190×127 at all widths |

Screenshots: `shots-home/home-1536.png`, `home-834.png`, `home-390.png`.

---

## 6. Open item

**Vercel Deployment Protection** blocks anonymous preview access. Required from
the PM: either (a) a Protection Bypass for Automation token, (b) a Vercel team
invite so the preview can be signed into, or (c) turning off Vercel
Authentication for preview deployments. Until then the build is served from the
sandbox preview URL for review.

**Not merged. Production DNS unchanged.**
