"use client";

/**
 * Seven-step athlete intake, class/package selection and combined waiver.
 *
 * IMPORTANT — SAFETY POSTURE
 * This component deliberately performs NO network I/O. There is no fetch, no
 * form action, no analytics event and no localStorage write. Athlete names,
 * dates of birth, guardian contact details, medical disclosures and signatures
 * never leave the browser tab. Submission, payment and signature capture are
 * rendered as visibly disabled controls with an on-screen explanation, because
 * the destination system, the payment processor and the legally reviewed
 * waiver text are not yet approved.
 *
 * Do not add a submit handler here until counsel has approved the waiver
 * language and a secure, access-controlled intake endpoint exists.
 */

import { useId, useMemo, useRef, useState } from "react";
import {
  classes,
  formatPrice,
  pricing,
  pricingPolicy,
  type PriceGroup,
} from "@/lib/content/classes";
import { useI18n } from "@/lib/i18n/client";

/* ------------------------------------------------------------------- types */

type Values = Record<string, string>;

type Agreements = {
  participation: boolean;
  medical: boolean;
  policies: boolean;
  media: boolean;
};

type Signatures = {
  guardian: string;
  athlete: string;
  date: string;
};

type Errors = Record<string, string>;

const OBJECTIVES = [
  "Speed & Acceleration",
  "Explosive Power",
  "Agility & Change of Direction",
  "Strength Development",
  "Injury Prevention",
  "Sport-Specific Conditioning",
  "Vertical Jump Enhancement",
  "Mobility & Flexibility",
];

const GENDERS = ["Female", "Male", "Non-binary / prefer not to say"];

const GRADES = [
  "Grade 5 or below",
  "Grade 6",
  "Grade 7",
  "Grade 8",
  "Grade 9",
  "Grade 10",
  "Grade 11",
  "Grade 12",
  "College / adult",
];

const RELATIONSHIPS = [
  "Parent",
  "Legal guardian",
  "Grandparent",
  "Sibling (18+)",
  "Other authorized adult",
];

const STEPS = [
  { id: "athlete", title: "Athlete Information", short: "Athlete" },
  { id: "guardian", title: "Parent/Guardian & Emergency Contact", short: "Guardian" },
  { id: "classes", title: "Classes & Package Selection", short: "Classes" },
  { id: "objectives", title: "Training Objectives", short: "Objectives" },
  { id: "medical", title: "Medical & Safety Disclosures", short: "Medical" },
  { id: "waivers", title: "Combined Waivers & Agreements", short: "Waivers" },
  { id: "review", title: "Review & Signature", short: "Review" },
] as const;

/* --------------------------------------------------------------- utilities */

function ageFromDob(dob: string): number | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dob)) return null;
  const born = new Date(`${dob}T00:00:00`);
  if (Number.isNaN(born.getTime())) return null;
  const now = new Date();
  let age = now.getFullYear() - born.getFullYear();
  const monthDiff = now.getMonth() - born.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < born.getDate())) age -= 1;
  if (age < 0 || age > 120) return null;
  return age;
}

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

function isPhone(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return digits.length === 10 || (digits.length === 11 && digits.startsWith("1"));
}

/* ----------------------------------------------------------- small pieces */

function Field({
  id,
  label,
  error,
  required,
  hint,
  full,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  hint?: string;
  full?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <label htmlFor={id} className="field-label">
        {label}
        {required ? (
          <span aria-hidden="true" className="ml-1 text-gold">
            *
          </span>
        ) : (
          <span className="ml-2 text-[0.62rem] font-normal normal-case tracking-normal text-white/60">
            optional
          </span>
        )}
      </label>
      {children}
      {hint ? <p className="mt-1.5 text-[0.72rem] leading-snug text-white/60">{hint}</p> : null}
      {error ? (
        <p id={`${id}-error`} className="field-error" role="alert">
          <span aria-hidden="true">!</span>
          {error}
        </p>
      ) : null}
    </div>
  );
}

function StepHeading({ step, title, intro }: { step: number; title: string; intro: string }) {
  return (
    <div className="mb-7 border-b border-white/10 pb-6">
      <p className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-gold">
        Step {step} of 7
      </p>
      <h2
        id="registration-step-heading"
        tabIndex={-1}
        className="mt-3 font-display text-2xl uppercase leading-tight tracking-tight text-white outline-none sm:text-3xl"
      >
        {title}
      </h2>
      <p className="mt-3 max-w-2xl font-sans text-sm leading-6 text-silver">{intro}</p>
    </div>
  );
}

/* ---------------------------------------------------------------- component */

export function ClassRegistrationForm({ initialClass = "" }: { initialClass?: string }) {
  const { t } = useI18n();
  const uid = useId();
  const headingRef = useRef<HTMLDivElement>(null);

  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Errors>({});
  const [attempted, setAttempted] = useState<Record<number, boolean>>({});
  const [statusMessage, setStatusMessage] = useState<string>("");

  const [values, setValues] = useState<Values>({
    athleteName: "",
    athleteDob: "",
    athleteGender: "",
    athleteSports: "",
    athleteSchool: "",
    athleteGrade: "",
    guardianName: "",
    guardianRelationship: "",
    guardianPhone: "",
    guardianEmail: "",
    emergencyName: "",
    emergencyPhone: "",
    injuries: "",
    injuryDetails: "",
    allergies: "",
    physician: "",
  });

  const [selectedClasses, setSelectedClasses] = useState<string[]>(
    initialClass && classes.some((c) => c.slug === initialClass) ? [initialClass] : [],
  );
  const [packageId, setPackageId] = useState<string>("");
  const [objectives, setObjectives] = useState<string[]>([]);
  const [agreements, setAgreements] = useState<Agreements>({
    participation: false,
    medical: false,
    policies: false,
    media: false,
  });
  // Signature values stay empty by design: capture is disabled until counsel approves.
  const [signatures] = useState<Signatures>({ guardian: "", athlete: "", date: "" });

  const set = (key: string, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const age = useMemo(() => ageFromDob(values.athleteDob), [values.athleteDob]);
  const athleteSignatureRequired = age !== null && age >= 13;
  const selectedPackage = useMemo(() => {
    for (const group of pricing) {
      const found = group.options.find((o) => o.id === packageId);
      if (found) return { group, option: found };
    }
    return null;
  }, [packageId]);

  const selectedClassTitles = useMemo(
    () => classes.filter((c) => selectedClasses.includes(c.slug)).map((c) => c.title),
    [selectedClasses],
  );

  /* ------------------------------------------------------------ validation */

  function validateStep(index: number): Errors {
    const e: Errors = {};
    if (index === 0) {
      if (!values.athleteName.trim()) e.athleteName = "Enter the athlete's full legal name.";
      if (!values.athleteDob) e.athleteDob = "Enter the athlete's date of birth.";
      else if (age === null) e.athleteDob = "Enter a valid date of birth in the past.";
      if (!values.athleteGender) e.athleteGender = "Select an option.";
      if (!values.athleteSports.trim()) e.athleteSports = "List at least one primary sport and position.";
      if (!values.athleteGrade) e.athleteGrade = "Select the current grade level.";
    }
    if (index === 1) {
      if (!values.guardianName.trim()) e.guardianName = "Enter the parent or guardian's full name.";
      if (!values.guardianRelationship) e.guardianRelationship = "Select the relationship to the athlete.";
      if (!values.guardianPhone.trim()) e.guardianPhone = "Enter a phone number.";
      else if (!isPhone(values.guardianPhone)) e.guardianPhone = "Enter a 10-digit US phone number.";
      if (!values.guardianEmail.trim()) e.guardianEmail = "Enter an email address.";
      else if (!isEmail(values.guardianEmail)) e.guardianEmail = "Enter a valid email address.";
      if (!values.emergencyName.trim()) e.emergencyName = "Enter an emergency contact name.";
      if (!values.emergencyPhone.trim()) e.emergencyPhone = "Enter an emergency contact phone number.";
      else if (!isPhone(values.emergencyPhone)) e.emergencyPhone = "Enter a 10-digit US phone number.";
    }
    if (index === 2) {
      if (selectedClasses.length === 0) e.classes = "Select at least one class track.";
      if (!packageId) e.package = "Select a package.";
    }
    if (index === 3) {
      if (objectives.length === 0) e.objectives = "Select at least one training objective.";
    }
    if (index === 4) {
      if (!values.injuries) e.injuries = "Answer this question.";
      else if (values.injuries === "yes" && !values.injuryDetails.trim())
        e.injuryDetails = "Describe the injury, surgery or restriction.";
      if (!values.allergies.trim())
        e.allergies = "List allergies and medical conditions, or write \u201cNone known\u201d.";
    }
    if (index === 5) {
      if (!agreements.participation) e.participation = "This acknowledgment is required.";
      if (!agreements.medical) e.medical = "This authorization is required.";
      if (!agreements.policies) e.policies = "This acknowledgment is required.";
    }
    if (index === 6) {
      if (!signatures.guardian.trim()) e.guardianSignature = "A parent or guardian signature is required.";
      if (athleteSignatureRequired && !signatures.athlete.trim())
        e.athleteSignature = "The athlete is 13 or older, so their signature is required.";
      if (!signatures.date) e.signatureDate = "Enter the date of signature.";
    }
    return e;
  }

  function goToStep(next: number) {
    setStep(next);
    setStatusMessage(`Step ${next + 1} of 7: ${STEPS[next].title}`);
    requestAnimationFrame(() => {
      headingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      document.getElementById("registration-step-heading")?.focus({ preventScroll: true });
    });
  }

  function handleContinue() {
    const found = validateStep(step);
    setAttempted((prev) => ({ ...prev, [step]: true }));
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = Object.keys(found)[0];
      requestAnimationFrame(() => document.getElementById(`${uid}-${first}`)?.focus());
      return;
    }
    if (step < STEPS.length - 1) goToStep(step + 1);
  }

  function handleBack() {
    if (step > 0) goToStep(step - 1);
  }

  const stepComplete = useMemo(() => {
    return STEPS.map((_, index) => {
      if (!attempted[index]) return false;
      return Object.keys(validateStep(index)).length === 0;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attempted, values, selectedClasses, packageId, objectives, agreements, signatures]);

  const showError = (key: string) => (attempted[step] ? errors[key] : undefined);
  const errProps = (key: string) =>
    showError(key)
      ? { "aria-invalid": true as const, "aria-describedby": `${uid}-${key}-error` }
      : {};

  /* ------------------------------------------------------------------ render */

  return (
    <div className="registration-shell">
      {/* Progress rail */}
      <nav aria-label="Registration progress" className="mb-8">
        <ol className="grid grid-cols-7 gap-1.5 sm:gap-2">
          {STEPS.map((s, index) => {
            const isCurrent = index === step;
            const done = stepComplete[index] && index !== step;
            return (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => (index < step || stepComplete[index] ? goToStep(index) : undefined)}
                  disabled={index > step && !stepComplete[index]}
                  aria-current={isCurrent ? "step" : undefined}
                  className={`group w-full border-t-2 pt-2 text-left transition ${
                    isCurrent ? "border-gold" : done ? "border-gold/50" : "border-white/15"
                  } ${index > step && !stepComplete[index] ? "cursor-not-allowed" : "cursor-pointer"}`}
                >
                  <span
                    className={`block font-sans text-[0.6rem] font-semibold uppercase tracking-[0.18em] ${
                      isCurrent ? "text-gold" : done ? "text-gold/85" : "text-white/35"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`mt-1 hidden text-[0.68rem] leading-tight sm:block ${
                      isCurrent ? "text-white" : "text-white/60"
                    }`}
                  >
                    {s.short}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
        <p className="sr-only" aria-live="polite">
          {statusMessage}
        </p>
      </nav>

      <div ref={headingRef} className="scroll-mt-28">
        <div className="card p-5 sm:p-8">
          {/* ---------------------------------------------------- STEP 1 */}
          {step === 0 && (
            <section aria-labelledby="registration-step-heading">
              <StepHeading
                step={1}
                title={STEPS[0].title}
                intro="Who is training. Use the athlete's full legal name exactly as it appears on school or medical records."
              />
              <div className="grid gap-5 sm:grid-cols-2">
                <Field id={`${uid}-athleteName`}
                    label="Athlete full name" required error={showError("athleteName")} full>
                  <input
                    id={`${uid}-athleteName`}
                    name="athleteName"
                    className="field-input"
                    autoComplete="name"
                    value={values.athleteName}
                    onChange={(e) => set("athleteName", e.target.value)}
                    {...errProps("athleteName")}
                  />
                </Field>
                <Field
                  id={`${uid}-athleteDob`}
                  label="Date of birth"
                  required
                  error={showError("athleteDob")}
                  hint={
                    age !== null
                      ? `Age ${age}. ${athleteSignatureRequired ? "Athlete signature required at 13+." : "Guardian signature required."}`
                      : undefined
                  }
                >
                  <input
                    id={`${uid}-athleteDob`}
                    name="athleteDob"
                    type="date"
                    className="field-input"
                    value={values.athleteDob}
                    onChange={(e) => set("athleteDob", e.target.value)}
                    {...errProps("athleteDob")}
                  />
                </Field>
                <Field id={`${uid}-athleteGender`}
                    label="Gender / age" required error={showError("athleteGender")}>
                  <select
                    id={`${uid}-athleteGender`}
                    name="athleteGender"
                    className="field-input"
                    value={values.athleteGender}
                    onChange={(e) => set("athleteGender", e.target.value)}
                    {...errProps("athleteGender")}
                  >
                    <option value="">Select…</option>
                    {GENDERS.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field
                  id={`${uid}-athleteSports`}
                  label="Primary sport(s) & position"
                  required
                  error={showError("athleteSports")}
                >
                  <input
                    id={`${uid}-athleteSports`}
                    name="athleteSports"
                    className="field-input"
                    placeholder="e.g. Football — wide receiver"
                    value={values.athleteSports}
                    onChange={(e) => set("athleteSports", e.target.value)}
                    {...errProps("athleteSports")}
                  />
                </Field>
                <Field id={`${uid}-athleteSchool`}
                    label="School / team name" error={showError("athleteSchool")}>
                  <input
                    id={`${uid}-athleteSchool`}
                    name="athleteSchool"
                    className="field-input"
                    value={values.athleteSchool}
                    onChange={(e) => set("athleteSchool", e.target.value)}
                  />
                </Field>
                <Field id={`${uid}-athleteGrade`}
                    label="Current grade level" required error={showError("athleteGrade")}>
                  <select
                    id={`${uid}-athleteGrade`}
                    name="athleteGrade"
                    className="field-input"
                    value={values.athleteGrade}
                    onChange={(e) => set("athleteGrade", e.target.value)}
                    {...errProps("athleteGrade")}
                  >
                    <option value="">Select…</option>
                    {GRADES.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>
            </section>
          )}

          {/* ---------------------------------------------------- STEP 2 */}
          {step === 1 && (
            <section aria-labelledby="registration-step-heading">
              <StepHeading
                step={2}
                title={STEPS[1].title}
                intro="The adult we contact about this athlete, and the person to reach if an emergency happens during training."
              />
              <div className="grid gap-5 sm:grid-cols-2">
                <Field id={`${uid}-guardianName`}
                    label="Parent / guardian full name" required error={showError("guardianName")}>
                  <input
                    id={`${uid}-guardianName`}
                    name="guardianName"
                    className="field-input"
                    autoComplete="name"
                    value={values.guardianName}
                    onChange={(e) => set("guardianName", e.target.value)}
                    {...errProps("guardianName")}
                  />
                </Field>
                <Field
                  id={`${uid}-guardianRelationship`}
                  label="Relationship to athlete"
                  required
                  error={showError("guardianRelationship")}
                >
                  <select
                    id={`${uid}-guardianRelationship`}
                    name="guardianRelationship"
                    className="field-input"
                    value={values.guardianRelationship}
                    onChange={(e) => set("guardianRelationship", e.target.value)}
                    {...errProps("guardianRelationship")}
                  >
                    <option value="">Select…</option>
                    {RELATIONSHIPS.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field id={`${uid}-guardianPhone`}
                    label="Phone number" required error={showError("guardianPhone")}>
                  <input
                    id={`${uid}-guardianPhone`}
                    name="guardianPhone"
                    type="tel"
                    inputMode="tel"
                    className="field-input"
                    autoComplete="tel"
                    value={values.guardianPhone}
                    onChange={(e) => set("guardianPhone", e.target.value)}
                    {...errProps("guardianPhone")}
                  />
                </Field>
                <Field id={`${uid}-guardianEmail`}
                    label="Email address" required error={showError("guardianEmail")}>
                  <input
                    id={`${uid}-guardianEmail`}
                    name="guardianEmail"
                    type="email"
                    className="field-input"
                    autoComplete="email"
                    value={values.guardianEmail}
                    onChange={(e) => set("guardianEmail", e.target.value)}
                    {...errProps("guardianEmail")}
                  />
                </Field>
                <Field
                  id={`${uid}-emergencyName`}
                  label="Emergency contact name"
                  required
                  error={showError("emergencyName")}
                  hint="Someone other than the guardian above, if possible."
                >
                  <input
                    id={`${uid}-emergencyName`}
                    name="emergencyName"
                    className="field-input"
                    value={values.emergencyName}
                    onChange={(e) => set("emergencyName", e.target.value)}
                    {...errProps("emergencyName")}
                  />
                </Field>
                <Field
                  id={`${uid}-emergencyPhone`}
                  label="Emergency contact phone"
                  required
                  error={showError("emergencyPhone")}
                >
                  <input
                    id={`${uid}-emergencyPhone`}
                    name="emergencyPhone"
                    type="tel"
                    inputMode="tel"
                    className="field-input"
                    value={values.emergencyPhone}
                    onChange={(e) => set("emergencyPhone", e.target.value)}
                    {...errProps("emergencyPhone")}
                  />
                </Field>
              </div>
            </section>
          )}

          {/* ---------------------------------------------------- STEP 3 */}
          {step === 2 && (
            <section aria-labelledby="registration-step-heading">
              <StepHeading
                step={3}
                title={STEPS[2].title}
                intro={`Every class is a ${pricingPolicy.sessionLength}-minute small-group session. Select one or more tracks — you may mix tracks within any package.`}
              />

              <fieldset className="mb-8">
                <legend className="field-label">Class tracks</legend>
                {showError("classes") ? (
                  <p className="field-error mb-3" role="alert">
                    <span aria-hidden="true">!</span>
                    {errors.classes}
                  </p>
                ) : null}
                <div className="grid gap-3">
                  {classes.map((cls) => {
                    const checked = selectedClasses.includes(cls.slug);
                    return (
                      <label
                        key={cls.slug}
                        className={`flex cursor-pointer items-start gap-3 border p-4 transition ${
                          checked ? "border-gold bg-gold/[0.07]" : "border-white/15 bg-ink/40 hover:border-white/30"
                        }`}
                      >
                        <input
                          type="checkbox"
                          className="mt-1 h-4 w-4 shrink-0 accent-[#D6A73B]"
                          checked={checked}
                          onChange={(e) =>
                            setSelectedClasses((prev) =>
                              e.target.checked ? [...prev, cls.slug] : prev.filter((s) => s !== cls.slug),
                            )
                          }
                        />
                        <span className="min-w-0">
                          <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                            <span className="font-display text-base uppercase tracking-wide text-white">
                              {cls.index} · {cls.title}
                            </span>
                            <span className="border border-gold/40 px-1.5 py-0.5 font-sans text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-gold">
                              {cls.durationMinutes} min
                            </span>
                          </span>
                          <span className="mt-1.5 block font-sans text-[0.8rem] leading-5 text-white/60">
                            {cls.summary}
                          </span>
                        </span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              <fieldset>
                <legend className="field-label">Package</legend>
                {showError("package") ? (
                  <p className="field-error mb-3" role="alert">
                    <span aria-hidden="true">!</span>
                    {errors.package}
                  </p>
                ) : null}
                <div className="space-y-5">
                  {pricing.map((group: PriceGroup) => (
                    <div key={group.id}>
                      <p className="mb-2 font-sans text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-white/50">
                        {group.title}
                      </p>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {group.options.map((option) => {
                          const checked = packageId === option.id;
                          return (
                            <label
                              key={option.id}
                              className={`flex cursor-pointer items-start justify-between gap-3 border p-3.5 transition ${
                                checked ? "border-gold bg-gold/[0.07]" : "border-white/15 bg-ink/40 hover:border-white/30"
                              }`}
                            >
                              <span className="flex min-w-0 items-start gap-3">
                                <input
                                  type="radio"
                                  name={`${uid}-package`}
                                  className="mt-1 h-4 w-4 shrink-0 accent-[#D6A73B]"
                                  checked={checked}
                                  onChange={() => {
                                    setPackageId(option.id);
                                    if (errors.package) setErrors((prev) => ({ ...prev, package: "" }));
                                  }}
                                />
                                <span className="min-w-0">
                                  <span className="block font-sans text-[0.85rem] font-semibold text-white">
                                    {option.label}
                                  </span>
                                  <span className="mt-0.5 block font-sans text-[0.72rem] text-white/55">
                                    {option.unit}
                                    {option.note ? ` · ${option.note}` : ""}
                                  </span>
                                </span>
                              </span>
                              <span className="shrink-0 font-display text-lg text-gold">
                                {formatPrice(option.price)}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </fieldset>

              <div className="mt-6 space-y-2 border-l-2 border-gold/40 bg-white/[0.03] p-4 font-sans text-[0.78rem] leading-6 text-white/60">
                <p>{pricingPolicy.mixing.en}</p>
                <p>{pricingPolicy.family.en}</p>
                <p className="text-white/75">{pricingPolicy.payment.en}</p>
              </div>
            </section>
          )}

          {/* ---------------------------------------------------- STEP 4 */}
          {step === 3 && (
            <section aria-labelledby="registration-step-heading">
              <StepHeading
                step={4}
                title={STEPS[3].title}
                intro="What the athlete wants to change. Choose every objective that matters — the coach uses this to shape the training block."
              />
              <fieldset>
                <legend className="sr-only">Primary training objectives</legend>
                {showError("objectives") ? (
                  <p className="field-error mb-3" role="alert">
                    <span aria-hidden="true">!</span>
                    {errors.objectives}
                  </p>
                ) : null}
                <div className="grid gap-2.5 sm:grid-cols-2">
                  {OBJECTIVES.map((objective) => {
                    const checked = objectives.includes(objective);
                    return (
                      <label
                        key={objective}
                        className={`flex cursor-pointer items-center gap-3 border p-3.5 font-sans text-[0.85rem] transition ${
                          checked
                            ? "border-gold bg-gold/[0.07] text-white"
                            : "border-white/15 bg-ink/40 text-white/75 hover:border-white/30"
                        }`}
                      >
                        <input
                          type="checkbox"
                          className="h-4 w-4 shrink-0 accent-[#D6A73B]"
                          checked={checked}
                          onChange={(e) => {
                            setObjectives((prev) =>
                              e.target.checked ? [...prev, objective] : prev.filter((o) => o !== objective),
                            );
                            if (errors.objectives) setErrors((prev) => ({ ...prev, objectives: "" }));
                          }}
                        />
                        {objective}
                      </label>
                    );
                  })}
                </div>
              </fieldset>
              <p className="mt-4 font-sans text-[0.75rem] leading-5 text-white/60">
                {objectives.length} of {OBJECTIVES.length} selected.
              </p>
            </section>
          )}

          {/* ---------------------------------------------------- STEP 5 */}
          {step === 4 && (
            <section aria-labelledby="registration-step-heading">
              <StepHeading
                step={5}
                title={STEPS[4].title}
                intro="Disclose anything that affects safe training. This information is medical information about a minor and is never sent through a general inquiry form."
              />
              <div className="grid gap-6">
                <fieldset>
                  <legend className="field-label">
                    Any prior or current injuries, surgeries, or physical restrictions?
                    <span aria-hidden="true" className="ml-1 text-gold">*</span>
                  </legend>
                  {showError("injuries") ? (
                    <p className="field-error mb-2" role="alert">
                      <span aria-hidden="true">!</span>
                      {errors.injuries}
                    </p>
                  ) : null}
                  <div className="flex flex-wrap gap-2.5">
                    {[
                      { v: "no", l: "No" },
                      { v: "yes", l: "Yes — describe below" },
                    ].map((opt) => (
                      <label
                        key={opt.v}
                        className={`flex cursor-pointer items-center gap-2.5 border px-4 py-2.5 font-sans text-[0.85rem] transition ${
                          values.injuries === opt.v
                            ? "border-gold bg-gold/[0.07] text-white"
                            : "border-white/15 bg-ink/40 text-white/70 hover:border-white/30"
                        }`}
                      >
                        <input
                          type="radio"
                          name={`${uid}-injuries`}
                          className="h-4 w-4 accent-[#D6A73B]"
                          checked={values.injuries === opt.v}
                          onChange={() => set("injuries", opt.v)}
                        />
                        {opt.l}
                      </label>
                    ))}
                  </div>
                </fieldset>

                {values.injuries === "yes" && (
                  <Field
                    id={`${uid}-injuryDetails`}
                    label="Injury, surgery or restriction details"
                    required
                    error={showError("injuryDetails")}
                    full
                  >
                    <textarea
                      id={`${uid}-injuryDetails`}
                      name="injuryDetails"
                      rows={3}
                      className="field-input resize-y"
                      value={values.injuryDetails}
                      onChange={(e) => set("injuryDetails", e.target.value)}
                      {...errProps("injuryDetails")}
                    />
                  </Field>
                )}

                <Field
                  id={`${uid}-allergies`}
                  label="Known allergies / medical conditions"
                  required
                  error={showError("allergies")}
                  hint="Asthma, allergies, cardiac conditions, medication, or write “None known”."
                  full
                >
                  <textarea
                    id={`${uid}-allergies`}
                    name="allergies"
                    rows={3}
                    className="field-input resize-y"
                    value={values.allergies}
                    onChange={(e) => set("allergies", e.target.value)}
                    {...errProps("allergies")}
                  />
                </Field>

                <Field id={`${uid}-physician`}
                    label="Physician name & phone" error={showError("physician")} full>
                  <input
                    id={`${uid}-physician`}
                    name="physician"
                    className="field-input"
                    value={values.physician}
                    onChange={(e) => set("physician", e.target.value)}
                  />
                </Field>
              </div>
            </section>
          )}

          {/* ---------------------------------------------------- STEP 6 */}
          {step === 5 && (
            <section aria-labelledby="registration-step-heading">
              <StepHeading
                step={6}
                title={STEPS[5].title}
                intro="Three acknowledgments are required to train. Promotional media consent is optional and is recorded separately, so declining it never blocks registration."
              />

              <div className="space-y-3">
                {[
                  {
                    key: "participation" as const,
                    title: "Athletic participation & assumption of risk",
                    body: "I understand that sports-performance training involves sprinting, jumping, change-of-direction work, resistance training and conditioning, and that these activities carry inherent risks that supervision cannot eliminate. Participation is voluntary. Training is not medical care, physical therapy or rehabilitation.",
                  },
                  {
                    key: "medical" as const,
                    title: "Medical disclosure & emergency authorization",
                    body: "I confirm the athlete is physically fit to take part in strenuous activity and that the medical information disclosed in this intake is accurate and complete. I authorize Young & Elevated Sports Performance staff to seek emergency medical care if I cannot be reached.",
                  },
                  {
                    key: "policies" as const,
                    title: "Liability release, cancellation & refund acknowledgment",
                    body: "I release and hold harmless Young & Elevated Sports Performance, its trainers and staff from claims arising out of ordinary participation, to the extent permitted by Texas law. I have reviewed the cancellation, rescheduling, refund and flex-package expiry terms, including that flex packages expire 60 days after purchase.",
                  },
                ].map((item) => (
                  <div
                    key={item.key}
                    className={`border p-4 sm:p-5 ${
                      agreements[item.key] ? "border-gold/60 bg-gold/[0.05]" : "border-white/15 bg-ink/40"
                    }`}
                  >
                    <label className="flex cursor-pointer items-start gap-3">
                      <input
                        type="checkbox"
                        className="mt-1 h-4 w-4 shrink-0 accent-[#D6A73B]"
                        checked={agreements[item.key]}
                        onChange={(e) => {
                          setAgreements((prev) => ({ ...prev, [item.key]: e.target.checked }));
                          if (errors[item.key]) setErrors((prev) => ({ ...prev, [item.key]: "" }));
                        }}
                      />
                      <span>
                        <span className="block font-display text-[0.95rem] uppercase tracking-wide text-white">
                          {item.title}
                          <span aria-hidden="true" className="ml-1 text-gold">*</span>
                        </span>
                        <span className="mt-2 block font-sans text-[0.8rem] leading-6 text-white/60">
                          {item.body}
                        </span>
                      </span>
                    </label>
                    {showError(item.key) ? (
                      <p className="field-error" role="alert">
                        <span aria-hidden="true">!</span>
                        {errors[item.key]}
                      </p>
                    ) : null}
                  </div>
                ))}

                <div className="border border-dashed border-white/25 bg-white/[0.02] p-4 sm:p-5">
                  <label className="flex cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      className="mt-1 h-4 w-4 shrink-0 accent-[#D6A73B]"
                      checked={agreements.media}
                      onChange={(e) => setAgreements((prev) => ({ ...prev, media: e.target.checked }))}
                    />
                    <span>
                      <span className="block font-display text-[0.95rem] uppercase tracking-wide text-white">
                        Photo & video media consent
                        <span className="ml-2 font-sans text-[0.6rem] font-semibold normal-case tracking-[0.14em] text-white/60">
                          Optional
                        </span>
                      </span>
                      <span className="mt-2 block font-sans text-[0.8rem] leading-6 text-white/60">
                        I grant permission for Young & Elevated Sports Performance to capture and use photos or
                        video of the athlete for training review and promotional purposes. Declining is fine and
                        does not affect registration. Consent can be withdrawn in writing at any time.
                      </span>
                    </span>
                  </label>
                </div>
              </div>

              <p className="mt-5 border-l-2 border-gold/50 bg-gold/[0.05] p-4 font-sans text-[0.78rem] leading-6 text-white/70">
                These waiver documents are drafts awaiting legal review. The full approved texts will be presented
                for signature before any enrollment is binding.
              </p>
            </section>
          )}

          {/* ---------------------------------------------------- STEP 7 */}
          {step === 6 && (
            <section aria-labelledby="registration-step-heading">
              <StepHeading
                step={7}
                title={STEPS[6].title}
                intro="Check the details below, then sign. Signature capture and submission are disabled until the waiver text is approved by counsel and a secure intake system is in place."
              />

              <div className="grid gap-6 lg:grid-cols-2">
                <div className="space-y-5">
                  <SummaryBlock title="Athlete">
                    <SummaryRow label="Name" value={values.athleteName} />
                    <SummaryRow label="Date of birth" value={values.athleteDob} />
                    <SummaryRow label="Age" value={age !== null ? String(age) : ""} />
                    <SummaryRow label="Gender / age" value={values.athleteGender} />
                    <SummaryRow label="Sport(s) & position" value={values.athleteSports} />
                    <SummaryRow label="School / team" value={values.athleteSchool} />
                    <SummaryRow label="Grade level" value={values.athleteGrade} />
                  </SummaryBlock>

                  <SummaryBlock title="Guardian & emergency contact">
                    <SummaryRow label="Guardian" value={values.guardianName} />
                    <SummaryRow label="Relationship" value={values.guardianRelationship} />
                    <SummaryRow label="Phone" value={values.guardianPhone} />
                    <SummaryRow label="Email" value={values.guardianEmail} />
                    <SummaryRow label="Emergency contact" value={values.emergencyName} />
                    <SummaryRow label="Emergency phone" value={values.emergencyPhone} />
                  </SummaryBlock>

                  <SummaryBlock title="Medical & safety">
                    <SummaryRow
                      label="Injuries / restrictions"
                      value={
                        values.injuries === "yes" ? "Yes" : values.injuries === "no" ? "None reported" : ""
                      }
                    />
                    {values.injuries === "yes" ? <SummaryRow label="Details" value={values.injuryDetails} /> : null}
                    <SummaryRow label="Allergies / conditions" value={values.allergies} />
                    <SummaryRow label="Physician" value={values.physician} />
                  </SummaryBlock>
                </div>

                <div className="space-y-5">
                  <SummaryBlock title="Classes & package">
                    <SummaryRow label="Class tracks" value={selectedClassTitles.join(" · ")} />
                    <SummaryRow
                      label="Package"
                      value={
                        selectedPackage
                          ? `${selectedPackage.option.label} — ${formatPrice(selectedPackage.option.price)}`
                          : ""
                      }
                    />
                    <SummaryRow label="Session length" value={`${pricingPolicy.sessionLength} minutes`} />
                  </SummaryBlock>

                  <SummaryBlock title="Training objectives">
                    <SummaryRow label="Selected" value={objectives.join(" · ")} />
                  </SummaryBlock>

                  <SummaryBlock title="Agreements">
                    <SummaryRow
                      label="Participation & risk"
                      value={agreements.participation ? "Acknowledged" : "Not acknowledged"}
                    />
                    <SummaryRow
                      label="Medical & emergency"
                      value={agreements.medical ? "Acknowledged" : "Not acknowledged"}
                    />
                    <SummaryRow
                      label="Release & policies"
                      value={agreements.policies ? "Acknowledged" : "Not acknowledged"}
                    />
                    <SummaryRow
                      label="Media consent"
                      value={agreements.media ? "Granted (optional)" : "Declined (optional)"}
                    />
                  </SummaryBlock>
                </div>
              </div>

              {/* Signature block — disabled by design */}
              <div className="mt-8 border border-white/15 bg-ink/50 p-5 sm:p-6">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-display text-lg uppercase tracking-wide text-white">Signature</h3>
                  <span className="border border-gold/50 px-2.5 py-1 font-sans text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-gold">
                    Signature capture disabled
                  </span>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    id={`${uid}-guardianSignature`}
                    label="Parent / legal guardian signature"
                    required
                    error={showError("guardianSignature")}
                  >
                    <input
                      id={`${uid}-guardianSignature`}
                      name="guardianSignature"
                      className="field-input disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Signature capture not enabled"
                      disabled
                      value=""
                      readOnly
                      {...errProps("guardianSignature")}
                    />
                  </Field>
                  <Field id={`${uid}-signatureDate`}
                    label="Date" required error={showError("signatureDate")}>
                    <input
                      id={`${uid}-signatureDate`}
                      name="signatureDate"
                      type="date"
                      className="field-input disabled:cursor-not-allowed disabled:opacity-50"
                      disabled
                      value=""
                      readOnly
                      {...errProps("signatureDate")}
                    />
                  </Field>
                  <Field
                    id={`${uid}-athleteSignature`}
                    label="Athlete signature (13 or older)"
                    required={athleteSignatureRequired}
                    error={showError("athleteSignature")}
                    hint={
                      athleteSignatureRequired
                        ? "Required because the athlete is 13 or older."
                        : "Not required unless the athlete is 13 or older."
                    }
                  >
                    <input
                      id={`${uid}-athleteSignature`}
                      name="athleteSignature"
                      className="field-input disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Signature capture not enabled"
                      disabled
                      value=""
                      readOnly
                      {...errProps("athleteSignature")}
                    />
                  </Field>
                  <Field id={`${uid}-trainerSignature`}
                    label="Trainer / staff signature">
                    <input
                      id={`${uid}-trainerSignature`}
                      name="trainerSignature"
                      className="field-input disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Completed by YESP staff"
                      disabled
                      value=""
                      readOnly
                    />
                  </Field>
                </div>
              </div>

              <div
                role="status"
                className="mt-6 border border-gold/40 bg-gold/[0.07] p-5 font-sans text-[0.82rem] leading-6 text-white/75"
              >
                <p className="font-display text-base uppercase tracking-wide text-gold">
                  {t("registration.disabledTitle")}
                </p>
                <p className="mt-2">{t("registration.disabledBody")}</p>
                <ul className="mt-3 space-y-1.5 text-white/65">
                  <li>— Submission is disabled: no secure intake endpoint is approved yet.</li>
                  <li>— Payment is disabled: online payment is not enabled on this site.</li>
                  <li>— Signature capture is disabled: the waiver texts are still in legal review.</li>
                  <li>— Nothing you typed has been transmitted, stored or logged. Refreshing this page clears it.</li>
                </ul>
              </div>
            </section>
          )}

          {/* ------------------------------------------------------- nav */}
          <div className="mt-8 flex flex-col-reverse gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={handleBack}
              disabled={step === 0}
              className="inline-flex items-center justify-center gap-2 border border-white/25 px-5 py-3 font-sans text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-white transition hover:border-white/50 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <span aria-hidden="true">←</span> Back
            </button>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              {step < STEPS.length - 1 ? (
                <button
                  type="button"
                  onClick={handleContinue}
                  className="inline-flex items-center justify-center gap-2 bg-gold px-6 py-3 font-sans text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-ink transition hover:bg-gold-bright"
                >
                  Continue <span aria-hidden="true">→</span>
                </button>
              ) : (
                <button
                  type="button"
                  disabled
                  aria-describedby={`${uid}-submit-reason`}
                  className="inline-flex cursor-not-allowed items-center justify-center gap-2 border border-white/20 bg-white/[0.06] px-6 py-3 font-sans text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-white/40"
                >
                  Submit registration — disabled
                </button>
              )}
            </div>
          </div>
          {step === STEPS.length - 1 ? (
            <p id={`${uid}-submit-reason`} className="mt-3 text-right font-sans text-[0.72rem] text-white/60">
              Disabled until a secure intake endpoint and counsel-approved waivers exist.
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- summaries */

function SummaryBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border border-white/12 bg-white/[0.02] p-4">
      <h3 className="mb-3 font-sans text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-gold">
        {title}
      </h3>
      <dl className="space-y-1.5">{children}</dl>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[7.5rem_1fr] gap-2 font-sans text-[0.8rem] leading-5">
      <dt className="text-white/60">{label}</dt>
      <dd className={value ? "text-white/85" : "text-white/30"}>{value || "—"}</dd>
    </div>
  );
}
