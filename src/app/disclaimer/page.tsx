import { LegalPage } from "@/components/sections/legal-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Disclaimer",
  description: "Important information about the content on the CA SOLUTION4U website and the scope of our services.",
  path: "/disclaimer",
});

export default function DisclaimerPage() {
  return (
    <LegalPage title="Disclaimer" updated="1 November 2026">
      <div>
        <h2>General information only</h2>
        <p>
          The content on this website is provided for general information. It is not tax, legal, accounting or financial
          advice for any particular situation. Tax and GST rules change, and the right approach depends on your facts.
          Please consult us, or another qualified professional, before acting on anything you read here.
        </p>
      </div>
      <div>
        <h2>Scope of services</h2>
        <p>
          Services are offered within the scope of our professional qualifications and authorisations, and of the laws
          and professional regulations that apply. Some matters, such as statutory audits or representation before
          certain authorities, may only be carried out by professionals holding specific authorisations. For such
          matters we will say so clearly and, where appropriate, help you coordinate with an authorised professional.
        </p>
      </div>
      <div>
        <h2>No solicitation</h2>
        <p>
          This website is meant to share information about our services with people who seek it. It is not intended as
          advertising or solicitation of work.
        </p>
      </div>
      <div>
        <h2>Accuracy</h2>
        <p>
          We take care to keep this website accurate, but we do not guarantee that it is complete or current, and we are
          not liable for decisions made on the basis of its content alone.
        </p>
      </div>
      <div>
        <h2>Upcoming products</h2>
        <p>
          References to N1 ERP describe a product in development. They are not an offer, and features, timing and
          availability may change.
        </p>
      </div>
    </LegalPage>
  );
}
