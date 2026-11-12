# Checkpoint 005 — Preview Recovery, Approved Pricing, Photography Brightness

Base commit: `79655ca` · branch `feature/batch-001-foundation` · PR #1 open, not merged.

## 1. GitHub state
- [x] Fetch remote, confirm local == remote (`79655ca`)
- [x] Inspect PR #1 (OPEN, head matches)

## 2. Preview deployment recovery
- [x] Inspect Vercel aliases and determine why the branch is not at a shareable URL
- [x] Document exact owner actions to create a shareable Preview (no auth disabling without approval)
- [x] Re-test aliases for `/classes` and `/es/classes`

## 3. Photography brightness
- [x] Audit current overlay/filter/shadow values on photo surfaces
- [x] Reduce darkening on hero, Coach Young portrait, training, class imagery
- [x] Preserve text contrast (verify against WCAG AA)
- [x] Capture before/after screenshots

## 4. Official class offerings and pricing
- [x] Replace catalog with the four approved tracks (75 minutes each)
- [x] Add seven approved price points + 60-day flex expiry + track mixing
- [x] Add family/sibling discount inquiry language with no invented amount
- [x] Remove unapproved proposed offerings
- [x] Mirror all changes in Spanish with pricing parity

## 5. Safety restrictions
- [x] Class interest remains inquiry-only
- [x] No medical intake, payments, reservations, or waiver signing
- [x] Unreleased athlete photography stays unpublished

## 6. Verification
- [x] lint, typecheck, tests, brand, routes, build
- [x] EN/ES pricing parity check
- [x] Desktop/tablet/mobile screenshots
- [x] Report and stop for PM review
