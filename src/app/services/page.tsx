import { PageHero } from "@/components/sections/page-hero";
import { ServicesIntro } from "@/components/sections/services-intro";
import { ServiceChapters } from "@/components/services/service-chapters";
import { Process } from "@/components/sections/process";
import { ContactSection } from "@/components/contact/contact-section";
import { Button } from "@/components/ui/button";
import { whatsappLink } from "@/lib/constants";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Services: Tax, GST, Accounting, Project Reports & Advisory",
  description:
    "Audit support, income tax return filing, GST filing and compliance, project report preparation, financial advisory and accounting services from CA SOLUTION4U.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        lines={["Expertise for every", "part of your business."]}
        lead="Six service areas, one way of working: understand the context, do the work carefully, and keep you informed at every step."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href={whatsappLink()} variant="solid-light">
            Talk to Our Team
          </Button>
          <Button href="/contact" variant="ghost-light" arrow={false}>
            Send an enquiry
          </Button>
        </div>
      </PageHero>
      <ServicesIntro />
      <ServiceChapters />
      <Process />
      <ContactSection />
    </>
  );
}
