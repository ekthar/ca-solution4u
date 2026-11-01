import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import { SiteFooter } from "@/components/footer/site-footer";
import { MobileContactBar } from "@/components/contact/mobile-contact-bar";
import { MotionProvider } from "@/components/motion/motion-provider";
import { SiteNav } from "@/components/navigation/site-nav";
import { JsonLd } from "@/components/ui/json-ld";
import { site } from "@/lib/constants";
import { organizationJsonLd } from "@/lib/metadata";
import "./globals.css";

const interTight = Inter_Tight({ variable: "--font-inter-tight", subsets: ["latin"], display: "swap" });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Tax Consultancy, GST Filing, Accounting & Financial Advisory`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  category: "finance",
  keywords: [
    "CA SOLUTION4U",
    "tax consultancy",
    "GST filing",
    "income tax return filing",
    "financial advisory",
    "project report preparation",
    "accounting services",
    "business consulting",
    "GST compliance",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: site.locale,
    url: "/",
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
  },
  twitter: { card: "summary_large_image", title: site.name, description: site.description },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#090a0c",
  colorScheme: "dark light",
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${interTight.variable} ${inter.variable}`} data-scroll-behavior="smooth">
      <body className="min-h-dvh bg-obsidian text-white">
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <a
          href="#main-content"
          className="fixed top-3 left-3 z-[60] -translate-y-24 rounded-full bg-white px-5 py-3 text-sm font-medium text-obsidian transition-transform focus-visible:translate-y-0"
        >
          Skip to content
        </a>
        <MotionProvider>
          <SiteNav />
          <main id="main-content" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <SiteFooter />
          <MobileContactBar />
        </MotionProvider>
        <JsonLd data={organizationJsonLd()} />
      </body>
    </html>
  );
}
