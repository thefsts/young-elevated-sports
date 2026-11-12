# Checkpoint 003 — Design Lock & Photo Update

## A. Brand lock (Directive D)
- [x] A1 Inspect supplied artwork; compare to deployed brand assets (icon IoU 0.916, lockup IoU 0.859 — same design)
- [ ] A2 Install supplied artwork as canonical source under `assets/brand/approved/`
- [ ] A3 Regenerate favicon/app-icon/social size variants from the approved icon source
- [ ] A4 Regenerate full-logo PNG variants from the approved lockup source
- [ ] A5 Verify `check:brand` / `verify-brand` pass

## B. Design preservation (Directive D)
- [ ] B1 Confirm homepage still matches approved reference (no redesign)
- [ ] B2 Confirm Coach Young portrait on homepage + About + coach cards
- [ ] B3 Confirm existing filler photography intact

## C. Photo addendum (Directive E)
- [x] C1 Analyse 4 new photos: 20 / 5 / 2 / 30 faces detected; 3 of 4 carry GPS EXIF
- [ ] C2 Preserve EXIF-stripped originals outside `public/`
- [ ] C3 Publication status: all four held in review queue pending media releases
- [ ] C4 Generate review derivatives (outside `public/`) for PM clearance
- [ ] C5 Register queue entries + face counts in `lib/content/media.ts`
- [ ] C6 Confirm no uncleared photograph reaches a public surface
- [ ] C7 Update `docs/media-inventory.md` inventory + permission status
- [ ] C8 Extend tests for new media entries

## D. Verification & delivery
- [ ] D1 Regression on Node 26: lint, typecheck, test, check:brand, check:assets, check:routes, build
- [ ] D2 Desktop/tablet/mobile screenshots + axe
- [ ] D3 Commit and push to feature branch (no force-push, no merge)
- [ ] D4 Report SHA, screenshots, logo/favicon verification, permission status, blockers
