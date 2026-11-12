"use client";

import { useId, useState } from "react";
import { schoolInquirySchema, fieldErrors } from "@/lib/validation";

type Status = "idle" | "submitting" | "success" | "error";

export function SchoolInquiryForm() {
  const uid = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formMessage, setFormMessage] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrors({});
    setFormMessage(null);

    const formData = new FormData(event.currentTarget);
    const payload: Record<string, string> = {};
    formData.forEach((value, key) => {
      payload[key] = String(value);
    });

    const parsed = schoolInquirySchema.safeParse(payload);
    if (!parsed.success) {
      setErrors(fieldErrors(parsed.error));
      setStatus("error");
      setFormMessage("Please review the highlighted fields and try again.");
      return;
    }

    try {
      const response = await fetch("/api/school-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const data = (await response.json().catch(() => ({}))) as { ok?: boolean; message?: string };
      if (!response.ok || !data.ok) {
        setStatus("error");
        setFormMessage(data.message ?? "We could not send your inquiry just now. Please try again shortly.");
        return;
      }
      setStatus("success");
    } catch {
      setStatus("error");
      setFormMessage("A network error prevented your inquiry from sending. Please check your connection and try again.");
    }
  }

  if (status === "success") {
    return (
      <div role="status" aria-live="polite" className="border border-gold/40 bg-gold/[0.06] px-6 py-10">
        <p className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-gold">
          Inquiry received
        </p>
        <h3 className="mt-3 font-display text-2xl uppercase tracking-wide text-white">
          Thank you &mdash; we have your school inquiry.
        </h3>
        <p className="mt-3 max-w-xl font-sans text-sm leading-6 text-silver">
          A confirmation has been sent to the email you provided. This is an automated acknowledgment,
          not a confirmed services agreement. A member of the team will follow up to discuss scope,
          scheduling, and any required school or district agreements.
        </p>
      </div>
    );
  }

  const field = (
    name: string,
    label: string,
    opts: { type?: string; required?: boolean; half?: boolean; autoComplete?: string } = {},
  ) => {
    const id = `${uid}-${name}`;
    const error = errors[name];
    return (
      <div className={opts.half ? "" : "sm:col-span-2"}>
        <label htmlFor={id} className="field-label">
          {label}
          {opts.required ? <span className="text-gold"> *</span> : null}
        </label>
        <input
          id={id}
          name={name}
          type={opts.type ?? "text"}
          autoComplete={opts.autoComplete}
          aria-required={opts.required || undefined}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className="field-input"
        />
        {error ? (
          <p id={`${id}-error`} className="field-error">
            {error}
          </p>
        ) : null}
      </div>
    );
  };

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      {formMessage ? (
        <div role="alert" className="border-l-2 border-red-400/70 bg-red-500/10 px-5 py-4">
          <p className="font-sans text-sm text-red-200">{formMessage}</p>
        </div>
      ) : null}

      <div className="grid gap-6 sm:grid-cols-2">
        {field("representativeFirstName", "First name", { required: true, half: true, autoComplete: "given-name" })}
        {field("representativeLastName", "Last name", { required: true, half: true, autoComplete: "family-name" })}
        {field("role", "Your role", { required: true, half: true })}
        {field("organization", "School / organization", { required: true, half: true })}
        {field("email", "Email", { type: "email", required: true, half: true, autoComplete: "email" })}
        {field("phone", "Phone", { type: "tel", required: true, half: true, autoComplete: "tel" })}
        {field("services", "Services requested", { required: true, half: true })}
        {field("groupSize", "Approximate group size", { required: true, half: true })}
        {field("proposedDates", "Proposed dates (optional)", { half: true })}
      </div>

      <div>
        <label htmlFor={`${uid}-message`} className="field-label">
          Details<span className="text-gold"> *</span>
        </label>
        <textarea
          id={`${uid}-message`}
          name="message"
          rows={5}
          aria-required
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? `${uid}-message-error` : undefined}
          placeholder="Share the sport(s), number of athletes, facility, and timing. Please do not include student medical or health information."
          className="field-input resize-y"
        />
        {errors.message ? (
          <p id={`${uid}-message-error`} className="field-error">
            {errors.message}
          </p>
        ) : null}
      </div>

      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`${uid}-website`}>Website</label>
        <input id={`${uid}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="space-y-4">
        <label htmlFor={`${uid}-auth`} className="flex items-start gap-3">
          <input
            id={`${uid}-auth`}
            name="authorityConfirmed"
            type="checkbox"
            value="true"
            className="mt-1 h-4 w-4 shrink-0 accent-[#D6A73B]"
            aria-invalid={errors.authorityConfirmed ? true : undefined}
          />
          <span className="font-sans text-sm leading-6 text-silver">
            I confirm I am authorized to inquire on behalf of this organization.
            <span className="text-gold"> *</span>
          </span>
        </label>
        {errors.authorityConfirmed ? <p className="field-error ml-7">{errors.authorityConfirmed}</p> : null}

        <label htmlFor={`${uid}-consent`} className="flex items-start gap-3">
          <input
            id={`${uid}-consent`}
            name="contactConsent"
            type="checkbox"
            value="true"
            className="mt-1 h-4 w-4 shrink-0 accent-[#D6A73B]"
            aria-invalid={errors.contactConsent ? true : undefined}
          />
          <span className="font-sans text-sm leading-6 text-silver">
            I agree that Young &amp; Elevated Sports Performance may contact me about this inquiry.
            <span className="text-gold"> *</span>
          </span>
        </label>
        {errors.contactConsent ? <p className="field-error ml-7">{errors.contactConsent}</p> : null}
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <button type="submit" disabled={status === "submitting"} className="btn-primary disabled:opacity-60">
          {status === "submitting" ? "Sending\u2026" : "Send school inquiry"}
        </button>
        <p className="font-sans text-xs leading-5 text-white/60">
          Please do not include student medical, injury, or health information in this form.
        </p>
      </div>
    </form>
  );
}
