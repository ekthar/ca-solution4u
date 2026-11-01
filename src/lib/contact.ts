import { contactServiceOptions } from "@/data/services";

/** Shared by the browser form and the API route, so both apply the same rules. */

export type ContactFields = {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
};

export type ContactField = keyof ContactFields;
export type ContactErrors = Partial<Record<ContactField, string>>;

export const contactLimits = {
  name: 100,
  email: 160,
  messageMin: 10,
  messageMax: 3000,
} as const;

export const emptyContactFields: ContactFields = {
  name: "",
  phone: "",
  email: "",
  service: "",
  message: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^\+?[\d\s()-]{7,20}$/;
const validServices = new Set<string>(contactServiceOptions.map((option) => option.value));

export function isValidService(value: string | null | undefined): value is string {
  return typeof value === "string" && validServices.has(value);
}

export function validateContactField(field: ContactField, raw: string): string | undefined {
  const value = raw.trim();
  switch (field) {
    case "name":
      if (!value) return "Please enter your full name.";
      if (value.length < 2) return "Your name needs at least 2 characters.";
      if (value.length > contactLimits.name) return `Please keep your name under ${contactLimits.name} characters.`;
      return undefined;
    case "phone": {
      if (!value) return "Please enter a phone number so we can reach you.";
      const digits = value.replace(/\D/g, "");
      if (!PHONE_PATTERN.test(value) || digits.length < 10 || digits.length > 15)
        return "Please enter a valid phone number, for example +91 98765 43210.";
      return undefined;
    }
    case "email":
      if (!value) return "Please enter your email address.";
      if (value.length > contactLimits.email || !EMAIL_PATTERN.test(value))
        return "Please enter a valid email address, like name@example.com.";
      return undefined;
    case "service":
      if (!value) return "Please choose the service you need.";
      if (!validServices.has(value)) return "Please choose a service from the list.";
      return undefined;
    case "message":
      if (!value) return "Please add a short description of what you need.";
      if (value.length < contactLimits.messageMin)
        return `Please add a little more detail (at least ${contactLimits.messageMin} characters).`;
      if (value.length > contactLimits.messageMax)
        return `Please keep the description under ${contactLimits.messageMax} characters.`;
      return undefined;
  }
}

export function validateContact(fields: ContactFields): ContactErrors {
  const errors: ContactErrors = {};
  (Object.keys(fields) as ContactField[]).forEach((field) => {
    const message = validateContactField(field, fields[field]);
    if (message) errors[field] = message;
  });
  return errors;
}

/** Reads untrusted JSON into typed fields. Unknown keys are ignored. */
export function parseContactPayload(input: unknown): ContactFields | null {
  if (typeof input !== "object" || input === null) return null;
  const record = input as Record<string, unknown>;
  const read = (key: ContactField) => (typeof record[key] === "string" ? (record[key] as string).trim() : "");
  return {
    name: read("name"),
    phone: read("phone"),
    email: read("email"),
    service: read("service"),
    message: read("message"),
  };
}

export function serviceLabel(value: string): string {
  return contactServiceOptions.find((option) => option.value === value)?.label ?? value;
}

/** Plain-text summary used for the WhatsApp and email fallbacks. */
export function contactSummary(fields: ContactFields): string {
  return [
    "Hello CA SOLUTION4U, I would like to enquire about your services.",
    "",
    `Name: ${fields.name}`,
    `Phone: ${fields.phone}`,
    `Email: ${fields.email}`,
    `Service: ${serviceLabel(fields.service)}`,
    "",
    fields.message,
  ].join("\n");
}

export type ContactApiResponse =
  | { ok: true }
  | { ok: false; reason: "not-configured" | "invalid" | "rate-limited" | "failed"; errors?: ContactErrors };
