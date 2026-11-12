import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOCALE, LOCALE_COOKIE, LOCALE_HEADER, LOCALES, isLocale } from "@/lib/i18n/config";

/**
 * Locale-aware routing without duplicating the route tree.
 *
 * `/es/about` is rewritten internally to `/about` while the browser URL stays
 * `/es/about`, so Spanish URLs are real, shareable, and indexable. The active
 * locale is passed to the server render through a request header and persisted
 * in a first-party cookie for repeat visits.
 */
export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // Never touch framework internals, API routes, or files with an extension.
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico" ||
    /\.[a-zA-Z0-9]+$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];

  if (isLocale(first) && first !== DEFAULT_LOCALE) {
    const rest = segments.slice(1).join("/");
    const target = new URL(`/${rest}${search}`, request.url);

    const headers = new Headers(request.headers);
    headers.set(LOCALE_HEADER, first);

    const response = NextResponse.rewrite(target, { request: { headers } });
    response.cookies.set(LOCALE_COOKIE, first, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
      httpOnly: false,
    });
    response.headers.set("content-language", first);
    return response;
  }

  // A request for `/en/...` redirects to the canonical unprefixed English URL.
  if (first === DEFAULT_LOCALE) {
    const rest = segments.slice(1).join("/");
    return NextResponse.redirect(new URL(`/${rest}${search}`, request.url), 308);
  }

  const headers = new Headers(request.headers);
  // A locale rewrite re-enters middleware for the internal path. Respect the
  // locale that the first pass already resolved so the second pass cannot
  // clobber it back to the default (which rendered Spanish URLs in English).
  const resolvedLocale = request.headers.get(LOCALE_HEADER);
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  const active = isLocale(resolvedLocale)
    ? resolvedLocale
    : isLocale(cookieLocale)
      ? cookieLocale
      : DEFAULT_LOCALE;
  headers.set(LOCALE_HEADER, active);

  const response = NextResponse.next({ request: { headers } });
  response.headers.set("content-language", active);
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|api|.*\\..*).*)"],
};

/** Re-exported so the middleware test can assert the supported set. */
export const SUPPORTED_LOCALES = LOCALES;
