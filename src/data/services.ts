/**
 * The six service areas. Copy describes support and assistance only.
 * Nothing here claims a statutory authorisation or membership.
 */

export type ServiceVisual = "lens" | "strata" | "weave" | "blueprint" | "horizon" | "lattice";

export type Service = {
  slug: string;
  number: string;
  name: string;
  shortName: string;
  headline: string;
  description: string;
  items: ReadonlyArray<string>;
  visual: ServiceVisual;
  theme: "dark" | "light";
  seoTitle: string;
  seoDescription: string;
  whatsappMessage: string;
};

function enquiry(service: string) {
  return `Hello CA SOLUTION4U, I would like to discuss your ${service} services.`;
}

export const services: ReadonlyArray<Service> = [
  {
    slug: "audit-assurance",
    number: "01",
    name: "Audit & Assurance",
    shortName: "Audit",
    headline: "Confidence begins with clarity.",
    description:
      "Structured audit support, financial verification and documentation assistance to help businesses understand their financial position and maintain reliable records.",
    items: [
      "Audit coordination and support",
      "Financial statement preparation assistance",
      "Internal control review",
      "Financial documentation",
      "Reconciliation and verification",
      "Audit preparation and compliance support",
    ],
    visual: "lens",
    theme: "dark",
    seoTitle: "Audit Support & Financial Verification",
    seoDescription:
      "Audit coordination, financial statement preparation assistance, internal control review and reconciliation support from CA SOLUTION4U.",
    whatsappMessage: enquiry("Audit & Assurance support"),
  },
  {
    slug: "taxation",
    number: "02",
    name: "Taxation",
    shortName: "Tax",
    headline: "Tax matters. We make them clearer.",
    description:
      "Practical taxation assistance designed to help individuals and businesses understand their obligations and manage their tax responsibilities.",
    items: [
      "Income Tax Return (ITR) filing",
      "Tax planning and advisory",
      "Tax computation assistance",
      "TDS-related support",
      "Tax documentation",
      "Tax compliance assistance",
    ],
    visual: "strata",
    theme: "light",
    seoTitle: "Income Tax Return Filing & Tax Consultancy",
    seoDescription:
      "Income tax return filing, tax planning, tax computation and TDS support for individuals and businesses from CA SOLUTION4U.",
    whatsappMessage: enquiry("Taxation and Income Tax"),
  },
  {
    slug: "gst-compliance",
    number: "03",
    name: "GST & Compliance",
    shortName: "GST",
    headline: "Stay compliant. Stay focused.",
    description:
      "End-to-end GST assistance that helps businesses manage recurring compliance requirements and maintain accurate records.",
    items: [
      "GST registration assistance",
      "GST return filing",
      "GSTR-1",
      "GSTR-3B",
      "Input Tax Credit reconciliation",
      "GST reconciliation",
      "GST notice response assistance, within applicable professional authorisation",
      "GST compliance guidance",
    ],
    visual: "weave",
    theme: "dark",
    seoTitle: "GST Filing, Registration & GST Compliance",
    seoDescription:
      "GST registration assistance, GST return filing including GSTR-1 and GSTR-3B, ITC reconciliation and GST compliance guidance from CA SOLUTION4U.",
    whatsappMessage: enquiry("GST & Compliance"),
  },
  {
    slug: "project-reports",
    number: "04",
    name: "Project Reports & Business Documentation",
    shortName: "Project Reports",
    headline: "Turn an idea into a structured plan.",
    description:
      "Professional business documentation and financial projections to help entrepreneurs evaluate opportunities and prepare for their next step.",
    items: [
      "Detailed Project Reports (DPR)",
      "Business feasibility studies",
      "Financial projections",
      "CMA data preparation assistance",
      "Business plans",
      "Loan documentation support",
      "Capital expenditure analysis",
    ],
    visual: "blueprint",
    theme: "light",
    seoTitle: "Project Report Preparation, DPR & CMA Data",
    seoDescription:
      "Detailed project report preparation, feasibility studies, financial projections, CMA data and loan documentation support from CA SOLUTION4U.",
    whatsappMessage: enquiry("Project Report and business documentation"),
  },
  {
    slug: "financial-advisory",
    number: "05",
    name: "Financial Advisory",
    shortName: "Advisory",
    headline: "Make decisions with a clearer picture.",
    description:
      "Practical financial insights to help businesses understand performance, manage resources and plan sustainable growth.",
    items: [
      "Financial planning",
      "Cash flow analysis",
      "Budgeting and forecasting",
      "Working capital analysis",
      "Business performance insights",
      "Financial management consulting",
      "Business growth advisory",
    ],
    visual: "horizon",
    theme: "dark",
    seoTitle: "Financial Advisory & Business Consulting",
    seoDescription:
      "Financial planning, cash flow analysis, budgeting, working capital analysis and business growth advisory from CA SOLUTION4U.",
    whatsappMessage: enquiry("Financial Advisory"),
  },
  {
    slug: "business-accounting",
    number: "06",
    name: "Business Accounting",
    shortName: "Accounting",
    headline: "Better records. Better decisions.",
    description:
      "Dependable bookkeeping and accounting support that keeps your records current, reconciled and ready when you need them.",
    items: [
      "Bookkeeping",
      "Accounting management",
      "Bank reconciliation",
      "Accounts payable and receivable",
      "Financial reporting",
      "Monthly accounting support",
      "Management reporting",
    ],
    visual: "lattice",
    theme: "light",
    seoTitle: "Accounting & Bookkeeping Services",
    seoDescription:
      "Bookkeeping, bank reconciliation, accounts payable and receivable, monthly accounting and management reporting from CA SOLUTION4U.",
    whatsappMessage: enquiry("Business Accounting"),
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

/** Options for the contact form. Values are stable keys sent to the server. */
export const contactServiceOptions = [
  { value: "audit", label: "Audit & Assurance" },
  { value: "income-tax", label: "Income Tax" },
  { value: "gst", label: "GST & Compliance" },
  { value: "project-report", label: "Project Report" },
  { value: "advisory", label: "Financial Advisory" },
  { value: "accounting", label: "Accounting" },
  { value: "n1-erp", label: "N1 ERP Early Access" },
  { value: "other", label: "Other" },
] as const;

/** Maps a service page slug to its contact form option. */
export const serviceSlugToOption: Record<string, string> = {
  "audit-assurance": "audit",
  taxation: "income-tax",
  "gst-compliance": "gst",
  "project-reports": "project-report",
  "financial-advisory": "advisory",
  "business-accounting": "accounting",
};
