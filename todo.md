# Checkpoint 004 — Client Preview, Final Design Verification & Deployment

Commit under test: `9fb33e9` · branch `feature/batch-001-foundation` · PR #1 open, not merged.

## 1. GitHub state
- [x] Fetch remote branch before any change
- [x] Confirm local HEAD equals remote branch SHA (`9fb33e9`)
- [x] Confirm PR #1 state and mergeability (OPEN, MERGEABLE)

## 2. Deployment verification
- [x] Confirm Vercel commit status for `9fb33e9` (success, deployment `FHxmurMbK…`)
- [x] Test deployment-specific URL (302 → Vercel SSO)
- [x] Test branch alias (no DNS)
- [x] Test public alias and prove staleness with commit-specific markers
- [x] Test `expose_port` tunnel (platform fault, 302 → /404)
- [x] Record absence of `VERCEL_TOKEN` / CLI / `~/.vercel`
- [x] Conclude: no verified public Preview URL — reported as blocker B-1

## 3. Design and photography
- [x] Verify approved artwork lock (5/5, IoU 87.5–94.1%)
- [x] Verify `Young2.jpg` portrait on Home, About, Media and cut-out on Training
- [x] Verify placeholder photography unchanged and labelled
- [x] Verify all 8 queued frames remain unpublished (`pending-release`, no `src`)
- [x] Confirm no photograph implies endorsement, outcome, scholarship, or client relationship

## 4. Functional verification
- [x] EN/ES content and `lang` attributes (`en-US` / `es-US`)
- [x] Class catalog and interest form (inquiry, not enrollment)
- [x] Interest endpoint refuses to transmit (422)
- [x] Cookie consent banner and persisted preferences
- [x] Movable accessibility toolbar
- [x] Mobile navigation (`aria-expanded`)
- [x] 57 internal links resolve
- [x] Registration and waiver signing remain gated
- [x] No uncaught JS errors — 17/17 checks pass

## 5. Automated gates
- [x] lint, typecheck, 64 unit tests
- [x] brand check (5/5) and asset check (20 refs)
- [x] route check (21 + 4 special)
- [x] production build (`dqFbQICeMzVrvKvssvU1B`)
- [x] axe: 0 violations across 8 routes
- [x] Lighthouse: accessibility 100, SEO 92 on `/about`; performance not capturable (documented)
- [x] Confirm `.github/workflows/` push remains blocked (403, missing `workflows` scope)

## 6. Deliverables
- [x] Screenshots: desktop, tablet, mobile (23 files in `shots/`)
- [x] Logo comparison artefacts (`approved-vs-live-home.png`, `brand-compare.png`)
- [x] Photo permission inventory
- [x] `docs/checkpoint-004-report.md` with all eight deliverables and blockers
- [x] Commit and push report + todo
- [x] Deliver report to PM and stop for review

## Scope discipline
- [x] PR #1 not merged
- [x] Production DNS unchanged
- [x] Registration, medical intake, payments, waiver signing remain disabled
- [x] No photograph published
