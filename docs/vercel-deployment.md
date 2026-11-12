# Vercel Deployment

## Project

- Dedicated project: **`young-elevated-sports`**
- Framework preset: Next.js
- Node: 22.x (matches `.nvmrc`)
- Preview first; production cutover only after approval.

## Environment variables

| Name | Scope | Required |
| --- | --- | --- |
| `RESEND_API_KEY` | Production, Preview | For email |
| `INQUIRY_FROM_EMAIL` | Production, Preview | For email |
| `INQUIRY_TO_EMAIL` | Production, Preview | For email |
| `NEXT_PUBLIC_SITE_URL` | Production, Preview | Recommended |

## Deploy steps

1. Import `thefsts/young-elevated-sports` into Vercel.
2. Set the project name to `young-elevated-sports`.
3. Add environment variables (above).
4. Deploy the feature branch as a **Preview**.
5. Verify: build succeeds, all routes resolve, brand/media assets load, forms behave (including graceful 503 when email is unconfigured), responsive layout, no secrets in the client bundle, no sensitive persistence, no accidental publication of binding legal terms.

## Pre-cutover checklist (prepare, do not execute)

- [ ] Preview build green and reviewed.
- [ ] All 39 static routes and 13 waiver pages load.
- [ ] `/api/inquiry` returns 503 (not a fake success) when email is unconfigured.
- [ ] Security headers present on responses.
- [ ] Lighthouse run recorded (see `test-results.md`).
- [ ] Resend domain verified (SPF/DKIM/DMARC).
- [ ] Legal review of waivers and policies complete.
- [ ] DNS for `youngelevatedsports.com` prepared but **not** switched.

## DNS preparation (do not cut over)

Document the intended records (A/CNAME to Vercel, `www` redirect, MX untouched) in the change ticket. Do not modify production DNS in Batch 001.

## Rollback

Vercel keeps immutable deployments; promote the previous deployment to roll back. No database migrations exist in Batch 001.
