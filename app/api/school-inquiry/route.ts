import { NextResponse } from "next/server";
import { schoolInquirySchema, fieldErrors } from "@/lib/validation";
import { sendSchoolInquiryEmails, emailConfigured } from "@/lib/email";
import { rateLimit, clientKey } from "@/lib/rate-limit";

export const runtime = "nodejs";

const MAX_BYTES = 16 * 1024;

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (contentLength > MAX_BYTES) {
    return NextResponse.json(
      { ok: false, message: "That message is too large to submit. Please shorten it and try again." },
      { status: 413 },
    );
  }

  const limit = rateLimit(`school:${clientKey(request)}`, 4, 10 * 60 * 1000);
  if (!limit.allowed) {
    return NextResponse.json(
      { ok: false, message: "Too many attempts. Please wait a few minutes and try again." },
      { status: 429, headers: { "Retry-After": String(Math.ceil((limit.resetAt - Date.now()) / 1000)) } },
    );
  }

  let json: unknown;
  try {
    const raw = await request.text();
    if (raw.length > MAX_BYTES) {
      return NextResponse.json({ ok: false, message: "That message is too large." }, { status: 413 });
    }
    json = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: false, message: "Malformed request." }, { status: 400 });
  }

  const parsed = schoolInquirySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: "Please review the highlighted fields.", errors: fieldErrors(parsed.error) },
      { status: 422 },
    );
  }

  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  if (!emailConfigured()) {
    console.error("School inquiry endpoint hit but email is not configured.");
    return NextResponse.json(
      {
        ok: false,
        message:
          "Our message system is not connected yet. Please try again later — contact details will be published once verified.",
      },
      { status: 503 },
    );
  }

  try {
    await sendSchoolInquiryEmails(parsed.data);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("School inquiry send failed:", error instanceof Error ? error.message : "unknown error");
    return NextResponse.json(
      { ok: false, message: "We could not send your inquiry just now. Please try again shortly." },
      { status: 502 },
    );
  }
}
