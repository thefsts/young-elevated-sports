# Inquiry abuse protection

Applies to `POST /api/inquiry`, `POST /api/school-inquiry`, and
`POST /api/class-interest`.

## Layered controls implemented in the application

1. **Content type** — anything that is not `application/json` is rejected with
   `415` before the body is read.
2. **Declared size** — a `content-length` above `MAX_BODY_BYTES` (16 KiB) is
   rejected with `413` before the body is read.
3. **Actual size** — the body is re-measured after reading; oversized bodies are
   rejected with `413`.
4. **Rate limit** — a fixed-window limiter keyed on `x-forwarded-for` /
   `x-real-ip` plus route name. Class interest allows 5 requests per 10 minutes
   per IP and returns `429` with `Retry-After`.
5. **Honeypot** — a hidden `website` field must be empty. A filled honeypot is
   answered with a plain `{ ok: true }` and no email is sent, so a bot learns
   nothing about the rejection.
6. **Fill time** — submissions completed faster than `MIN_FILL_MS` (2.5 s) are
   rejected. A missing timestamp is allowed so no-JS clients are not blocked.
7. **Disposable email domains** — a curated blocklist rejects known throwaway
   providers.
8. **Link density** — more than two links in the free-text fields is treated as
   spam.
9. **Spam vocabulary** — SEO, crypto, casino, and similar phrases are screened.
10. **Repetition** — repeated-character padding is screened.
11. **Server-side validation** — Zod schemas reject unknown shapes, enforce
    lengths, and require explicit consent. Validation runs before any email is
    attempted.
12. **No sensitive data in email** — class-interest and inquiry payloads carry no
    medical history, no signatures, and no payment data. Athlete registration and
    waiver signing are disabled entirely.

The in-memory limiter is best-effort and single-instance. It is a speed bump, not
a distributed defence.

## Production requirements on Vercel (must be configured in the dashboard)

These are **not** implemented in the repository and must be verified by whoever
owns the Vercel project:

- **Vercel WAF** enabled on the production and preview environments.
- **Rate limiting rule** on `/api/*`: e.g. 30 requests per minute per IP, with a
  managed-challenge action above the threshold.
- **Bot protection** (Vercel BotID or the managed ruleset) on the API paths.
- **Attack Challenge Mode** available as an incident switch.
- **Firewall rule** blocking requests with no `content-type` on `/api/*`.
- **Log drain** so `429`/`413`/`415` bursts are visible.
- **Environment separation** so preview deployments cannot send production email
  from an unverified domain.
- **`RESEND_API_KEY` scoped** to sending only, stored as an encrypted environment
  variable, never exposed to the client.
- **Domain verification** (SPF, DKIM, DMARC) for `youngelevatedsports.com` before
  production email is enabled.

Until those dashboard controls are confirmed, the application-level controls
above are the only protection in place, and this document should not be read as a
claim that WAF protection is live.
