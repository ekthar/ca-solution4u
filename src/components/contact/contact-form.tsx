"use client";

import { AnimatePresence, m } from "motion/react";
import { useEffect, useId, useRef, useState, type ChangeEvent, type FocusEvent, type FormEvent } from "react";
import { contactServiceOptions } from "@/data/services";
import {
  contactLimits,
  contactSummary,
  emptyContactFields,
  isValidService,
  validateContact,
  validateContactField,
  type ContactApiResponse,
  type ContactErrors,
  type ContactField,
  type ContactFields,
} from "@/lib/contact";
import { mailtoLink, whatsappLink } from "@/lib/constants";
import { cn } from "@/lib/utils";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "sent" }
  | { kind: "fallback"; reason: "not-configured" | "failed" | "network" }
  | { kind: "rate-limited" };

const fieldOrder: ContactField[] = ["name", "phone", "email", "service", "message"];

/**
 * Enquiry form. Validates in the browser and again on the server. It only
 * reports success when the server confirms delivery; otherwise it offers to
 * send the same details by WhatsApp or email, so no enquiry is lost.
 */
export function ContactForm({ defaultService = "" }: { defaultService?: string }) {
  const baseId = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const startedAt = useRef<number>(0);
  const initialFields: ContactFields = {
    ...emptyContactFields,
    service: isValidService(defaultService) ? defaultService : "",
  };
  const [fields, setFields] = useState<ContactFields>(initialFields);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [touched, setTouched] = useState<Partial<Record<ContactField, boolean>>>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [honeypot, setHoneypot] = useState("");

  // Preselect a service from ?service=... (used by N1 and service pages).
  useEffect(() => {
    startedAt.current = Date.now();
    const requested = new URLSearchParams(window.location.search).get("service");
    if (isValidService(requested)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- reads the URL once after mount
      setFields((current) => ({ ...current, service: requested }));
    }
  }, []);

  const id = (field: string) => `${baseId}-${field}`;

  function update(event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const field = event.target.name as ContactField;
    const value = event.target.value;
    setFields((current) => ({ ...current, [field]: value }));
    if (touched[field]) setErrors((current) => ({ ...current, [field]: validateContactField(field, value) }));
    if (status.kind === "fallback" || status.kind === "rate-limited") setStatus({ kind: "idle" });
  }

  function blur(event: FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const field = event.target.name as ContactField;
    setTouched((current) => ({ ...current, [field]: true }));
    setErrors((current) => ({ ...current, [field]: validateContactField(field, event.target.value) }));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status.kind === "submitting") return;

    const nextErrors = validateContact(fields);
    setErrors(nextErrors);
    setTouched({ name: true, phone: true, email: true, service: true, message: true });
    const firstInvalid = fieldOrder.find((field) => nextErrors[field]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    setStatus({ kind: "submitting" });
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, website: honeypot, startedAt: startedAt.current }),
      });
      const result = (await response.json().catch(() => null)) as ContactApiResponse | null;

      if (result?.ok) {
        setStatus({ kind: "sent" });
        return;
      }
      if (result && !result.ok) {
        if (result.reason === "invalid" && result.errors) {
          setErrors(result.errors);
          setStatus({ kind: "idle" });
          return;
        }
        if (result.reason === "rate-limited") {
          setStatus({ kind: "rate-limited" });
          return;
        }
        setStatus({ kind: "fallback", reason: result.reason === "not-configured" ? "not-configured" : "failed" });
        return;
      }
      setStatus({ kind: "fallback", reason: "failed" });
    } catch {
      setStatus({ kind: "fallback", reason: "network" });
    }
  }

  if (status.kind === "sent") {
    return (
      <m.div
        role="status"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 md:p-12"
      >
        <p className="font-mono text-xs tracking-[0.2em] text-blue uppercase">Enquiry received</p>
        <p className="mt-4 font-display text-display-sm font-semibold">Thank you, {fields.name.split(" ")[0]}.</p>
        <p className="mt-3 max-w-md text-white/65">
          Your message has been delivered to our team. We will reply to {fields.email} or call {fields.phone}.
        </p>
        <button
          type="button"
          className="mt-8 text-sm text-white/70 underline underline-offset-4 hover:text-white"
          onClick={() => {
            setFields(initialFields);
            setTouched({});
            setErrors({});
            startedAt.current = Date.now();
            setStatus({ kind: "idle" });
          }}
        >
          Send another enquiry
        </button>
      </m.div>
    );
  }

  const summary = contactSummary(fields);
  const showError = (field: ContactField) => touched[field] && errors[field];

  const inputBase =
    "peer w-full rounded-2xl border bg-white/[0.03] px-4 pt-6 pb-2.5 text-[1rem] text-white transition-[border-color,background-color] duration-300 outline-none placeholder:text-transparent focus:bg-white/[0.05]";

  function fieldClass(field: ContactField) {
    return cn(
      inputBase,
      showError(field) ? "border-[#ff7a7a]/70" : "border-white/12 hover:border-white/25 focus:border-blue",
    );
  }

  function describedBy(field: ContactField) {
    return showError(field) ? id(`${field}-error`) : undefined;
  }

  function renderError(field: ContactField) {
    return showError(field) ? (
      <p id={id(`${field}-error`)} className="mt-2 text-sm text-[#ff9a9a]">
        {errors[field]}
      </p>
    ) : null;
  }

  const floatLabel =
    "pointer-events-none absolute top-4 left-4 origin-left text-[1rem] text-white/50 transition-transform duration-300 ease-[var(--ease-out-expo)] peer-focus:-translate-y-2.5 peer-focus:scale-[0.78] peer-[:not(:placeholder-shown)]:-translate-y-2.5 peer-[:not(:placeholder-shown)]:scale-[0.78]";

  return (
    <form ref={formRef} noValidate onSubmit={submit} aria-describedby={id("note")} className="relative">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <div className="relative">
            <input
              id={id("name")}
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Full name"
              maxLength={contactLimits.name}
              value={fields.name}
              onChange={update}
              onBlur={blur}
              aria-invalid={Boolean(showError("name"))}
              aria-describedby={describedBy("name")}
              required
              className={fieldClass("name")}
            />
            <label htmlFor={id("name")} className={floatLabel}>
              Full name
            </label>
          </div>
          {renderError("name")}
        </div>

        <div>
          <div className="relative">
            <input
              id={id("phone")}
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="Phone number"
              maxLength={20}
              value={fields.phone}
              onChange={update}
              onBlur={blur}
              aria-invalid={Boolean(showError("phone"))}
              aria-describedby={describedBy("phone")}
              required
              className={fieldClass("phone")}
            />
            <label htmlFor={id("phone")} className={floatLabel}>
              Phone number
            </label>
          </div>
          {renderError("phone")}
        </div>

        <div>
          <div className="relative">
            <input
              id={id("email")}
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="Email"
              maxLength={contactLimits.email}
              value={fields.email}
              onChange={update}
              onBlur={blur}
              aria-invalid={Boolean(showError("email"))}
              aria-describedby={describedBy("email")}
              required
              className={fieldClass("email")}
            />
            <label htmlFor={id("email")} className={floatLabel}>
              Email
            </label>
          </div>
          {renderError("email")}
        </div>

        <div className="sm:col-span-2">
          <div className="relative">
            <select
              id={id("service")}
              name="service"
              value={fields.service}
              onChange={update}
              onBlur={blur}
              aria-invalid={Boolean(showError("service"))}
              aria-describedby={describedBy("service")}
              required
              className={cn(fieldClass("service"), "appearance-none pr-12", !fields.service && "text-white/0")}
            >
              <option value="" disabled className="bg-charcoal text-white">
                Choose a service
              </option>
              {contactServiceOptions.map((option) => (
                <option key={option.value} value={option.value} className="bg-charcoal text-white">
                  {option.label}
                </option>
              ))}
            </select>
            <label
              htmlFor={id("service")}
              className={cn(
                "pointer-events-none absolute left-4 origin-left text-white/50 transition-transform duration-300",
                fields.service ? "top-4 -translate-y-2.5 scale-[0.78]" : "top-4",
              )}
            >
              Service required
            </label>
            <svg
              aria-hidden
              viewBox="0 0 16 16"
              className="pointer-events-none absolute top-1/2 right-5 size-4 -translate-y-1/2 text-white/50"
            >
              <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>
          {renderError("service")}
        </div>

        <div className="sm:col-span-2">
          <div className="relative">
            <textarea
              id={id("message")}
              name="message"
              rows={5}
              placeholder="Brief description"
              maxLength={contactLimits.messageMax}
              value={fields.message}
              onChange={update}
              onBlur={blur}
              aria-invalid={Boolean(showError("message"))}
              aria-describedby={describedBy("message")}
              required
              className={cn(fieldClass("message"), "min-h-36 resize-y pt-7")}
            />
            <label htmlFor={id("message")} className={floatLabel}>
              Brief description
            </label>
          </div>
          {renderError("message")}
        </div>

        {/* Honeypot: hidden from people and assistive tech. */}
        <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor={id("website")}>Website</label>
          <input
            id={id("website")}
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(event) => setHoneypot(event.target.value)}
          />
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <p id={id("note")} className="max-w-sm text-sm text-white/45">
          We use these details only to reply to your enquiry. See our{" "}
          <a href="/privacy" className="underline underline-offset-4 hover:text-white">
            privacy policy
          </a>
          .
        </p>
        <button
          type="submit"
          disabled={status.kind === "submitting"}
          className="inline-flex min-h-13 items-center justify-center gap-3 rounded-full bg-white px-8 py-3.5 font-medium text-obsidian transition-[background-color,opacity] duration-300 hover:bg-silver disabled:cursor-wait disabled:opacity-70"
        >
          {status.kind === "submitting" ? (
            <>
              <span
                aria-hidden
                className="size-4 animate-spin rounded-full border-2 border-obsidian/25 border-t-obsidian"
              />
              Sending&hellip;
            </>
          ) : (
            "Send enquiry"
          )}
        </button>
      </div>

      <div aria-live="polite" role="status">
        <AnimatePresence>
          {status.kind === "rate-limited" ? (
            <m.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-sm text-white/75"
            >
              We could not accept that just now. Please wait a moment and try again, or reach us directly on WhatsApp.
            </m.p>
          ) : null}
          {status.kind === "fallback" ? (
            <m.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-6 rounded-2xl border border-blue/40 bg-blue/[0.08] p-5 md:p-6"
            >
              <p className="font-medium text-white">
                {status.reason === "not-configured"
                  ? "Online delivery is not connected yet, so this form has not been sent."
                  : status.reason === "network"
                    ? "We could not reach the server, so your enquiry has not been sent."
                    : "Something went wrong and your enquiry has not been sent."}
              </p>
              <p className="mt-1.5 text-sm text-white/65">
                Your details are ready to go. Send them in one tap instead:
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href={whatsappLink(summary)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center rounded-full bg-white px-5 text-sm font-medium text-obsidian hover:bg-silver"
                >
                  Send via WhatsApp
                </a>
                <a
                  href={mailtoLink("Website enquiry", summary)}
                  className="inline-flex min-h-11 items-center rounded-full px-5 text-sm text-white ring-1 ring-white/25 ring-inset hover:bg-white/8"
                >
                  Send via email
                </a>
              </div>
            </m.div>
          ) : null}
        </AnimatePresence>
      </div>
    </form>
  );
}
