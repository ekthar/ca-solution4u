import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/primitives";
import { MaskText } from "@/components/motion/mask-text";
import { Reveal } from "@/components/motion/reveal";
import { whatsappLink } from "@/lib/constants";
import { GlassStructure } from "./glass-structure";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-obsidian text-white"
    >
      {/* Slowly shifting background light. */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute -top-1/3 -left-1/4 size-[80vmax] animate-light-drift rounded-full bg-[radial-gradient(closest-side,rgb(82_123_255/0.16),transparent)]" />
        <div
          className="absolute -right-1/4 -bottom-1/2 size-[70vmax] animate-light-drift rounded-full bg-[radial-gradient(closest-side,rgb(217_220_227/0.08),transparent)]"
          style={{ animationDelay: "-9s" }}
        />
        <div className="grain absolute inset-0 opacity-[0.05] mix-blend-overlay" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_60%,#090a0c)]" />
      </div>

      <GlassStructure className="absolute top-[8%] right-[-35%] h-[62svh] w-[120%] opacity-50 sm:right-[-18%] sm:w-[85%] sm:opacity-70 lg:top-[10%] lg:right-[-4%] lg:h-[80svh] lg:w-[58%] lg:opacity-100" />

      <Container className="relative flex flex-1 flex-col justify-end pt-28 pb-20 md:pb-24">
        <Reveal delay={0.1} y={12}>
          <p className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/[0.04] py-1.5 pr-4 pl-1.5 text-[0.8rem] text-white/75 backdrop-blur">
            <span className="rounded-full bg-white px-2.5 whitespace-nowrap py-1 text-[0.7rem] font-semibold tracking-wide text-obsidian">
              CA SOLUTION4U
            </span>
            Tax, GST, accounting and advisory
          </p>
        </Reveal>

        <MaskText
          as="h1"
          id="hero-title"
          lines={["Business is complex.", "Your finances", "shouldn\u2019t be."]}
          className="max-w-[12ch] font-display text-hero font-semibold text-balance"
          lineClassName="[&:last-child>span]:text-white/45"
          delay={0.15}
          stagger={0.1}
        />

        <div className="mt-10 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <Reveal delay={0.55}>
            <p className="max-w-md text-lead text-pretty text-white/65">
              Thoughtful financial guidance, reliable compliance and modern business solutions &mdash; designed to help
              you move forward.
            </p>
          </Reveal>
          <Reveal delay={0.7} className="flex flex-col gap-3 sm:flex-row">
            <Button href="/services" variant="solid-light">
              Explore Our Expertise
            </Button>
            <Button href={whatsappLink()} variant="ghost-light" arrow={false}>
              Talk to Our Team
            </Button>
          </Reveal>
        </div>
      </Container>

      <div
        aria-hidden
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex"
      >
        <span className="font-mono text-[0.65rem] tracking-[0.25em] text-white/40 uppercase">Scroll</span>
        <span className="relative h-10 w-px overflow-hidden bg-white/12">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-scroll-cue bg-white/80" />
        </span>
      </div>
    </section>
  );
}
