import type { Metadata } from "next";
import { Hero } from "@/components/hero/hero";
import { Philosophy } from "@/components/sections/philosophy";
import { ServicesIntro } from "@/components/sections/services-intro";
import { ServiceChapters } from "@/components/services/service-chapters";
import { Dimensions } from "@/components/sections/dimensions";
import { N1Teaser } from "@/components/n1/n1-teaser";
import { Principles } from "@/components/sections/principles";
import { Process } from "@/components/sections/process";
import { ContactSection } from "@/components/contact/contact-section";
import { site } from "@/lib/constants";

export const metadata: Metadata = {
  title: { absolute: `${site.name} | Tax Consultancy, GST Filing, Accounting & Financial Advisory` },
  description: site.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Philosophy />
      <ServicesIntro />
      <ServiceChapters />
      <Dimensions />
      <N1Teaser />
      <Principles />
      <Process />
      <ContactSection />
    </>
  );
}
