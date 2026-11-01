import type { Metadata } from "next";
import { services } from "@/data/services";
import { contact, site } from "@/lib/constants";

type PageMeta = { title: string; description: string; path: string; image?: string };

/** Consistent title, description, canonical and Open Graph for a page. */
export function pageMetadata({ title, description, path, image = "/opengraph-image" }: PageMeta): Metadata {
  // A page-level openGraph object replaces the inherited one, so the image is set here.
  const images = [{ url: image, width: 1200, height: 630, alt: `${title} | ${site.name}` }];
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: site.locale,
      url: path,
      title: `${title} | ${site.name}`,
      description,
      images,
    },
    twitter: { card: "summary_large_image", title: `${title} | ${site.name}`, description, images },
  };
}

/**
 * Structured data for the business. It lists only facts the business has
 * supplied: no address, ratings or credentials are claimed.
 */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${site.url}/#organization`,
    name: site.name,
    url: site.url,
    description: site.description,
    slogan: site.tagline,
    telephone: contact.phoneE164,
    email: contact.email,
    areaServed: { "@type": "Country", name: "India" },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: contact.phoneE164,
        email: contact.email,
        contactType: "customer service",
        areaServed: "IN",
        availableLanguage: ["English"],
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.name,
          description: service.description,
          url: `${site.url}/services/${service.slug}`,
        },
      })),
    },
  };
}

export function serviceJsonLd(slug: string) {
  const service = services.find((item) => item.slug === slug);
  if (!service) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    serviceType: service.name,
    description: service.description,
    url: `${site.url}/services/${service.slug}`,
    provider: { "@id": `${site.url}/#organization` },
    areaServed: { "@type": "Country", name: "India" },
  };
}
