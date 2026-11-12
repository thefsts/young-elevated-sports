# Localization coverage — English (default) and Spanish

## Architecture

- `lib/i18n/config.ts` — locale list, cookie name, header name, `localizedPath`,
  `stripLocale`, `absoluteLocalized`.
- `lib/i18n/dictionaries.ts` — flat `en` / `es` dictionaries. `TranslationKey`
  is derived from `en`, so a missing or misspelled Spanish key fails typecheck and
  the "every English key exists in Spanish" unit test.
- `lib/i18n/server.ts` — `getTranslator()` for server components, reading the
  locale from the request header set by middleware.
- `lib/i18n/client.tsx` — `I18nProvider` / `useI18n()` for client components.
- `middleware.ts` — rewrites `/es/...` to the internal route while preserving the
  visible URL, sets the locale request header and the `content-language`
  response header.
- `lib/validation.ts` — schema factories take a `ValidationMessages` pack
  (`enValidation` / `esValidation`), so validation rules cannot drift between
  locales.
- `lib/content/programs.ts` — Spanish overlay for the eight disciplines, the six
  service formats, and the four training principles.

## Routing and SEO

- English stays unprefixed (`/classes`); Spanish is prefixed (`/es/classes`).
- Every localized page emits a self-referencing canonical plus `hreflang`
  alternates for `en-US` and `es-US`.
- The chosen locale is stored in the `yesp_locale` cookie and survives refresh and
  navigation.

## Coverage matrix

| Surface | English | Spanish | Notes |
| --- | --- | --- | --- |
| Header / mobile nav | ✅ | ✅ | All 7 items, CTA, menu labels |
| Language selector | ✅ | ✅ | Desktop + mobile, `aria-pressed`, `lang` |
| Homepage | ✅ | ✅ | Hero, ticker, manifesto, programs, coach, method, technology, pillars, DFW, CTA |
| Training page | ✅ | ✅ | Hero, 8 disciplines (title/summary/focus/benefit), 6 formats, 4 principles, notices |
| Classes index | ✅ | ✅ | Titles, statuses, filters, schedule explorer, CTAs |
| Class detail | ✅ | ✅ | Structure, labels, status, schedule-pending copy |
| Class registration | ✅ | ✅ | All labels, audiences, review, errors, success |
| Inquiry forms | ✅ | ✅ | Labels, consent, privacy, errors |
| Validation errors | ✅ | ✅ | Separate message packs, tested |
| Confirmation messages | ✅ | ✅ | Success and delivery-failure copy |
| Footer | ✅ | ✅ | Columns, legal links, cookie reopen, draft notice |
| Accessibility toolbar | ✅ | ✅ | Every control and status message |
| Cookie banner / preferences | ✅ | ✅ | Categories, descriptions, buttons |
| Privacy / policy navigation | ✅ | ✅ | Nav labels and links |
| Registration instructions | ✅ | ✅ | Disabled-state notices |
| Waiver body text | ✅ English only | ⚠️ Informational notice | Spanish page shows an English-authoritative banner; signature collection stays disabled |
| About / Technology / Athletes / Contact body copy | ✅ | ⚠️ Chrome only | Nav, footer, CTAs, and headings localized; long-form body copy still English |

## Legal handling for Spanish

- English drafts remain authoritative.
- `/es/waivers/*` renders an informational-only notice stating that the English
  version governs and that signature collection is disabled.
- No Spanish waiver is presented as legally reviewed, and no signature field is
  enabled on an unreviewed translation.

## Known gaps

1. Long-form body copy on About, Performance Technology, Athletes, Contact,
   Results, and Media is still English. Chrome, navigation, forms, classes, and
   all interactive controls are translated.
2. Legal documents are not translated. This is intentional until counsel
   approves a Spanish version.
