# Checkpoint 003 — Design Lock & Photo Update

## A. Brand lock (Directive D)
- [x] A1 Inspect supplied artwork; compare to deployed brand assets (icon IoU 0.916, lockup IoU 0.859 — same design)
- [x] A2 Install supplied artwork as canonical source under `assets/brand/approved/`
- [x] A3 Regenerate favicon/app-icon/social size variants from the approved icon source
- [x] A4 Regenerate full-logo PNG variants from the approved lockup source
- [x] A5 Verify `check:brand` / `verify-brand` pass

## B. Design preservation (Directive D)
- [x] B1 Confirm homepage still matches approved reference (no redesign)
- [x] B2 Confirm Coach Young portrait on homepage + About + coach cards
- [x] B3 Confirm existing filler photography intact

## C. Photo addendum (Directive E)
- [x] C1 Analyse 4 new photos: 20 / 5 / 2 / 30 faces detected; 3 of 4 carry GPS EXIF
- [x] C2 Preserve EXIF-stripped originals outside `public/`
- [x] C3 Publication status: all four held in review queue pending media releases
- [x] C4 Generate review derivatives (outside `public/`) for PM clearance
- [x] C5 Register queue entries + face counts in `lib/content/media.ts`
- [x] C6 Confirm no uncleared photograph reaches a public surface
- [x] C7 Update `docs/media-inventory.md` inventory + permission status
- [x] C8 Extend tests for new media entries

## D. Verification & delivery
- [x] D1 Regression on Node 26: lint, typecheck, test, check:brand, check:assets, check:routes, build
- [x] D2 Desktop/tablet/mobile screenshots + axe
- [x] D3 Commit and push to feature branch (no force-push, no merge)
- [x] D4 Report SHA, screenshots, logo/favicon verification, permission status, blockers
