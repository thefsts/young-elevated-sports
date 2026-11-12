/**
 * Minimal in-memory fixed-window rate limiter.
 *
 * This is a best-effort guard for a single serverless instance. It is NOT a
 * distributed rate limiter — on Vercel, instances are ephemeral and scaled, so
 * this must be paired with platform-level protection (Vercel Firewall / WAF)
 * before launch. Documented in docs/resend-setup.md and docs/privacy-security-plan.md.
 */

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

export function rateLimit(key: string, limit = 5, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1, resetAt: now + windowMs };
  }

  if (existing.count >= limit) {
    return { allowed: false, remaining: 0, resetAt: existing.resetAt };
  }

  existing.count += 1;
  return { allowed: true, remaining: limit - existing.count, resetAt: existing.resetAt };
}

/** Best-effort client identifier from forwarding headers (Vercel sets these). */
export function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim();
  return ip || request.headers.get("x-real-ip") || "unknown";
}
