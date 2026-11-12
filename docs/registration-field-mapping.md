# Registration Field Mapping

Maps the original intake PDF fields to the implemented form, validation, and future storage intent. The full intake is preserved in `components/AthleteRegistrationForm.tsx` and `athleteRegistrationSchema` in `lib/validation.ts`.

## Field map

| Original field | Form field | Schema key | Required | Notes |
| --- | --- | --- | --- | --- |
| Athlete name | Athlete first / last | `athleteFirstName`, `athleteLastName` | Yes | Letters/spaces/hyphens/apostrophes |
| Date of birth | Date of birth | `dateOfBirth` | Yes | `YYYY-MM-DD`; drives age and minor check |
| Gender / age | Gender | `gender` | No | Optional; includes self-describe and prefer-not-to-say |
| Sport / position | Primary sport, Position | `sport`, `position` | Sport yes | — |
| School / team | School / team | `school` | No | — |
| Grade | Grade | `grade` | No | — |
| Guardian name | Guardian first / last | `guardianFirstName`, `guardianLastName` | Yes | — |
| Guardian relationship | Relationship | `guardianRelationship` | Yes | Parent / legal guardian / grandparent / other |
| Guardian phone | Guardian phone | `guardianPhone` | Yes | Min 10 chars |
| Guardian email | Guardian email | `guardianEmail` | Yes | Valid email |
| Emergency contact | Emergency name / phone | `emergencyName`, `emergencyPhone` | Yes | — |
| Training objectives | Training objectives | `objectives` | Yes | 10–1200 chars |
| Prior / current injuries | Injuries | `injuries` | No | Sensitive — secure channel only |
| Surgeries / restrictions | Surgeries | `surgeries` | No | Sensitive |
| Allergies / medical conditions | Allergies | `allergies` | No | Sensitive |
| Physician contact | Physician | `physician` | No | Optional |
| Participation acknowledgment | Checkbox | `participationAcknowledged` | Yes | Literal `true` |
| Parent/guardian signature | Guardian signature | `guardianSignature` | Yes | Typed full name (preview) |
| Athlete signature | Athlete signature | `athleteSignature` | No | Typed full name |
| Trainer/staff signature | Staff signature | `staffSignature` | No | Completed by staff, not athlete |

## Minor / guardian boundary

- `ageFromDate()` computes age from DOB.
- If age < 18, the UI flags "guardian-led registration required" and the guardian section is mandatory.
- Registration for an athlete under 13 remains disabled pending COPPA review.

## Data handling

- Sensitive fields (injuries, surgeries, allergies, physician) are visually grouped and labelled as secure-channel-only.
- Nothing in the preview form is stored, logged, or transmitted. Submission is disabled.
- Medical data must never appear in analytics, URLs, logs, or marketing email.

## Future storage intent (not implemented)

When approved: encrypted at rest, role-based access, field-level audit, retention schedule, deletion workflow, and guardian consent records tied to document version.
