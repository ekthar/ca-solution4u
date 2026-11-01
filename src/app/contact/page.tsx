import { ContactSection } from "@/components/contact/contact-section";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Call, WhatsApp or email CA SOLUTION4U about tax consultancy, GST filing, accounting, project reports or financial advisory. Or send an enquiry online.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="pt-16 md:pt-20">
      <ContactSection headingAs="h1" />
    </div>
  );
}
