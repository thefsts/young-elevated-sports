# Resend Setup

Used for Class A public inquiry email only. No sender address is invented; nothing sends until the environment is configured.

## Environment variables

```
RESEND_API_KEY=re_...
INQUIRY_FROM_EMAIL=inquiries@youngelevatedsports.com
INQUIRY_TO_EMAIL=team@youngelevatedsports.com
```

Set these in Vercel (Production and Preview) and in `.env.local` for local development. Never commit the API key or expose it to the client.

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

| Template | Trigger | Recipient |
| --- | --- | --- |
| Inquiry received (internal) | Contact / training / partner inquiry | `INQUIRY_TO_EMAIL` |
| Inquiry acknowledgment | Same | Sender |
| School inquiry received (internal) | School inquiry | `INQUIRY_TO_EMAIL` |
| School inquiry acknowledgment | Same | Sender |
| Registration acknowledgment | Future — disabled | — |
| Guardian consent notification | Future — disabled | — |

## Behaviour when unconfigured

If `RESEND_API_KEY`, `INQUIRY_FROM_EMAIL`, or `INQUIRY_TO_EMAIL` is missing, the API returns **503** with a clear message. It never pretends to send.

## Failure handling

- Internal send failure → 502 to the client, error logged without payload.
- Acknowledgment failure → logged, inquiry is not lost.
- Rate limit exceeded → 429 with `Retry-After`.

## Security notes

- API key is server-only (Node runtime).
- No medical or health data is accepted by inquiry forms.
- Email HTML escapes user input.
