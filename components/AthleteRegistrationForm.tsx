"use client";

import { useId, useMemo, useState } from "react";
import { athleteRegistrationSchema, fieldErrors, ageFromDate } from "@/lib/validation";

type Step = 0 | 1 | 2;

const STEP_LABELS = ["Athlete", "Guardian & medical", "Review"] as const;

function Field({
  id,
  label,
  error,
  required,
  hint,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
        {required ? <span className="text-gold"> *</span> : null}
      </label>
      {children}
      {hint ? <p className="mt-1.5 font-sans text-xs text-white/40">{hint}</p> : null}
      {error ? (
        <p id={`${id}-error`} className="field-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function AthleteRegistrationForm() {
  const uid = useId();
  const [step, setStep] = useState<Step>(0);
  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const age = useMemo(() => ageFromDate(values.dateOfBirth ?? ""), [values.dateOfBirth]);
  const isMinor = age !== null && age < 18;

  function set(name: string, value: string) {
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }

  function validate(): boolean {
    const parsed = athleteRegistrationSchema.safeParse({
      ...values,
      participationAcknowledged: values.participationAcknowledged === "true" ? true : undefined,
    });
    if (!parsed.success) {
      setErrors(fieldErrors(parsed.error));
      return false;
    }
    setErrors({});
    return true;
  }

  function next() {
    if (!validate()) return;
    setStep((s) => (s < 2 ? ((s + 1) as Step) : s));
  }

  function back() {
    setStep((s) => (s > 0 ? ((s - 1) as Step) : s));
  }

  const text = (name: string) => values[name] ?? "";

  return (
    <div className="border border-white/10 bg-graphite/50">
      <div className="border-b border-white/10 px-6 py-5">
        <ol className="flex flex-wrap gap-x-6 gap-y-2">
          {STEP_LABELS.map((label, index) => (
            <li key={label} className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className={`flex h-6 w-6 items-center justify-center border font-sans text-[0.65rem] ${
                  index === step
                    ? "border-gold bg-gold text-ink"
                    : index < step
                      ? "border-gold/50 text-gold"
                      : "border-white/20 text-white/40"
                }`}
              >
                {index + 1}
              </span>
              <span
                className={`font-sans text-[0.68rem] uppercase tracking-[0.18em] ${
                  index === step ? "text-white" : "text-white/40"
                }`}
              >
                {label}
                {index === step ? <span className="sr-only"> (current step)</span> : null}
              </span>
            </li>
          ))}
        </ol>
      </div>

      <div className="px-6 py-8">
        {step === 0 ? (
          <div className="grid gap-6 sm:grid-cols-2">
            <Field id={`${uid}-afn`} label="Athlete first name" required error={errors.athleteFirstName}>
              <input
                id={`${uid}-afn`}
                className="field-input"
                autoComplete="off"
                value={text("athleteFirstName")}
                onChange={(e) => set("athleteFirstName", e.target.value)}
                aria-invalid={errors.athleteFirstName ? true : undefined}
              />
            </Field>
            <Field id={`${uid}-aln`} label="Athlete last name" required error={errors.athleteLastName}>
              <input
                id={`${uid}-aln`}
                className="field-input"
                autoComplete="off"
                value={text("athleteLastName")}
                onChange={(e) => set("athleteLastName", e.target.value)}
                aria-invalid={errors.athleteLastName ? true : undefined}
              />
            </Field>
            <Field
              id={`${uid}-dob`}
              label="Date of birth"
              required
              error={errors.dateOfBirth}
              hint={age !== null ? `Age ${age}${isMinor ? " — guardian-led registration required" : ""}` : undefined}
            >
              <input
                id={`${uid}-dob`}
                type="date"
                className="field-input"
                value={text("dateOfBirth")}
                onChange={(e) => set("dateOfBirth", e.target.value)}
                aria-invalid={errors.dateOfBirth ? true : undefined}
              />
            </Field>
            <Field id={`${uid}-gender`} label="Gender (optional)" error={errors.gender}>
              <select
                id={`${uid}-gender`}
                className="field-input"
                value={text("gender")}
                onChange={(e) => set("gender", e.target.value)}
              >
                <option value="">Prefer not to say</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Non-binary">Non-binary</option>
                <option value="Self-describe">Self-describe</option>
              </select>
            </Field>
            <Field id={`${uid}-sport`} label="Primary sport" required error={errors.sport}>
              <input
                id={`${uid}-sport`}
                className="field-input"
                value={text("sport")}
                onChange={(e) => set("sport", e.target.value)}
                aria-invalid={errors.sport ? true : undefined}
              />
            </Field>
            <Field id={`${uid}-position`} label="Position (optional)" error={errors.position}>
              <input
                id={`${uid}-position`}
                className="field-input"
                value={text("position")}
                onChange={(e) => set("position", e.target.value)}
              />
            </Field>
            <Field id={`${uid}-school`} label="School / team (optional)" error={errors.school}>
              <input
                id={`${uid}-school`}
                className="field-input"
                value={text("school")}
                onChange={(e) => set("school", e.target.value)}
              />
            </Field>
            <Field id={`${uid}-grade`} label="Grade (optional)" error={errors.grade}>
              <input
                id={`${uid}-grade`}
                className="field-input"
                value={text("grade")}
                onChange={(e) => set("grade", e.target.value)}
              />
            </Field>
          </div>
        ) : null}

        {step === 1 ? (
          <div className="space-y-8">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field id={`${uid}-gfn`} label="Guardian first name" required error={errors.guardianFirstName}>
                <input
                  id={`${uid}-gfn`}
                  className="field-input"
                  autoComplete="off"
                  value={text("guardianFirstName")}
                  onChange={(e) => set("guardianFirstName", e.target.value)}
                />
              </Field>
              <Field id={`${uid}-gln`} label="Guardian last name" required error={errors.guardianLastName}>
                <input
                  id={`${uid}-gln`}
                  className="field-input"
                  autoComplete="off"
                  value={text("guardianLastName")}
                  onChange={(e) => set("guardianLastName", e.target.value)}
                />
              </Field>
              <Field id={`${uid}-grel`} label="Relationship to athlete" required error={errors.guardianRelationship}>
                <select
                  id={`${uid}-grel`}
                  className="field-input"
                  value={text("guardianRelationship")}
                  onChange={(e) => set("guardianRelationship", e.target.value)}
                >
                  <option value="">Select…</option>
                  <option>Parent</option>
                  <option>Legal guardian</option>
                  <option>Grandparent</option>
                  <option>Other authorized adult</option>
                </select>
              </Field>
              <Field id={`${uid}-gph`} label="Guardian phone" required error={errors.guardianPhone}>
                <input
                  id={`${uid}-gph`}
                  type="tel"
                  className="field-input"
                  value={text("guardianPhone")}
                  onChange={(e) => set("guardianPhone", e.target.value)}
                />
              </Field>
              <Field id={`${uid}-gem`} label="Guardian email" required error={errors.guardianEmail}>
                <input
                  id={`${uid}-gem`}
                  type="email"
                  className="field-input"
                  value={text("guardianEmail")}
                  onChange={(e) => set("guardianEmail", e.target.value)}
                />
              </Field>
              <Field id={`${uid}-ename`} label="Emergency contact name" required error={errors.emergencyName}>
                <input
                  id={`${uid}-ename`}
                  className="field-input"
                  value={text("emergencyName")}
                  onChange={(e) => set("emergencyName", e.target.value)}
                />
              </Field>
              <Field id={`${uid}-eph`} label="Emergency contact phone" required error={errors.emergencyPhone}>
                <input
                  id={`${uid}-eph`}
                  type="tel"
                  className="field-input"
                  value={text("emergencyPhone")}
                  onChange={(e) => set("emergencyPhone", e.target.value)}
                />
              </Field>
            </div>

            <Field id={`${uid}-obj`} label="Training objectives" required error={errors.objectives}>
              <textarea
                id={`${uid}-obj`}
                rows={3}
                className="field-input resize-y"
                value={text("objectives")}
                onChange={(e) => set("objectives", e.target.value)}
              />
            </Field>

            <div className="border-l-2 border-gold/40 bg-gold/[0.05] px-5 py-4">
              <p className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-gold">
                Sensitive health information
              </p>
              <p className="mt-2 font-sans text-sm leading-6 text-silver">
                The fields below would be transmitted only through an approved secure channel. They
                are shown here so the form is complete, but this preview does not store or send them.
              </p>
            </div>

            <div className="grid gap-6">
              <Field id={`${uid}-inj`} label="Prior / current injuries (optional)" error={errors.injuries}>
                <textarea
                  id={`${uid}-inj`}
                  rows={2}
                  className="field-input resize-y"
                  value={text("injuries")}
                  onChange={(e) => set("injuries", e.target.value)}
                />
              </Field>
              <Field id={`${uid}-sur`} label="Surgeries or restrictions (optional)" error={errors.surgeries}>
                <textarea
                  id={`${uid}-sur`}
                  rows={2}
                  className="field-input resize-y"
                  value={text("surgeries")}
                  onChange={(e) => set("surgeries", e.target.value)}
                />
              </Field>
              <Field id={`${uid}-alg`} label="Allergies / medical conditions (optional)" error={errors.allergies}>
                <textarea
                  id={`${uid}-alg`}
                  rows={2}
                  className="field-input resize-y"
                  value={text("allergies")}
                  onChange={(e) => set("allergies", e.target.value)}
                />
              </Field>
              <Field id={`${uid}-phy`} label="Physician contact (optional)" error={errors.physician}>
                <input
                  id={`${uid}-phy`}
                  className="field-input"
                  value={text("physician")}
                  onChange={(e) => set("physician", e.target.value)}
                />
              </Field>
            </div>
          </div>
        ) : null}

        {step === 2 ? (
          <div className="space-y-8">
            <div>
              <p className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-gold">
                Review
              </p>
              <dl className="mt-4 divide-y divide-white/10 border-y border-white/10">
                {[
                  ["Athlete", `${text("athleteFirstName")} ${text("athleteLastName")}`.trim()],
                  ["Date of birth", text("dateOfBirth")],
                  ["Sport / position", [text("sport"), text("position")].filter(Boolean).join(" · ")],
                  ["School / grade", [text("school"), text("grade")].filter(Boolean).join(" · ")],
                  ["Guardian", `${text("guardianFirstName")} ${text("guardianLastName")}`.trim()],
                  ["Relationship", text("guardianRelationship")],
                  ["Guardian contact", [text("guardianPhone"), text("guardianEmail")].filter(Boolean).join(" · ")],
                  ["Emergency contact", [text("emergencyName"), text("emergencyPhone")].filter(Boolean).join(" · ")],
                  ["Objectives", text("objectives")],
                ].map(([label, value]) => (
                  <div key={label} className="grid gap-1 py-3 sm:grid-cols-[12rem_1fr] sm:gap-4">
                    <dt className="font-sans text-xs uppercase tracking-[0.16em] text-white/40">{label}</dt>
                    <dd className="font-sans text-sm text-white">{value || "—"}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="space-y-5">
              <label htmlFor={`${uid}-ack`} className="flex items-start gap-3">
                <input
                  id={`${uid}-ack`}
                  type="checkbox"
                  className="mt-1 h-4 w-4 shrink-0 accent-[#D6A73B]"
                  checked={values.participationAcknowledged === "true"}
                  onChange={(e) => set("participationAcknowledged", e.target.checked ? "true" : "")}
                />
                <span className="font-sans text-sm leading-6 text-silver">
                  I acknowledge that athletic training involves inherent risk, that no specific result
                  is guaranteed, and that required waivers must be reviewed and signed before training.
                  <span className="text-gold"> *</span>
                </span>
              </label>
              {errors.participationAcknowledged ? (
                <p className="field-error ml-7">{errors.participationAcknowledged}</p>
              ) : null}

              <div className="grid gap-6 sm:grid-cols-2">
                <Field id={`${uid}-gsig`} label="Guardian signature (typed full name)" required error={errors.guardianSignature}>
                  <input
                    id={`${uid}-gsig`}
                    className="field-input"
                    value={text("guardianSignature")}
                    onChange={(e) => set("guardianSignature", e.target.value)}
                  />
                </Field>
                <Field id={`${uid}-asig`} label="Athlete signature (optional)" error={errors.athleteSignature}>
                  <input
                    id={`${uid}-asig`}
                    className="field-input"
                    value={text("athleteSignature")}
                    onChange={(e) => set("athleteSignature", e.target.value)}
                  />
                </Field>
              </div>
            </div>

            <div role="note" className="border-l-2 border-white/25 bg-white/[0.03] px-5 py-4">
              <p className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-white/70">
                Submission disabled — pending approval
              </p>
              <p className="mt-2 font-sans text-sm leading-6 text-silver">
                This registration form is complete but cannot be submitted yet. Final submission
                remains disabled until approved secure storage, verified guardian consent, signature
                audit records, versioned waiver acceptance, retention and deletion controls, and a
                completed privacy review are in place. No data entered here is stored or transmitted.
              </p>
            </div>
          </div>
        ) : null}
      </div>

      <div className="flex flex-col gap-3 border-t border-white/10 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-3">
          {step > 0 ? (
            <button type="button" onClick={back} className="btn-ghost">
              Back
            </button>
          ) : null}
          {step < 2 ? (
            <button type="button" onClick={next} className="btn-primary">
              Continue
            </button>
          ) : null}
        </div>
        {step === 2 ? (
          <button
            type="button"
            disabled
            aria-describedby={`${uid}-disabled-note`}
            className="btn-primary cursor-not-allowed opacity-50"
          >
            Submit registration (disabled)
          </button>
        ) : null}
      </div>
      <p id={`${uid}-disabled-note`} className="sr-only">
        Registration submission is disabled pending legal, privacy, and secure-storage approval.
      </p>
    </div>
  );
}
