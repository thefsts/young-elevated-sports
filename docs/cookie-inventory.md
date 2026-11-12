# Cookie and storage inventory

This is the complete list of first-party storage the site writes. There are **no
third-party analytics, advertising, or marketing tags installed** at this
checkpoint, and the site does not claim otherwise anywhere in the UI.

| Key | Mechanism | Category | Purpose | Lifetime |
| --- | --- | --- | --- | --- |
| `yesp_consent_v1` | `localStorage` | Essential | Records the visitor's consent choices and version. | Until cleared |
| `yesp_cookie_notice_v1` | `localStorage` | Essential | Remembers that the first-visit banner was dismissed. | Until cleared |
| `yesp_locale` | Cookie | Functional | Remembers the chosen language (`en` / `es`). | 1 year |
| `yesp_a11y_prefs_v1` | `localStorage` | Functional | Accessibility toolbar preferences. | Until cleared |
| `yesp_a11y_pos_v1` | `localStorage` | Functional | Position of the floating accessibility launcher. | Until cleared |

## Consent model

- Categories: **essential** (always on), **functional**, **analytics**, **marketing**.
- Every optional category defaults to `false`. Nothing is pre-checked.
- The banner offers three equally prominent actions: reject optional, customize,
  accept optional. Rejecting is as easy as accepting.
- Optional categories are gated by `ConsentGate`, which renders children only
  after that category is granted and re-renders on the `yesp:consent-changed`
  event. With no analytics or marketing scripts installed, the gates currently
  wrap nothing — they exist so a future tag cannot be added without consent.
- Preferences can be reopened from the footer on every page via
  `yesp:open-cookie-preferences`.
- No marketing pixels are loaded on minor registration or class-interest pages.

## What is deliberately not claimed

- The site does not claim to use analytics.
- The site does not claim to use advertising cookies.
- The site does not list third-party processors that are not actually present.

If Vercel Analytics, GA4, or any pixel is added later, this table must be updated
in the same change, and the tag must be mounted inside the matching
`ConsentGate`.
