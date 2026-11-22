"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { rememberSubmitter } from "@/lib/thanks";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AlertCircle, ArrowUpRight, Check, CheckCircle2, Loader2 } from "lucide-react";
import { budgetOptions, contactSchema, serviceOptions } from "@/lib/contact-schema";
import { buttonClasses } from "./ui/Button";
import { cn } from "@/lib/cn";

type Status = "idle" | "submitting" | "success" | "error";
type Values = {
  name: string;
  email: string;
  company: string;
  phone: string;
  service: string;
  budget: string;
  message: string;
};
type FieldName = keyof Values | "consent";
type Errors = Partial<Record<FieldName, string>>;

const DRAFT_KEY = "blackroid-enquiry-draft";
const MIN_MESSAGE = 30;
const empty: Values = { name: "", email: "", company: "", phone: "", service: "", budget: "", message: "" };

/** The order fields appear on the page, so an error always moves focus to the first one a visitor sees. */
const fieldOrder: FieldName[] = ["service", "message", "name", "email", "company", "phone", "consent"];
const required: FieldName[] = ["service", "message", "name", "email", "company", "consent"];

/** One-tap openers, so nobody faces a blank box. */
const starters = [
  "Our claims process is slow and manual.",
  "We lose money on rejected or underpaid claims.",
  "Reconciliation and reporting take too much time.",
  "Our systems are old and do not talk to each other.",
];

const inputBase =
  "block w-full rounded-[3px] border bg-white px-4 py-3.5 text-[1rem] text-ink placeholder:text-muted/60 transition-[border-color,box-shadow] duration-200 outline-none focus:border-ink focus:ring-4 focus:ring-ink/5";

/** Validates one field with the shared schema so client and server rules never drift. */
function validateField(name: FieldName, value: unknown) {
  const result = contactSchema.shape[name].safeParse(value);
  return result.success ? undefined : result.error.issues[0]?.message;
}

function ErrorText({ id, children }: { id: string; children?: string }) {
  if (!children) return null;
  return (
    <p id={id} className="mt-2 flex items-center gap-1.5 text-sm text-red-700">
      <AlertCircle aria-hidden="true" className="size-3.5 shrink-0" />
      {children}
    </p>
  );
}

function TextField({
  id,
  label,
  error,
  valid,
  optional,
  hint,
  children,
}: {
  id: FieldName;
  label: string;
  error?: string;
  /** Shows a tick once the field has been filled in correctly. */
  valid?: boolean;
  optional?: boolean;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 flex items-baseline justify-between text-sm font-medium text-ink">
        {label}
        {optional && <span className="text-xs font-normal text-muted">Optional</span>}
      </label>
      <div className="relative">
        {children}
        {valid && !error && (
          <Check
            aria-hidden="true"
            strokeWidth={2}
            className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-emerald-600"
          />
        )}
      </div>
      {hint && !error && <p className="mt-2 text-xs text-muted">{hint}</p>}
      <ErrorText id={`${id}-error`}>{error}</ErrorText>
    </div>
  );
}

/** A numbered step heading, so the form reads as three short parts. */
function StepHeading({ n, title, note }: { n: number; title: string; note?: string }) {
  return (
    <div className="flex items-start gap-4">
      <span
        aria-hidden="true"
        className="flex size-8 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-medium text-white"
      >
        {n}
      </span>
      <div>
        <h2 className="text-xl leading-8 font-light tracking-tight text-ink">{title}</h2>
        {note && <p className="mt-1 text-sm text-muted">{note}</p>}
      </div>
    </div>
  );
}

/** Single-choice options shown as tappable chips (native radios underneath). */
function ChipGroup({
  name,
  legend,
  options,
  value,
  onChange,
  error,
  optional,
}: {
  name: "service" | "budget";
  legend: string;
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
  error?: string;
  optional?: boolean;
}) {
  return (
    <fieldset aria-describedby={error ? `${name}-error` : undefined} aria-invalid={!!error}>
      <legend className="mb-3 flex w-full items-baseline justify-between text-sm font-medium text-ink">
        {legend}
        {optional && <span className="text-xs font-normal text-muted">Optional</span>}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const checked = value === option;
          return (
            <label key={option} className="cursor-pointer">
              <input
                type="radio"
                name={name}
                value={option}
                checked={checked}
                onChange={() => onChange(option)}
                onClick={() => optional && checked && onChange("")}
                className="peer sr-only"
              />
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-4 py-2.5 text-sm transition-colors duration-200",
                  "peer-focus-visible:ring-4 peer-focus-visible:ring-ink/10",
                  checked
                    ? "border-ink bg-ink text-white"
                    : cn("bg-white text-ink-soft hover:border-ink", error ? "border-red-600" : "border-line-strong"),
                )}
              >
                {checked && <Check aria-hidden="true" strokeWidth={2} className="size-3.5" />}
                {option}
              </span>
            </label>
          );
        })}
      </div>
      <ErrorText id={`${name}-error`}>{error}</ErrorText>
    </fieldset>
  );
}

export function ContactForm({ initialService, publicEmail }: { initialService?: string; publicEmail?: string }) {
  const presetService = serviceOptions.find((s) => s === initialService) ?? "";
  const [values, setValues] = useState<Values>({ ...empty, service: presetService });
  const [consent, setConsent] = useState(false);
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [formError, setFormError] = useState("");
  const [sent, setSent] = useState<Values | null>(null);
  const router = useRouter();
  const startedAt = useRef(0);
  const formRef = useRef<HTMLFormElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  // Record when the form became interactive (server-side timing check) and restore any saved draft.
  useEffect(() => {
    startedAt.current = Date.now();
    try {
      const saved = JSON.parse(localStorage.getItem(DRAFT_KEY) || "null") as Partial<Values> | null;
      // One-time restore from browser storage after hydration (can't be read during SSR).
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (saved) setValues((v) => ({ ...v, ...saved, service: presetService || saved.service || "" }));
    } catch {
      // Storage unavailable (private mode, blocked) - start empty.
    }
  }, [presetService]);

  useEffect(() => {
    if (status === "success") return;
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(values));
    } catch {
      // Ignore: drafts are a convenience only.
    }
  }, [values, status]);

  // The message box grows with what is typed, so nothing is hidden behind a scrollbar.
  useEffect(() => {
    const el = messageRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.max(el.scrollHeight, 144)}px`;
  }, [values.message]);

  const update = (name: keyof Values, value: string) => {
    setValues((v) => ({ ...v, [name]: value }));
    // Once a field has been visited, re-check it live so errors clear as soon as they're fixed.
    if (touched[name] || errors[name]) setErrors((e) => ({ ...e, [name]: validateField(name, value) }));
  };

  const blur = (name: keyof Values) => {
    setTouched((t) => ({ ...t, [name]: true }));
    if (values[name]) setErrors((e) => ({ ...e, [name]: validateField(name, values[name]) }));
  };

  const addStarter = (text: string) => {
    const current = values.message.trim();
    update("message", current ? `${current} ${text}` : text);
    messageRef.current?.focus();
  };

  const describedBy = (id: FieldName, extra?: string) =>
    [errors[id] ? `${id}-error` : null, extra].filter(Boolean).join(" ") || undefined;

  const focusFirstError = (errs: Errors) => {
    const first = fieldOrder.find((k) => errs[k]);
    if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    const website = String(new FormData(e.currentTarget).get("website") ?? "");
    const data = { ...values, consent, website, startedAt: startedAt.current };

    const parsed = contactSchema.safeParse(data);
    if (!parsed.success) {
      const errs: Errors = {};
      for (const issue of parsed.error.issues) errs[issue.path[0] as FieldName] ??= issue.message;
      setErrors(errs);
      setFormError("");
      focusFirstError(errs);
      return;
    }

    setErrors({});
    setFormError("");
    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = (await res.json().catch(() => ({}))) as { message?: string; fieldErrors?: Errors };
      if (res.ok) {
        setSent(values);
        setStatus("success");
        rememberSubmitter(values.name);
        router.push("/contact/thanks");
        try {
          localStorage.removeItem(DRAFT_KEY);
        } catch {}
        return;
      }
      if (body.fieldErrors) {
        setErrors(body.fieldErrors);
        focusFirstError(body.fieldErrors);
      }
      setFormError(body.message || "Something went wrong. Please try again.");
      setStatus("error");
    } catch {
      setFormError("We couldn't reach the server. Please check your connection and try again.");
      setStatus("error");
    }
  }

  const reset = () => {
    setValues({ ...empty, service: presetService });
    setConsent(false);
    setTouched({});
    setErrors({});
    setSent(null);
    setStatus("idle");
    startedAt.current = Date.now();
  };

  const remaining = Math.max(0, MIN_MESSAGE - values.message.trim().length);
  const errorCount = Object.values(errors).filter(Boolean).length;

  // Progress: how many of the required answers are already valid.
  const isDone = (f: FieldName) => (f === "consent" ? consent : !validateField(f, values[f as keyof Values]));
  const doneCount = required.filter(isDone).length;
  const fieldOk = (f: keyof Values) => !!values[f] && !validateField(f, values[f]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      {status === "success" && sent ? (
        <motion.div
          key="success"
          role="status"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-[4px] border border-line bg-white p-8 sm:p-12"
        >
          <CheckCircle2 aria-hidden="true" strokeWidth={1.25} className="size-12 text-accent" />
          <h2 className="mt-8 text-title font-light">Thanks, {sent.name.split(" ")[0]}. We&apos;ve got it.</h2>
          <p className="mt-4 max-w-lg leading-relaxed text-muted">
            We&apos;ll reply to <span className="text-ink">{sent.email}</span>.
          </p>
          <dl className="mt-8 grid gap-x-8 gap-y-4 border-t border-line pt-8 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-muted">Company</dt>
              <dd className="mt-1 text-ink">{sent.company}</dd>
            </div>
            <div>
              <dt className="text-muted">Service</dt>
              <dd className="mt-1 text-ink">{sent.service}</dd>
            </div>
          </dl>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/services" className={buttonClasses("outline-dark")}>
              Explore our services
              <ArrowUpRight aria-hidden="true" strokeWidth={1.75} className="size-4" />
            </Link>
            <button type="button" onClick={reset} className={buttonClasses("outline-dark", "border-transparent")}>
              Send another enquiry
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          ref={formRef}
          noValidate
          onSubmit={onSubmit}
          exit={{ opacity: 0, y: -12 }}
          className="relative rounded-[4px] border border-line bg-white p-6 sm:p-10"
        >
          {/* Progress: three short steps, and how far along the visitor is. */}
          <div className="mb-8" aria-live="polite">
            <div className="flex items-baseline justify-between text-xs text-muted">
              <span>Three short steps</span>
              <span>
                {doneCount} of {required.length} done
              </span>
            </div>
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-line">
              <div
                className="h-full rounded-full bg-accent transition-[width] duration-500 ease-out-expo"
                style={{ width: `${(doneCount / required.length) * 100}%` }}
              />
            </div>
          </div>

          {/* 1. What do you need */}
          <section>
            <StepHeading n={1} title="What do you need help with?" note="Pick the closest match." />
            <div className="mt-6">
              <ChipGroup
                name="service"
                legend="Area"
                options={serviceOptions}
                value={values.service}
                onChange={(v) => update("service", v)}
                error={errors.service}
              />
            </div>
          </section>

          {/* 2. Tell us more */}
          <section className="mt-10 border-t border-line pt-10">
            <StepHeading n={2} title="Tell us about it" note="A few sentences is enough." />
            <div className="mt-6 space-y-6">
              <div>
                <p className="mb-2 text-xs text-muted">Not sure where to start? Tap one:</p>
                <div className="flex flex-wrap gap-2">
                  {starters.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => addStarter(s)}
                      className="rounded-full border border-dashed border-line-strong px-3.5 py-1.5 text-left text-[0.8125rem] text-ink-soft transition-colors hover:border-ink hover:text-ink"
                    >
                      + {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <TextField id="message" label="Describe the challenge" error={errors.message}>
                  <textarea
                    ref={messageRef}
                    id="message"
                    name="message"
                    rows={5}
                    maxLength={5000}
                    placeholder="e.g. Our order, warehouse and finance systems do not share data, and monthly reporting takes days."
                    value={values.message}
                    onChange={(e) => update("message", e.target.value)}
                    onBlur={() => blur("message")}
                    aria-invalid={!!errors.message}
                    aria-describedby={describedBy("message", "message-count")}
                    className={cn(
                      inputBase,
                      "min-h-36 resize-none",
                      errors.message ? "border-red-600" : "border-line-strong",
                    )}
                  />
                </TextField>
                <p id="message-count" className="mt-2 text-right text-xs text-muted">
                  {remaining > 0 ? `${remaining} more characters needed` : `${values.message.length} / 5000`}
                </p>
              </div>

              <ChipGroup
                name="budget"
                legend="Indicative budget"
                options={budgetOptions}
                value={values.budget}
                onChange={(v) => update("budget", v)}
                error={errors.budget}
                optional
              />
            </div>
          </section>

          {/* 3. Your details */}
          <section className="mt-10 border-t border-line pt-10">
            <StepHeading n={3} title="Your details" note="So we know who to reply to." />
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <TextField id="name" label="Full name" error={errors.name} valid={touched.name && fieldOk("name")}>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Thandi Mokoena"
                  maxLength={120}
                  value={values.name}
                  onChange={(e) => update("name", e.target.value)}
                  onBlur={() => blur("name")}
                  aria-invalid={!!errors.name}
                  aria-describedby={describedBy("name")}
                  className={cn(inputBase, "pr-11", errors.name ? "border-red-600" : "border-line-strong")}
                />
              </TextField>
              <TextField id="email" label="Work email" error={errors.email} valid={touched.email && fieldOk("email")}>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  placeholder="you@company.co.za"
                  maxLength={200}
                  value={values.email}
                  onChange={(e) => update("email", e.target.value)}
                  onBlur={() => blur("email")}
                  aria-invalid={!!errors.email}
                  aria-describedby={describedBy("email")}
                  className={cn(inputBase, "pr-11", errors.email ? "border-red-600" : "border-line-strong")}
                />
              </TextField>
              <TextField
                id="company"
                label="Company"
                error={errors.company}
                valid={touched.company && fieldOk("company")}
              >
                <input
                  id="company"
                  name="company"
                  type="text"
                  autoComplete="organization"
                  placeholder="Company name"
                  maxLength={160}
                  value={values.company}
                  onChange={(e) => update("company", e.target.value)}
                  onBlur={() => blur("company")}
                  aria-invalid={!!errors.company}
                  aria-describedby={describedBy("company")}
                  className={cn(inputBase, "pr-11", errors.company ? "border-red-600" : "border-line-strong")}
                />
              </TextField>
              <TextField
                id="phone"
                label="Phone"
                optional
                error={errors.phone}
                valid={touched.phone && fieldOk("phone")}
                hint="Only if you would like a call."
              >
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="+27 71 000 0000"
                  maxLength={30}
                  value={values.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  onBlur={() => blur("phone")}
                  aria-invalid={!!errors.phone}
                  aria-describedby={describedBy("phone")}
                  className={cn(inputBase, "pr-11", errors.phone ? "border-red-600" : "border-line-strong")}
                />
              </TextField>
            </div>
          </section>

          {/* Honeypot - hidden from people and assistive technology. */}
          <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
            <label htmlFor="website">Leave this field empty</label>
            <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          <div className="mt-8 border-t border-line pt-8">
            <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-ink-soft">
              <input
                type="checkbox"
                name="consent"
                checked={consent}
                onChange={(e) => {
                  setConsent(e.target.checked);
                  if (errors.consent)
                    setErrors((er) => ({ ...er, consent: validateField("consent", e.target.checked) }));
                }}
                aria-invalid={!!errors.consent}
                aria-describedby={describedBy("consent")}
                className="mt-0.5 size-[18px] shrink-0 cursor-pointer accent-accent"
              />
              <span>
                Blackroid may use these details to respond to my enquiry (
                <Link href="/privacy" className="underline underline-offset-4 hover:text-ink">
                  Privacy Policy
                </Link>
                ).
              </span>
            </label>
            <ErrorText id="consent-error">{errors.consent}</ErrorText>
          </div>

          <div aria-live="polite">
            {errorCount > 1 && (
              <p className="mt-6 text-sm text-red-700">Please check the {errorCount} highlighted fields above.</p>
            )}
            {status === "error" && formError && (
              <div
                role="alert"
                className="mt-6 flex gap-3 rounded-[3px] border border-red-200 bg-red-50 p-4 text-sm text-red-800"
              >
                <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                <p>
                  {formError} Your details are saved on this device, so you can try again.
                  {publicEmail && (
                    <>
                      {" "}
                      Or email{" "}
                      <a href={`mailto:${publicEmail}`} className="underline">
                        {publicEmail}
                      </a>
                      .
                    </>
                  )}
                </p>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={status === "submitting"}
            className={buttonClasses("primary", "mt-8 h-14 w-full text-base")}
          >
            {status === "submitting" ? (
              <>
                <Loader2 aria-hidden="true" className="size-4 animate-spin" />
                Sending…
              </>
            ) : (
              <>
                Send enquiry
                <ArrowUpRight aria-hidden="true" strokeWidth={1.75} className="size-4" />
              </>
            )}
          </button>
          <p className="mt-4 text-center text-xs text-muted">
            No obligation. We only use your details to respond to this enquiry.
          </p>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
