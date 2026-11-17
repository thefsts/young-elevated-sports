# Task 012 — Resend Production Email Integration

**Status:** complete to the approval gate. Not merged, not deployed.
**Date:** 2026-11-17
**Priority:** P0

---

## 1. Source

| Item | Value |
| --- | --- |
| Repository | `thefsts/young-elevated-sports` |
| Branch | `feature/task-012-resend-production` |
| Base commit | `ce914d3` (`integration/yesp-production-sync`) |
| Feature commit | ``1f62b9b` (feature) + `6ccbaee` (docs)` |
| Draft PR | `#8 (draft)` |

The branch is cut from the integration branch, which carries all approved work from Tasks 009 through 010D. `main` (`b6395ec`) still contains none of that work and was deliberately not used as the base.

## 2. What already existed

The audit found a working Resend integration rather than a blank slate. Three API routes, three send functions, Zod schemas, a honeypot, in-memory rate limiting, 503-when-unconfigured, 502-on-failure and HTML escaping were all already in place. No duplicate route or second email service was introduced. Every change below is an extension of existing code.

## 3. Changes

### `lib/email.ts` — sender identity, plain text, timestamps

- Added `FROM_NAME = "Young & Elevated Sports Performance"` and `fromHeader()`, which emits the RFC 5322 form `Display Name <address>`. Previously the sender was a bare address with no display name.
- Added `submittedAt()`, rendering the submission time in `America/Chicago` with the UTC instant alongside it.
- Added `plainText()`, `htmlTable()` and `htmlParagraph()` helpers. **Every message now carries a real plain-text alternative** — previously the `text` field was absent entirely.
- Every internal notification now opens with `Inquiry category` and `Submitted` rows, before contact details.
- Visitor acknowledgments now set `replyTo` to the monitored destination inbox. Previously replies would have gone to `info@youngelevatedsports.com`, which has **receiving disabled** in Resend — a black hole.
- Internal notifications set `replyTo` to the visitor's validated address, so hitting reply in the inbox answers the visitor.

### `app/api/inquiry/route.ts` and `app/api/school-inquiry/route.ts` — abuse protection parity

Both routes were brought up to the standard `app/api/class-interest/route.ts` already met. They now run, in order: content-type check (415) → `content-length` cap (413) → rate limit (429 with `Retry-After`) → body read (400) → body-size cap (413) → JSON parse (400) → Zod `safeParse` (422 with field errors) → honeypot short-circuit → fill-time check → spam/link/disposable-domain screen → configuration check (503) → send (502 on failure). All responses carry `formHeaders()` (no-store, nosniff).

Rate limits: `/api/inquiry` 5 per 10 minutes per client key; `/api/school-inquiry` 4 per 10 minutes.

### `.env.example` — documented contract

Sender documented as `info@youngelevatedsports.com`; `INQUIRY_TO_EMAIL` documented as required for delivery, with the 503 fallback spelled out. No secret values.

### `docs/resend-setup.md` — rewritten

Now records the verified domain, the sender identity, the receiving-disabled caveat, the multipart template table with reply-to routing, the form-to-endpoint mapping, and the security posture.

## 4. Resend domain verification

| Item | Value |
| --- | --- |
| Domain | `youngelevatedsports.com` |
| Domain id | `c61f2216-86a1-4942-b76f-a80016807a60` |
| Status | `verified` |
| Region | `us-east-1` |
| Sending | `enabled` |
| Receiving | `disabled` |
| Records | 3 of 3 verified — TXT `resend._domainkey`, CNAME `rsend`, CNAME `send` |

In Task 010D this domain read `not_started`, which made real delivery testing impossible. It has since been verified, which is what unblocked §5.

**Receiving is disabled.** `info@youngelevatedsports.com` is a sending identity only. This is exactly the condition the directive warned about, and it is why acknowledgment `replyTo` was moved to the monitored inbox.

## 5. Environment-variable checklist (names only, no values)

| Variable | Where | Required | State |
| --- | --- | --- | --- |
| `RESEND_API_KEY` | Vercel Production + Preview, `.env.local` | yes | present locally; **must be added in Vercel** |
| `INQUIRY_FROM_EMAIL` | Vercel Production + Preview, `.env.local` | yes | set to `info@youngelevatedsports.com` |
| `INQUIRY_TO_EMAIL` | Vercel Production + Preview, `.env.local` | yes | **BLOCKER — no production inbox supplied** |
| `NEXT_PUBLIC_SITE_URL` | Vercel, `.env.local` | yes | `https://youngelevatedsports.com` |

## 6. Form-to-endpoint mapping

| Form | Component | Endpoint | Category in notification |
| --- | --- | --- | --- |
| General contact | `components/InquiryForm.tsx` (`type="contact"`) | `POST /api/inquiry` | General contact |
| Training information | `components/InquiryForm.tsx` (`type="training"`) | `POST /api/inquiry` | Training inquiry |
| Partnership / coach | `components/InquiryForm.tsx` (`type="partner"`) | `POST /api/inquiry` | Coach / partner inquiry |
| School / organization | `components/SchoolInquiryForm.tsx` | `POST /api/school-inquiry` | School / team inquiry |
| Class interest | `components/ClassInterestForm.tsx` | `POST /api/class-interest` | Class interest |

No form layout, markup or styling was changed. The directive's requirement to preserve existing design and layouts is met by construction — only server-side code and documentation changed.

## 7. Test results

Run against a production build (`next build` + `next start`) with synthetic data only. Destination was `delivered@resend.dev`, Resend's own delivery-test inbox, so no real mailbox was touched.

| # | Check | Result | Evidence |
| --- | --- | --- | --- |
| 1 | Resend domain authentication | **PASS** | `status=verified region=us-east-1 sending=enabled records=3 verified=3` |
| 2 | Correct sender address | **PASS** | all four messages read `Young & Elevated Sports Performance <info@youngelevatedsports.com>` |
| 3 | General contact delivery | **PASS** | HTTP 200, id `01a1eaf7-4797-7381-99d3-75875967babb`, `last_event=delivered` |
| 4 | Training inquiry delivery | **PASS** | HTTP 200, id `01a1eaf7-524c-7cce-a22a-5c5c71cc234a`, `last_event=delivered` |
| 5 | School inquiry delivery | **PASS** | HTTP 200, id `01a1eaf7-5cf7-73ed-89e9-823ff19f9b35`, `last_event=delivered` |
| 6 | Partnership inquiry delivery | **PASS** | HTTP 200, id `01a1eaf7-67b6-719d-a59e-2f31cde93be8`, `last_event=delivered` |
| 7 | Invalid-input rejection | **PASS** | HTTP 422, field errors on `contactConsent`, `email`, `message` |
| 8 | Rate-limiting behaviour | **PASS** | codes `[200,200,200,200,200,429,429]`, `Retry-After: 599` |
| 9 | Safe failure when delivery unavailable | **PASS** | `INQUIRY_TO_EMAIL` blanked → HTTP 503, generic message, no provider name, no stack |

**9 of 9 checks passed.**

### Additional verification

- **Acknowledgment email** — route 200; message id delivered with subject `We received your message — Young & Elevated Sports Performance`, `reply_to` set to the monitored inbox, plain-text part present.
- **HTML escaping** — submitted `<script>alert("x")</script> & <img src=x onerror=alert(1)>`. Delivered HTML contained no raw `<script>` or `<img onerror>`; entities were escaped. **PASS.**
- **Submission timestamp** — verified in a delivered body: `Submitted: Tuesday, November 17, 2026 at 1:24 PM (Central) — 17 Nov 2026, 19:24 UTC`.
- **Plain-text alternative** — verified present on internal notifications (663 chars for the school message) and acknowledgments.

### Regression gates

| Gate | Result |
| --- | --- |
| `tsc --noEmit` | clean |
| `next lint` | No ESLint warnings or errors |
| `vitest run` | 69/69 in 4 files |
| `next build` | 46 pages generated |
| Link crawl | 30 pages, 0 non-200 |
| axe WCAG 2.1 AA | 0 violations across 3 widths |
| Registration harness | 26/26 assertions |

## 8. Security posture

- API key is server-only; never referenced from a client component.
- No medical histories, minor-athlete intake records, signed waivers or payment data pass through Resend. Registration submission remains disabled (`Submit registration — disabled`, signature inputs disabled, no POST emitted).
- Error logs record the provider error message only, never the inquiry payload.
- Visitor input is HTML-escaped; the plain-text part is generated from the same values.
- Rate limiting is in-memory and therefore per-instance on Vercel. Documented as approximate; Vercel Firewall / WAF is the durable control and is **not yet configured**.

## 9. Vercel preview

A preview deployment will be produced for this branch. Preview aliases are behind Vercel Deployment Protection (SSO) on this project, so the URL will redirect to `vercel.com/sso-api` for anyone outside the team. This is a project setting, not a defect in this branch.

## 10. Remaining blockers

1. **`INQUIRY_TO_EMAIL` has no production value.** No business inbox address exists anywhere in the repository. Inventing one would silently black-hole every enquiry, so it was not invented. Until the PM/owner supplies a monitored mailbox, `emailConfigured()` returns false and every inquiry route answers 503 in production. This is the single blocker between this branch and live email.
2. **`RESEND_API_KEY` is not confirmed in Vercel.** It is present in `.env.local` but the Vercel project environment could not be inspected — API access is unavailable from this environment.
3. **Actual inbox receipt is unconfirmed.** Delivery was proven against Resend's test inbox. Confirmation that a human receives the mail requires the production destination mailbox from blocker 1.
4. **No Vercel Firewall / WAF rule** backs the in-memory rate limiter.
5. **`main` is still undeployed and empty of approved work.** Merging this branch alone would not put it in production.

## 11. Approval required

Nothing has been merged or deployed. Per the directive, this stops here for PM review.
