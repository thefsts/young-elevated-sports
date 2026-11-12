# Privacy & Security Plan

## Principles

1. **Data minimization** — collect only what is needed for the stated purpose.
2. **Purpose separation** — required participation data is never bundled with optional marketing or media consent.
3. **Minor-first** — guardian-led registration; no under-13 collection before COPPA review.
4. **Sensitive data isolation** — medical/health data stays out of analytics, URLs, logs, and marketing email.
5. **No invented trust** — no compliance certification is claimed.

## Data classes

| Class | Examples | Storage | Status |
| --- | --- | --- | --- |
| Public inquiry | Name, email, phone, message | Email inbox via Resend | Live |
| Sensitive registration | DOB, guardian, medical disclosure, signatures | None yet | Disabled |
| Waiver acceptance | Document version, signature, timestamp | None yet | Disabled |

## Technical controls (implemented)

- HTTPS/HSTS via security headers in `next.config.ts`.
- CSP restricting sources to self, `frame-ancestors 'none'`, `object-src 'none'`.
- `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`.
- Server-side Zod validation on all API routes.
- Request size cap (16 KB) and honeypot on inquiry endpoints.
- In-memory rate limiting (best effort; must be backed by Vercel WAF/firewall before launch).
- No secrets in client bundles; Resend key is server-only.
- No third-party analytics or ad pixels installed.
- Forms hold state in memory only; no localStorage for sensitive data.

## Controls required before enabling Class B (registration/waivers)

- Approved encrypted storage with field-level access control.
- Role-based access (RBAC) and audit logging.
- Guardian consent records tied to document version.
- Signature audit trail (identity, version, timestamp, device context).
- Retention and deletion schedule with a documented workflow.
- Secure delivery channel (no medical data by plain email).
- Completed privacy review and legal sign-off.
- Data processing agreements with any vendors handling minor or health data.

## Incident response (draft)

1. Contain and assess scope.
2. Preserve logs (without sensitive payloads).
3. Notify per applicable law and contractual obligations after legal review.
4. Remediate and document.

## Open security items

- Replace in-memory rate limiting with platform-level protection.
- Add server-side logging that explicitly excludes form payloads.
- Add a CSP nonce strategy to remove `'unsafe-inline'` for scripts.
- Commission an independent accessibility and security review before launch.
