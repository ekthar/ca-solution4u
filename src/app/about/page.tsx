import Link from "next/link";
import { PageHero } from "@/components/sections/page-hero";
import { Principles } from "@/components/sections/principles";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { ScrollWords } from "@/components/motion/scroll-words";
import { services } from "@/data/services";
import { site, whatsappLink } from "@/lib/constants";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "About",
  description:
    "CA SOLUTION4U brings tax, GST, accounting, business documentation and financial advisory together with modern business technology.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About" lines={["More than compliance.", "Clarity."]} lead={site.secondary} />

      <section aria-labelledby="about-belief" className="bg-paper text-obsidian">
        <Container className="py-28 md:py-40">
          <Eyebrow tone="light">What we believe</Eyebrow>
          <ScrollWords
            id="about-belief"
            text={"Your business deserves more than compliance.\nIt deserves clarity."}
            className="mt-10 max-w-[20ch] font-display text-display-lg font-semibold"
          />
          <div className="mt-20 grid gap-10 md:grid-cols-2">
            <Reveal>
              <p className="text-lead text-pretty text-ink-soft">
                CA SOLUTION4U works with individuals, entrepreneurs and growing businesses on the financial side of
                running a business: tax, GST, accounting, documentation and planning. We focus on doing the work
                carefully and explaining it plainly, so you always know where you stand.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-lead text-pretty text-ink-soft">
                We also believe the tools a business uses shape how clearly it can see itself. That belief is behind{" "}
                <Link href="/n1" className="text-obsidian underline underline-offset-4">
                  N1 ERP
                </Link>
                , an upcoming product now in development.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <section aria-labelledby="about-scope" className="bg-obsidian text-white">
        <Container className="py-24 md:py-32">
          <Eyebrow>What we do</Eyebrow>
          <h2 id="about-scope" className="mt-6 font-display text-display-md font-semibold">
            Six areas of work.
          </h2>
          <ul className="mt-12 grid gap-px border-y border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <li key={service.slug} className="bg-obsidian">
                <Link
                  href={`/services/${service.slug}`}
                  className="group block p-6 transition-colors hover:bg-white/[0.03] md:p-8"
                >
                  <span className="font-mono text-xs text-grey group-hover:text-blue">{service.number}</span>
                  <span className="mt-6 block font-display text-xl font-medium tracking-[-0.025em]">
                    {service.name}
                  </span>
                  <span className="mt-2 block text-sm text-white/55">{service.headline}</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-10 max-w-2xl text-sm text-grey">
            Services are provided within the scope of our professional qualifications and authorisations. Where a matter
            requires a specific statutory authorisation, we will tell you so and help you coordinate with an
            appropriately authorised professional.
          </p>
        </Container>
      </section>

      <Principles />

      <section aria-label="Start a conversation" className="bg-charcoal text-white">
        <Container className="flex flex-col items-start gap-8 py-24 md:flex-row md:items-end md:justify-between md:py-32">
          <h2 className="max-w-[14ch] font-display text-display-md font-semibold">Start with a conversation.</h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href={whatsappLink()} variant="solid-light">
              Talk to Our Team
            </Button>
            <Button href="/contact" variant="ghost-light" arrow={false}>
              Contact options
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
