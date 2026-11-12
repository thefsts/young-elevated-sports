/**
 * Layered, dependency-free abuse protection for public forms.
 *
 * Layer 1 — request shape: body size cap, JSON content type, honeypot.
 * Layer 2 — timing: submissions faster than a human can type are rejected.
 * Layer 3 — rate limiting: per-IP fixed window (see lib/rate-limit.ts).
 * Layer 4 — content heuristics: link density, spam vocabulary, repeated text.
 * Layer 5 — platform: Vercel Firewall / WAF rules (documented, not code).
 *
 * Layers 1–4 are best-effort and must never be the only control. Layer 5 is the
 * durable control and is documented in docs/abuse-protection.md.
 */

/** Hard cap on request body size for any public form endpoint. */
export const MAX_BODY_BYTES = 16 * 1024;

/** A human cannot read and complete a real form faster than this. */
export const MIN_FILL_MS = 2500;

/** Max number of URLs tolerated in a free-text field. */
export const MAX_LINKS = 2;

const DISPOSABLE_DOMAINS = new Set([
  "mailinator.com",
  "guerrillamail.com",
  "10minutemail.com",
  "tempmail.com",
  "temp-mail.org",
  "throwawaymail.com",
  "yopmail.com",
  "trashmail.com",
  "sharklasers.com",
  "getnada.com",
  "dispostable.com",
  "fakeinbox.com",
]);

const SPAM_TERMS = [
  "seo services",
  "backlink",
  "guest post",
  "crypto",
  "casino",
  "viagra",
  "loan offer",
  "work from home",
  "click here to buy",
  "rank higher on google",
  "web design offer",
  "digital marketing agency",
];

export type AbuseVerdict = { ok: true } | { ok: false; reason: string; status: number };

const OK: AbuseVerdict = { ok: true };

/** Reject bodies that exceed the byte cap before parsing. */
export function checkBodySize(raw: string): AbuseVerdict {
  const bytes = new TextEncoder().encode(raw).length;
  if (bytes > MAX_BODY_BYTES) {
    return { ok: false, reason: "payload_too_large", status: 413 };
  }
  return OK;
}

/** Reject non-JSON submissions outright. */
export function checkContentType(request: Request): AbuseVerdict {
  const type = request.headers.get("content-type") ?? "";
  if (!type.toLowerCase().includes("application/json")) {
    return { ok: false, reason: "unsupported_media_type", status: 415 };
  }
  return OK;
}

/** A filled honeypot is a bot. Answer 200 so the bot learns nothing. */
export function isHoneypotTripped(value: unknown): boolean {
  return typeof value === "string" && value.trim().length > 0;
}

/**
 * Elapsed-time check. `startedAt` is an opaque client timestamp in ms.
 * Missing or unparseable timestamps are treated as acceptable so a browser with
 * JavaScript disabled can still submit.
 */
export function checkFillTime(startedAt: unknown, now = Date.now()): AbuseVerdict {
  if (startedAt === undefined || startedAt === null || startedAt === "") return OK;
  const started = Number(startedAt);
  if (!Number.isFinite(started) || started <= 0) return OK;
  const elapsed = now - started;
  if (elapsed >= 0 && elapsed < MIN_FILL_MS) {
    return { ok: false, reason: "submitted_too_fast", status: 400 };
  }
  return OK;
}

/** Count http(s) URLs in a string. */
export function countLinks(value: string): number {
  const matches = value.match(/https?:\/\//gi);
  return matches ? matches.length : 0;
}

/** Reject free text that is mostly links or matches known spam vocabulary. */
export function checkContent(value: string): AbuseVerdict {
  const text = value.toLowerCase();
  if (countLinks(text) > MAX_LINKS) {
    return { ok: false, reason: "too_many_links", status: 400 };
  }
  for (const term of SPAM_TERMS) {
    if (text.includes(term)) {
      return { ok: false, reason: "spam_content", status: 400 };
    }
  }
  // A single repeated token filling the message is not a real inquiry.
  const words = text.split(/\s+/).filter(Boolean);
  if (words.length >= 12) {
    const unique = new Set(words);
    if (unique.size / words.length < 0.25) {
      return { ok: false, reason: "repetitive_content", status: 400 };
    }
  }
  return OK;
}

/** Reject known disposable-mail providers on public inquiry forms. */
export function checkEmailDomain(email: string): AbuseVerdict {
  const domain = email.split("@")[1]?.toLowerCase().trim();
  if (domain && DISPOSABLE_DOMAINS.has(domain)) {
    return { ok: false, reason: "disposable_email", status: 400 };
  }
  return OK;
}

/** Run every content layer over the free-text fields of a submission. */
export function screenSubmission(input: {
  message?: string;
  email?: string;
  startedAt?: unknown;
  now?: number;
}): AbuseVerdict {
  const time = checkFillTime(input.startedAt, input.now ?? Date.now());
  if (!time.ok) return time;

  if (input.email) {
    const domain = checkEmailDomain(input.email);
    if (!domain.ok) return domain;
  }

  if (input.message) {
    const content = checkContent(input.message);
    if (!content.ok) return content;
  }

  return OK;
}

/** Standard response headers for form endpoints. */
export function formHeaders(extra: Record<string, string> = {}): Record<string, string> {
  return {
    "cache-control": "no-store",
    "x-content-type-options": "nosniff",
    ...extra,
  };
}
