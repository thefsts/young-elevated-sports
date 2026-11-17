# PM Correction Task 005 — Visual Fidelity Rebuild

## 1. Reference analysis
- [x] Measure the approved reference (1536×1024) with OCR bounding boxes and pixel sampling
- [x] Extract exact band boundaries, background colours, headline size and gold values
- [x] Identify that the objectives band is light (#ECE9E4) and the DFW band is bright gold

## 2. Rebuild the homepage
- [x] Replace the 4-line headline with the reference's 2-line headline (new .display-hero token)
- [x] Change the second hero CTA to Athlete Intake Form
- [x] Add the five discipline icons beneath the hero copy, remove the ticker
- [x] Merge coach profile and performance technology into one side-by-side band
- [x] Build the eight training objectives as one horizontal row on a light band
- [x] Rebuild DFW as a full-bleed gold skyline band
- [x] Remove stats strip, manifesto, programs grid, method grid, separate tech section, pillars grid

## 3. Brightness
- [x] Remove the hero's vertical scrim and grain layer, keep a single left-weighted scrim
- [x] Lift the coach band off pure black
- [x] Replace the DFW black section with a screen-blended gold duotone
- [x] Match measured band luma to the reference within tolerance

## 4. Preserve
- [x] Logo and favicon untouched; check:brand 5/5
- [x] Coach portrait unchanged; no uncleared photography published
- [x] Four classes, 75-minute sessions, seven price points, sibling inquiry preserved
- [x] EN/ES, cookie consent, accessibility controls, inquiries, security headers intact

## 5. Verify
- [x] tsc, lint, vitest 69/69, check:brand, check:assets, check:routes, build
- [x] axe-core 0 violations across 10 routes × 2 viewports
- [x] No horizontal overflow at 390 / 834 / 1440
- [x] Two-line headline confirmed at all three breakpoints

## 6. Compare and deliver
- [x] Build reference-vs-corrected and live-vs-corrected comparisons at desktop/tablet/mobile
- [x] Write docs/checkpoint-005-correction-report.md
- [x] Push to feature/correction-005-visual-fidelity (3cc26f5)
- [x] Do not merge PR #1 or touch the production domain
- [x] Report and stop for PM review
