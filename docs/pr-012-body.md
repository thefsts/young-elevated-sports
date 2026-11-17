# Task 012 — Resend Production Email Integration

**P0 · draft · do not merge without PM approval**

Full report: [`docs/task-012-report.md`](docs/task-012-report.md)

## Summary

Wires the approved YESP inquiry forms to production email delivery through Resend, using the verified `youngelevatedsports.com` domain and the approved sender identity:

```
Young & Elevated Sports Performance <info@youngelevatedsports.com>
```

The audit found a working integration already in place — three routes, three send functions, Zod schemas, honeypot, rate limiting, 503/502 handling, HTML escaping. Nothing was duplicated. Every change extends existing code.

## Changes

- **`lib/email.ts`** — approved sender header with display name; real plain-text alternative on every message; `Inquiry category` and `Submitted` rows leading each notification; acknowledgment `replyTo` moved to the monitored inbox because the sender identity has receiving disabled; internal `replyTo` set to the visitor.
- **`app/api/inquiry/route.ts`, `app/api/school-inquiry/route.ts`** — brought to the protection standard `class-interest` already met: content-type, body-size cap, fill-time check, spam/link/disposable-domain screening.
- **`.env.example`**, **`docs/resend-setup.md`** — documented contract, verified domain status, template and endpoint mapping.
- **No form markup, layout or styling changed.**

## Resend status

Domain `youngelevatedsports.com` is **verified** — 3/3 DNS records, `sending: enabled`, region `us-east-1`. It was `not_started` during Task 010D; that is what unblocked live testing.

**Receiving is disabled** on this domain, confirming the directive's warning that the sender address has no mailbox. This is why replies are routed to the destination inbox.

## Test results — 9/9 pass

Production build, synthetic data, destination `delivered@resend.dev` (Resend's test inbox; no real mailbox touched).

| Check | Result |
| --- | --- |
| Domain authentication | verified, 3/3 records |
| Correct sender address | all messages correct |
| General contact delivery | `delivered` |
| Training inquiry delivery | `delivered` |
| School inquiry delivery | `delivered` |
| Partnership inquiry delivery | `delivered` |
| Invalid-input rejection | 422 with field errors |
| Rate limiting | `[200×5, 429, 429]`, `Retry-After: 599` |
| Safe failure when unconfigured | 503, generic message, no leak |

Also verified: acknowledgment delivery and reply-to routing, HTML escaping against a script-injection payload, submission timestamps in Central + UTC, plain-text parts present.

Regression gates: `tsc` clean · lint clean · vitest 69/69 · build 46 pages · link crawl 30/30 · axe 0 violations · registration harness 26/26.

## Blocker

**`INQUIRY_TO_EMAIL` has no production value.** No business inbox exists anywhere in the repository, and inventing one would silently black-hole every enquiry. Until a monitored mailbox is supplied, `emailConfigured()` is false and every inquiry route returns 503 in production. This is the one thing standing between this branch and live email.

Also outstanding: `RESEND_API_KEY` is not confirmed in Vercel project settings (API access unavailable), actual inbox receipt is unconfirmed pending the destination address, no Vercel WAF rule backs the in-memory rate limiter, and `main` remains undeployed and empty of approved work.

## Not done, by design

Not merged. Not deployed. No production DNS changed. Registration submission remains disabled — no medical, waiver or payment data passes through Resend.
