import { N1Mark } from "@/components/n1/n1-mark";
import { ComingSoon } from "@/components/n1/coming-soon";
import { TEASER } from "@/components/n1/n1-teaser";
import { ContactForm } from "@/components/contact/contact-form";
import { Button } from "@/components/ui/button";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { MaskText } from "@/components/motion/mask-text";
import { Reveal } from "@/components/motion/reveal";
import { ScrollWords } from "@/components/motion/scroll-words";
import { n1Messages, whatsappLink } from "@/lib/constants";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "N1 ERP: Coming Soon",
  description:
    "N1 ERP is an upcoming business management product from CA SOLUTION4U. It is in development and not yet available. Register for early access updates.",
  path: "/n1",
  image: "/n1/opengraph-image",
});

/**
 * N1 product reveal. Built as its own page so it can grow into a full
 * product site once features are confirmed. It states only what is known.
 */
export default function N1Page() {
  return (
    <>
      <section aria-labelledby="page-title" className="relative isolate overflow-hidden bg-black text-white">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute top-[-20%] left-1/2 h-[80%] w-[140%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgb(82_123_255/0.28),transparent_60%)]" />
          <div className="grain absolute inset-0 opacity-[0.06] mix-blend-overlay" />
        </div>
        <Container className="pt-36 md:pt-48">
          <Reveal y={10} className="flex justify-center">
            <ComingSoon />
          </Reveal>
          <MaskText
            as="h1"
            id="page-title"
            lines={["Meet N1.", "A new perspective on", "business management."]}
            className="mx-auto mt-8 max-w-[18ch] text-center font-display text-display-lg font-semibold"
            lineClassName="[&:not(:first-child)>span]:text-white/50"
            delay={0.1}
          />
          <Reveal delay={0.35}>
            <p className="mx-auto mt-8 max-w-xl text-center text-lead text-pretty text-white/60">
              Something new is taking shape. A smarter approach to bringing business operations, information and
              decision-making together.
            </p>
          </Reveal>
          <Reveal delay={0.5} className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button href={whatsappLink(n1Messages.earlyAccess)} variant="accent">
              Get Early Access Updates
            </Button>
            <Button href="#early-access" variant="ghost-light" arrow={false}>
              Register by form
            </Button>
          </Reveal>
        </Container>
        <N1Mark className="py-16 md:py-24" />
      </section>

      {/* Teaser sequence: one statement per screen. */}
      <section aria-label="What N1 is about" className="bg-black text-white">
        {TEASER.map((line, index) => (
          <div key={line} className="flex min-h-[70svh] items-center border-t border-white/[0.06]">
            <Container>
              <p className="font-mono text-xs text-blue">0{index + 1} / 04</p>
              <ScrollWords
                as="p"
                text={line}
                dim={0.12}
                className="mt-6 max-w-[16ch] font-display text-display-lg font-semibold"
              />
            </Container>
          </div>
        ))}
      </section>

      <section aria-labelledby="origin-title" className="bg-paper text-obsidian">
        <Container className="grid gap-12 py-28 md:py-40 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow tone="light">Where N1 comes from</Eyebrow>
            <h2 id="origin-title" className="mt-6 font-display text-display-md font-semibold text-balance">
              The technology evolution of CA SOLUTION4U.
            </h2>
          </div>
          <div className="space-y-6 text-lead text-pretty text-ink-soft lg:col-span-6 lg:col-start-7">
            <p>
              Our work sits close to how businesses actually run: their records, their compliance calendar, and the
              decisions that depend on both. N1 is our next step in bringing that understanding into software.
            </p>
            <p>
              N1 ERP is in development and has not been released. We will share its capabilities, availability and
              pricing only once they are confirmed. Until then, nothing on this page should be read as a product
              commitment.
            </p>
          </div>
        </Container>
      </section>

      <section id="early-access" aria-labelledby="early-title" className="scroll-mt-20 bg-obsidian text-white">
        <Container className="grid gap-12 py-28 md:py-40 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow>Early access</Eyebrow>
            <h2 id="early-title" className="mt-6 font-display text-display-md font-semibold">
              Be the first to know.
            </h2>
            <p className="mt-5 text-white/60">
              Leave your details and we will keep you updated as N1 takes shape. Prefer WhatsApp?{" "}
              <a
                href={whatsappLink(n1Messages.earlyAccess)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white underline underline-offset-4"
              >
                Message us
              </a>
              .
            </p>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <ContactForm defaultService="n1-erp" />
          </div>
        </Container>
      </section>
    </>
  );
}
