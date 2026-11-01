import Link from "next/link";
import { LegalPage } from "@/components/sections/legal-page";
import { contact, links } from "@/lib/constants";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Terms of Use",
  description: "The terms that apply when you use the CA SOLUTION4U website.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use" updated="1 November 2026">
      <div>
        <h2>Using this website</h2>
        <p>
          This website describes the services of CA SOLUTION4U and helps you get in touch with us. By using it, you
          agree to use it lawfully and not to interfere with its operation or security.
        </p>
      </div>
      <div>
        <h2>No engagement through the website</h2>
        <p>
          Sending an enquiry does not create a professional engagement. An engagement begins only when its scope,
          responsibilities and fees have been agreed with us directly.
        </p>
      </div>
      <div>
        <h2>Information on this site</h2>
        <p>
          Content on this website is general information, not professional advice for your situation. Please read our{" "}
          <Link href="/disclaimer">disclaimer</Link>.
        </p>
      </div>
      <div>
        <h2>N1 ERP</h2>
        <p>
          N1 ERP is an upcoming product in development. Registering for updates does not reserve access, pricing or any
          feature. Details will be confirmed when the product is announced.
        </p>
      </div>
      <div>
        <h2>Intellectual property</h2>
        <p>
          The CA SOLUTION4U name, the N1 name, and the design and content of this website belong to CA SOLUTION4U and
          may not be reused without permission.
        </p>
      </div>
      <div>
        <h2>Contact</h2>
        <p>
          Questions about these terms: <a href={links.mailto}>{contact.email}</a>.
        </p>
      </div>
    </LegalPage>
  );
}
