# TAYA Content Contract (Draft — Typed Content Only)

Status: typed content files now; no second CMS; no live TAYA calls in Batch 001.

## Principle

Content is separated from presentation. Pages import typed objects from `lib/content/*`; components render them. This is the seam a future TAYA adapter maps onto.

## Content modules and shapes

| Module | Export | Shape |
| --- | --- | --- |
| `site.ts` | `site`, `navigation`, `footerNavigation`, `stats` | identity, contact placeholders, nav |
| `programs.ts` | `programs`, `formats`, `trainingPrinciples` | 8 disciplines, 6 formats, 4 principles |
| `bio.ts` | `bio` | intro, mission, paragraphs, emphasis, education, certifications, accomplishments, pendingVerification |
| `technology.ts` | `technology`, `measurementPrinciples` | 4 items with category/role/detail/verification |
| `waivers.ts` | `waiverDocuments`, `getWaiver`, `waiverStatusLabel` | 13 documents |

## Mapping to a future TAYA model

| Site field | TAYA content type (proposed) |
| --- | --- |
| `programs[].title/summary/focus/athleteBenefit` | `TrainingProgram` |
| `formats[].title/availability` | `EngagementFormat` |
| `bio.paragraphs[]` | `BioSection` (rich text) |
| `technology[].detail/verification` | `TechnologyItem` |
| `waiverDocuments[]` | `LegalDocument` (versioned, status-gated) |

## Rules

- Presentation never hardcodes copy that belongs in content.
- Waiver `status` and `effectiveDate` are content-controlled so a document cannot be published as binding by a UI change alone.
- Contact details remain nullable; a future CMS must not force invented values.
- No second CMS is introduced; TAYA is the single content source when adopted.

## Out of scope for Batch 001

No TAYA client, no schema migration, no webhook. This document defines the target only.
