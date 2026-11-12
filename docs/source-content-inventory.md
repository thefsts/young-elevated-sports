# Source Content Inventory

Every factual claim on the site must trace to an approved source. This inventory records what is used and what is deliberately withheld.

## Verified and published

| Item | Source | Where |
| --- | --- | --- |
| Founder: Reggie Young | Client directive | `/about`, homepage |
| Former D1 football, Liberty University and University of Colorado | Client directive | `/about` |
| Retired 2023 | Client directive | `/about` |
| B.S. Liberty University, 2023 | Client directive | `/about` |
| A.A. Business Administration, Iowa Central Community College, 2021 | Client directive | `/about` |
| CSCS; CPR & AED | Client directive | `/about` |
| 2018 LHSAA State Champion | Client directive | `/about` |
| 2021 NJCAA D1 All-American | Client directive | `/about` |
| ESPN Top 100 | Client directive | `/about` |
| First-generation college graduate | Client directive | `/about` |
| 8 training disciplines | Client directive | `/training`, homepage |
| Technology: Output Sports, Valor, VertiMax, Vertec | Client directive | `/performance-technology` |
| Service area: Dallas–Fort Worth, Texas | Client directive | site-wide |

## Deliberately withheld (not invented)

| Item | Reason | Handling |
| --- | --- | --- |
| Phone number | Not supplied | `site.contact.phone = null`; inquiry form only |
| Street address | Not supplied | `site.contact.address = null` |
| Business hours | Not supplied | `site.contact.hours = null` |
| Social profiles | Not supplied | `site.social = []` |
| Pricing | Not supplied | "Confirmed on inquiry" |
| Schedules | Not supplied | "Confirmed on inquiry" |
| Athlete results / testimonials | Not supplied with consent | Empty state on `/results` |
| Athlete photographs | Not supplied | Illustrative imagery, labelled |
| Certification expiration dates / badges | Not supplied | "Verification pending" note |
| Majors at Liberty / Iowa Central | Not supplied | Only degree names published |

## Imagery

`public/media/` contains four AI-generated illustrative images (hero track, barbell, facility, technology). Each is labelled illustrative and does not depict client athletes. Replace with licensed client photography when supplied.

## Pending verification

`lib/content/bio.ts` exposes a `pendingVerification` list surfaced on `/about` under "What we have not published" so the gap is transparent rather than hidden.
