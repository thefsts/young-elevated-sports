# Resend Setup

Used for Class A public inquiry email only. No sender address is invented; nothing sends until the environment is configured.

## Current production status

| Item | Value |
| --- | --- |
| Domain | `youngelevatedsports.com` |
| Resend domain id | `c61f2216-86a1-4942-b76f-a80016807a60` |
| Verification status | `verified` |
| Region | `us-east-1` |
| Sending capability | `enabled` |
| Receiving capability | `disabled` |
| DNS records | 3 of 3 verified — TXT `resend._domainkey`, CNAME `rsend`, CNAME `send` |

Because receiving is **disabled**, `info@youngelevatedsports.com` is a *sending* identity only. It is not assumed to have a mailbox. Replies from visitors are therefore routed to the monitored destination inbox, never to the sender address.

## Environment variables

```
RESEND_API_KEY=re_...
INQUIRY_FROM_EMAIL=info@youngelevatedsports.com
INQUIRY_TO_EMAIL=<monitored business inbox>
```

Set these in Vercel (Production and Preview) and in `.env.local` for local development. Never commit the API key or expose it to the client.

`INQUIRY_TO_EMAIL` must be a real, monitored mailbox. When it is blank, `emailConfigured()` returns false and every inquiry route answers **503** rather than accepting a submission it cannot deliver.

## Sender identity

All outbound mail uses the RFC 5322 header:

```
Young & Elevated Sports Performance <info@youngelevatedsports.com>
```

The display name is a constant (`FROM_NAME` in `lib/email.ts`); the address comes from `INQUIRY_FROM_EMAIL`. Both must stay in sync with the verified Resend domain, or Resend will reject the send.

## Domain verification (DNS)

1. Add the domain in the Resend dashboard.
2. Add the provided **SPF** record (TXT) for the sending domain.
3. Add the **DKIM** records (TXT/CNAME) Resend provides.
4. Add a **DMARC** record, starting with `p=none` and a reporting address, then move toward `quarantine`/`reject` after monitoring.
5. Verify in Resend and send a test.

Example DMARC starting point (replace with the verified reporting mailbox):

```
_dmarc.youngelevatedsports.com  TXT  "v=DMARC1; p=none; rua=mailto:dmarc@youngelevatedsports.com"
```

## Templates implemented (`lib/email.ts`)

Every message is sent as **multipart HTML + plain text**. The plain-text part is not a stub — it carries the same fields as the HTML part.

| Template | Trigger | Recipient | Reply-To |
| --- | --- | --- | --- |
| Inquiry received (internal) | Contact / training / partner inquiry | `INQUIRY_TO_EMAIL` | Visitor's validated email |
| Inquiry acknowledgment | Same | Visitor | `INQUIRY_TO_EMAIL` |
| School inquiry received (internal) | School inquiry | `INQUIRY_TO_EMAIL` | Visitor's validated email |
| School inquiry acknowledgment | Same | Visitor | `INQUIRY_TO_EMAIL` |
| Class interest received (internal) | Class-interest request | `INQUIRY_TO_EMAIL` | Visitor's validated email |
| Class interest acknowledgment | Same | Visitor | `INQUIRY_TO_EMAIL` |
| Registration acknowledgment | Future — disabled | — | — |
| Guardian consent notification | Future — disabled | — | — |

### Required notification fields

Each internal notification begins with three mandatory rows before the contact details:

```
Inquiry category: School / team inquiry
Submitted:        Tuesday, November 17, 2026 at 1:24 PM (Central) — 17 Nov 2026, 19:24 UTC
```

The submission time is rendered in the business's own timezone (`America/Chicago`) with the UTC instant alongside it, so a record is unambiguous regardless of where it is read.

### Form-to-endpoint mapping

| Form | Component | Endpoint | Category |
| --- | --- | --- | --- |
| General contact | `components/InquiryForm.tsx` (`type="contact"`) | `POST /api/inquiry` | General contact |
| Training information | `components/InquiryForm.tsx` (`type="training"`) | `POST /api/inquiry` | Training inquiry |
| Partnership / coach | `components/InquiryForm.tsx` (`type="partner"`) | `POST /api/inquiry` | Coach / partner inquiry |
| School / organization | `components/SchoolInquiryForm.tsx` | `POST /api/school-inquiry` | School / team inquiry |
| Class interest | `components/ClassInterestForm.tsx` | `POST /api/class-interest` | Class interest |

## Behaviour when unconfigured

If `RESEND_API_KEY`, `INQUIRY_FROM_EMAIL`, or `INQUIRY_TO_EMAIL` is missing, the API returns **503** with a clear message. It never pretends to send.

## Failure handling

- Internal send failure → 502 to the client, error logged without payload.
- Acknowledgment failure → logged, inquiry is not lost. The visitor still receives a 200 because the internal notification succeeded.
- Rate limit exceeded → 429 with `Retry-After`.

## Security notes

- API key is server-only (Node runtime). It is never referenced from a client component.
- No medical, injury, waiver, or payment data is accepted by inquiry forms. Registration submission stays disabled.
- Email HTML escapes user input; the plain-text part is generated from the same escaped-safe values.
- Error logs record the provider error message only — never the inquiry payload.
- Rate limiting is per-instance and in-memory. On Vercel this means limits are approximate across concurrent lambdas; Vercel Firewall / WAF rules are the durable control.
