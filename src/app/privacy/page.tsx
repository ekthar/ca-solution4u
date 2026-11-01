import { LegalPage } from "@/components/sections/legal-page";
import { contact, links } from "@/lib/constants";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How CA SOLUTION4U collects, uses and protects the information you share through this website.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="1 November 2026">
      <div>
        <h2>What we collect</h2>
        <p>
          When you send an enquiry through our form, we receive the details you enter: your name, phone number, email
          address, the service you are interested in and your description. When you contact us by phone, WhatsApp or
          email, we receive whatever you choose to share through that channel.
        </p>
      </div>
      <div>
        <h2>How we use it</h2>
        <p>
          We use your details only to respond to your enquiry and, where you engage us, to provide the services you
          request. We do not sell your information or use it for unrelated marketing.
        </p>
      </div>
      <div>
        <h2>How it is handled</h2>
        <ul>
          <li>Form enquiries are delivered to our team by email through a transactional email provider.</li>
          <li>WhatsApp messages are handled by WhatsApp under its own privacy policy.</li>
          <li>This website does not use advertising or tracking cookies.</li>
          <li>We keep enquiry information only as long as needed to respond and to meet legal obligations.</li>
        </ul>
      </div>
      <div>
        <h2>Your choices</h2>
        <p>
          You may ask us to access, correct or delete the personal information you have shared with us. Write to{" "}
          <a href={links.mailto}>{contact.email}</a> and we will respond within a reasonable time.
        </p>
      </div>
      <div>
        <h2>Changes</h2>
        <p>We may update this policy from time to time. The date at the top of this page shows the latest revision.</p>
      </div>
    </LegalPage>
  );
}
