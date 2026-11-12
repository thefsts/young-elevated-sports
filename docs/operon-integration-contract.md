# OPERON Integration Contract (Draft — Spec Only)

Status: **specification only**. No live data, no credentials, no calls. OPERON is reserved for a later batch.

## Purpose

Define the event contract between this site and OPERON CRM so a future adapter can be implemented without changing the site's content or form logic.

## Transport

- HTTPS JSON `POST` to an OPERON endpoint.
- Server-side only; API key from environment (`OPERON_API_KEY`), never in the client.
- Idempotency via a client-generated `eventId` (UUID) and `occurredAt` timestamp.

## Envelope

```json
{
  "eventId": "uuid",
  "eventType": "lead.created",
  "occurredAt": "2025-01-01T00:00:00Z",
  "source": "youngelevatedsports.com",
  "schemaVersion": "1.0",
  "data": { }
}
```

## Event types

| Event | Trigger | Key data |
| --- | --- | --- |
| `lead.created` | Any public inquiry accepted | name, email, phone, inquiryType, message |
| `training.inquiry.created` | Training inquiry | athleteName, athleteAge, sport, interest, preferredDates |
| `school.inquiry.created` | School inquiry | organization, role, services, groupSize, proposedDates |
| `registration.completed` | Future: registration submitted | athlete ref, guardian ref (no medical data) |
| `guardian.consent.completed` | Future: guardian consent recorded | consent ref, document versions |
| `waiver.signed` | Future: waiver signed | documentId, version, signerRole, signedAt |
| `booking.requested` | Future: booking requested | program, requested window |

## Data rules

- **No medical data in CRM leads by default.** Injuries, surgeries, allergies, and physician details are excluded from every event payload.
- No minor's sensitive data leaves the approved secure system.
- Only the minimum fields needed for follow-up are sent.
- PII is transmitted over TLS and stored per the privacy plan.

## Failure handling

- Retry with exponential backoff on 5xx.
- Do not block the user's inquiry if CRM delivery fails; log and queue.
- Dead-letter after N attempts for manual review.

## Out of scope for Batch 001

No adapter code, no webhooks, no credentials, no data mapping beyond this document.
