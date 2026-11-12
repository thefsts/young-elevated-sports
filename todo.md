# YESP — Active Work Plan

## A. Node.js 26 LTS Upgrade (Directive A)
- [x] Inspect repo state, package.json, lockfile, .nvmrc, CI, Vercel config
- [x] Install Node 26.13.1 and verify npm ci / lint / typecheck / test / build
- [x] Set `engines.node = 26.x` and `.nvmrc = 26`
- [x] Commit + push Node 26 runtime change (682508a)
- [x] Confirm Vercel project Node runtime (blocked: needs dashboard/token)

## B. Checkpoint 002 Final Corrections (Directive B)
- [x] B1 Prepare CI workflow content for `.github/workflows/ci.yml` (blocked on push: token lacks `workflows` scope)
- [x] B2 Spanish translation of all remaining public body copy
- [x] B3 Reconcile cookie categories with actual consent behaviour
- [x] B4 Cookie preferences dialog keyboard + focus management
- [x] B5 Confirm Vercel deployment for current feature commit (SUCCESS, inspection URL only)
- [x] B6 axe run clean on 8 routes; Lighthouse blocked by sandbox, CWV measured directly
- [x] B7 Keep registration/waiver signing disabled; no merge; no DNS change

## C. Checkpoint 003 — Official Coach Photography (Directive C)
- [x] C1 Inspect all six photographs; count identifiable faces
- [x] C2 Preserve originals outside public tree; strip EXIF/GPS from exports
- [x] C3 Produce Young2 portrait crop, transparent cutout, black-and-gold treatment, responsive variants
- [x] C4 Widen MediaAsset.placeholder and register cleared real photos
- [x] C5 Wire Young2 into About / homepage / coach card / program intros
- [x] C6 Remove illustrative-photo labels only from cleared authentic surfaces
- [x] C7 Update docs/media-inventory.md with inventory + permission status
- [x] C8 Full regression + responsive screenshots

## D. Delivery
- [x] Commit + push all checkpoint work (34885ab)
- [x] Report SHA, CI, Vercel, a11y, translation coverage, blockers
