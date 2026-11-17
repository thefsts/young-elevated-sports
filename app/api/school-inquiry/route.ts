import { NextResponse } from "next/server";
import { schoolInquirySchema, fieldErrors } from "@/lib/validation";
import { sendSchoolInquiryEmails, emailConfigured } from "@/lib/email";
import { rateLimit, clientKey } from "@/lib/rate-limit";
import {
  MAX_BODY_BYTES,
  checkBodySize,
  checkContentType,
  checkFillTime,
  formHeaders,
  screenSubmission,
} from "@/lib/abuse";

export const runtime = "nodejs";

/**
 * School / team inquiry endpoint.
 *
 * Same layered protection as the other public forms. A success response is
 * returned only after Resend accepts the message.
 */
export async function POST(request: Request) {
  const contentType = checkContentType(request);
  if (!contentType.ok) {
    return NextResponse.json(
      { ok: false, message: contentType.reason },
      { status: contentType.status, headers: formHeaders() },
    );
  }

  const declaredLength = Number(request.headers.get("content-length") ?? "0");
  if (declaredLength > MAX_BODY_BYTES) {
    return NextResponse.json(
      { ok: false, message: "That request is too large to submit." },
      { status: 413, headers: formHeaders() },
    );
  }

  const limit = rateLimit(`school:${clientKey(request)}`, 4, 10 * 60 * 1000);
  if (!limit.allowed) {
    return NextResponse.json(
      { ok: false, message: "Too many attempts. Please wait a few minutes and try again." },
      {
        status: 429,
        headers: formHeaders({
          "Retry-After": String(Math.ceil((limit.resetAt - Date.now()) / 1000)),
        }),
      },
    );
  }

  let raw: string;
  try {
    raw = await request.text();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Malformed request." },
      { status: 400, headers: formHeaders() },
    );
  }

  const size = checkBodySize(raw);
  if (!size.ok) {
    return NextResponse.json(
      { ok: false, message: size.reason },
      { status: size.status, headers: formHeaders() },
    );
  }

  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch {
    return NextResponse.json(
      { ok: false, message: "Malformed request." },
      { status: 400, headers: formHeaders() },
    );
  }

  const parsed = schoolInquirySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: "Please review the highlighted fields.", errors: fieldErrors(parsed.error) },
      { status: 422, headers: formHeaders() },
    );
  }

  const data = parsed.data;

  if (data.website) {
    return NextResponse.json({ ok: true }, { headers: formHeaders() });
  }

  const fill = checkFillTime(data.startedAt);
  if (!fill.ok) {
    return NextResponse.json(
      { ok: false, message: fill.reason },
      { status: fill.status, headers: formHeaders() },
    );
  }

  const screen = screenSubmission({ message: data.message, email: data.email });
  if (!screen.ok) {
    return NextResponse.json(
      { ok: false, message: screen.reason },
      { status: screen.status, headers: formHeaders() },
    );
  }

  if (!emailConfigured()) {
    console.error("School inquiry endpoint hit but email is not configured.");
    return NextResponse.json(
      {
        ok: false,
        message:
          "Our message system is not connected yet. Please try again later — contact details will be published once verified.",
      },
      { status: 503, headers: formHeaders() },
    );
  }

  try {
    await sendSchoolInquiryEmails(data);
    return NextResponse.json({ ok: true }, { headers: formHeaders() });
  } catch (error) {
    console.error("School inquiry send failed:", error instanceof Error ? error.message : "unknown error");
    return NextResponse.json(
      { ok: false, message: "We could not send your inquiry just now. Please try again shortly." },
      { status: 502, headers: formHeaders() },
    );
  }
}
