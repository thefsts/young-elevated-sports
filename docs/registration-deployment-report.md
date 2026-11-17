# YESP — P0 Registration Deployment Verification & Repair

**Branch:** `feature/task-007-athlete-skyline-header`
**Route:** `/classes/register?class=athletic-strength-conditioning`
**Status:** Implemented, functionally tested, accessibility-clean, awaiting Vercel preview verification.
**Production DNS / merge:** NOT changed. PR #1 NOT merged.

---

## 1. Root cause (verified before any change)

The approved seven-step intake was **never implemented**. It was not lost in a deployment.

Evidence gathered from GitHub and the live hosts:

| Check | Result |
| --- | --- |
| Remote branches | `feature/batch-001-foundation` (0601ac8), `feature/correction-005-visual-fidelity` (3cc26f5), `feature/task-007-athlete-skyline-header` (c68f0d2), `main` (b6395ec). **No Task 008 branch exists.** |
| `main` tip `b6395ec` | "chore: initialize repository" — changed only `.gitignore` and `README.md`. `git ls-tree -d --name-only b6395ec:app` shows **no `classes` directory**. |
| `app/classes/register/page.tsx` on the task-007 branch | Existed since `c25ae85 feat(checkpoint-002)` and rendered a 125-line **"Class Interest Request"** page using `<ClassInterestForm>` — a single short form, not the seven-step intake. |
| `youngelevatedsports.com` | Served by **GoDaddy Website Builder** (`Server: DPS/2.0.0+sha-8a831a9`, `X-SiteId: us-west-2`, `data-ux` / `x-el` markup). Returns **404** for `/classes/register`. |
| Vercel production alias | Returns 200 but renders the old `<h1>Class interest request</h1>`. |
| Vercel branch alias | **302 → `vercel.com/sso-api`** (Deployment Protection). |

**Conclusion:** the registration experience the owner was looking for had never been built. The route that existed was a one-page interest form, and the public domain is still served by the legacy GoDaddy site, which has no such route at all.

## 2. Repair performed

- **Created** `components/ClassRegistrationForm.tsx` (~1,100 lines) implementing all seven steps:
  1. Athlete Information
  2. Parent/Guardian & Emergency Contact
  3. Classes & Package Selection
  4. Training Objectives
  5. Medical & Safety Disclosures
  6. Combined Waivers & Agreements
  7. Review & Signature
- **Rewrote** `app/classes/register/page.tsx` to render the new component, with server-side `?class=` validation and preselection, `noindex` metadata, and localized canonicals.
- All fields are **functional controlled React inputs** — no static images, no placeholders.
- `?class=athletic-strength-conditioning` auto-selects **Athletic Strength & Conditioning** and still allows other tracks to be added.
- Approved pricing rendered verbatim: $35 single, $130 four-session flex, $230 eight-session flex, $120 / $200 / $250 / $300 monthly. All sessions **75 minutes**; flex packages note the 60-day expiry.
- Required agreement acknowledgment (participation / medical authorization / liability release) is **structurally separate** from the optional photo & video media consent, which is never validated.

## 3. Safety posture (Phase 3)

- The component performs **zero network I/O**: no `fetch`, no form action, no analytics, no `localStorage`.
- **No submit handler exists.** The Submit button is rendered `disabled`.
- Signature inputs are `disabled` + `readOnly` with empty values; a visible "Signature capture disabled" badge explains why.
- Nothing typed is transmitted, stored or logged; this is stated on screen.
- Medical and minor information never leaves the browser.

## 4. Verification results

| Gate | Result |
| --- | --- |
| `tsc --noEmit` | exit 0 |
| `next lint` (components, app) | No ESLint warnings or errors |
| `next build` | Succeeded, 46 routes |
| Existing test suite | **69 / 69 passed** (4 files) |
| Registration functional suite | **26 / 26 passed** |
| axe-core (WCAG 2.0/2.1 A + AA) | **0 violations** at 1536×1000 and 390×844 |
| Horizontal overflow | 0 px at both viewports |
| Non-GET requests | 0 |
| Console errors | 0 |

Functional assertions cover: empty-step blocking, focus management, Back disabled on step 1, progress-rail forward-jump blocking, DOB→age→signature rule, invalid phone/email rejection, `?class=` preselection, package requirement, adding a second track, all seven prices, objectives requirement, injury-detail requirement, three required agreements vs optional media consent, disabled submit, disabled signatures, review summary contents ($130, 75 minutes, package label, athlete and guardian names), back-navigation data preservation, zero POST/PUT/PATCH, and no personal data in the URL.

## 5. Remaining blockers

1. **Vercel Deployment Protection** returns 302 to SSO on the branch alias, so an anonymous reviewer cannot open the preview. A shareable preview link (Protection Bypass for Automation, or a Vercel share link) is required from the account owner.
2. **Legal review** of the 13 waiver documents is still outstanding — all are marked `DRAFT — LEGAL REVIEW REQUIRED`. Submission, payment and signature capture must stay disabled until counsel signs off.
3. **Production DNS** still points at GoDaddy Website Builder; the Vercel deployment is not the public site. Changing this is out of scope for this task.
