# Open Issues & Blockers — Batch 001

## Blockers

| # | Issue | Impact | Owner |
| --- | --- | --- | --- |
| B1 | Uploaded brand/concept package `/workspace/01_approved_concepts` was a 0-byte file | No client reference imagery or approved concept files were available; brand was built to the written directive | Client (re-upload) |
| B2 | No verified contact details (phone, address, hours) | Cannot publish contact details or business listing | Client |
| B3 | Resend not configured (no API key / verified domain) | Inquiry email returns 503; end-to-end send untested | Client / ops |
| B4 | Vercel CLI not installed in the environment | Preview deployment not performed from here | Ops |
| B5 | Legal review not performed on W01–W13 or policies | All documents remain drafts; registration submission stays disabled | Counsel |

## Partial / pending

| # | Item | Status |
| --- | --- | --- |
| P1 | Athlete results | Page built; no consented, verified results supplied |
| P2 | Athlete photography | Illustrative imagery used and labelled |
| P3 | Certification badges / expiration | Not supplied; "verification pending" shown |
| P4 | Social profiles | Not supplied; `site.social` empty |
| P5 | Lighthouse / a11y audit | Not run; requires deployed preview |
| P6 | Rate limiting | In-memory only; needs platform WAF before launch |

## Decisions recorded

- Brand built to the written palette/typography directive because no concept files were available.
- Contact details left null rather than invented.
- Sensitive forms fully built but submission disabled, per directive.
- OPERON/TAYA delivered as contract documents only.

## Recommended next batch

1. Client re-uploads approved brand/concept package; reconcile if different.
2. Supply verified contact details, pricing, schedules, and consented results.
3. Configure Resend + verify domain; test inquiry end-to-end.
4. Legal review of W01–W13 and policies; set versions/effective dates.
5. Install/authenticate Vercel CLI or connect repo in dashboard; deploy preview; run Lighthouse and axe.
6. Design and approve secure registration storage before enabling Class B.
