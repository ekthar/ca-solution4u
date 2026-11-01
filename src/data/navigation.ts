export type NavItem = { label: string; href: string };

export const primaryNav: ReadonlyArray<NavItem> = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Expertise", href: "/#expertise" },
  { label: "N1 ERP", href: "/n1" },
  { label: "About", href: "/about" },
];

export const footerNav: ReadonlyArray<NavItem> = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Expertise", href: "/#expertise" },
  { label: "About", href: "/about" },
  { label: "N1 ERP", href: "/n1" },
  { label: "Contact", href: "/contact" },
];

export const legalNav: ReadonlyArray<NavItem> = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Use", href: "/terms" },
  { label: "Disclaimer", href: "/disclaimer" },
];
