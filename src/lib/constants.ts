/**
 * Single source of truth for business facts and contact channels.
 * Change a number or address here and every link on the site follows.
 */

function cleanOrigin(value: string | undefined): string | null {
  if (!value) return null;
  try {
    return new URL(value).origin;
  } catch {
    return null;
  }
}

/** Public origin for canonical URLs, Open Graph and the sitemap. */
function resolveSiteUrl(): string {
  const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  return (
    cleanOrigin(process.env.NEXT_PUBLIC_SITE_URL) ??
    cleanOrigin(vercelHost ? `https://${vercelHost}` : undefined) ??
    "http://localhost:3000"
  );
}

export const site = {
  name: "CA SOLUTION4U",
  shortName: "SOLUTION4U",
  tagline: "Clarity for every number. Confidence for every decision.",
  positioning: "Your business deserves more than compliance. It deserves clarity.",
  secondary: "From compliance to business transformation, we help you move forward with confidence.",
  description:
    "CA SOLUTION4U offers tax consultancy, GST filing and compliance, income tax return filing, accounting services, project report preparation and financial advisory for businesses and individuals in India.",
  url: resolveSiteUrl(),
  locale: "en_IN",
  country: "IN",
} as const;

export const contact = {
  phoneDisplay: "+91 94968 14685",
  phoneE164: "+919496814685",
  whatsappNumber: "919496814685",
  email: "casolution4u@gmail.com",
  defaultWhatsappMessage: "Hello CA SOLUTION4U, I would like to enquire about your professional services.",
} as const;

export const links = {
  tel: `tel:${contact.phoneE164}`,
  mailto: `mailto:${contact.email}`,
} as const;

/** WhatsApp click-to-chat link with an optional prefilled message. */
export function whatsappLink(message: string = contact.defaultWhatsappMessage): string {
  return `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/** mailto link with an optional subject and body. */
export function mailtoLink(subject?: string, body?: string): string {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  const query = params.toString().replace(/\+/g, "%20");
  return query ? `${links.mailto}?${query}` : links.mailto;
}

export const n1Messages = {
  earlyAccess: "Hello CA SOLUTION4U, I would like to receive early access updates about N1 ERP.",
} as const;
