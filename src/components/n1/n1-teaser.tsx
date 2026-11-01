import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/primitives";
import { MaskText } from "@/components/motion/mask-text";
import { Reveal } from "@/components/motion/reveal";
import { DrawLine } from "@/components/motion/draw-line";
import { n1Messages, whatsappLink } from "@/lib/constants";
import { N1Mark } from "./n1-mark";
import { ComingSoon } from "./coming-soon";

export const TEASER = [
  "A better way to see your business.",
  "A more connected way to work.",
  "A clearer picture of what\u2019s happening.",
  "One unified direction.",
] as const;

/** Home page announcement for N1 ERP. Clearly marked as not yet released. */
export function N1Teaser() {
  return (
    <section aria-labelledby="n1-title" className="relative isolate overflow-hidden bg-black text-white">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 h-[60%] w-[120%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgb(82_123_255/0.22),transparent_60%)]" />
        <div className="grain absolute inset-0 opacity-[0.06] mix-blend-overlay" />
      </div>

      <Container className="pt-28 md:pt-40">
        <Reveal className="flex justify-center">
          <ComingSoon />
        </Reveal>
        <MaskText
          id="n1-title"
          lines={["Meet N1.", "A new perspective on", "business management."]}
          className="mx-auto mt-8 max-w-[18ch] text-center font-display text-display-lg font-semibold text-balance"
          lineClassName="[&:not(:first-child)>span]:text-white/50"
        />
        <Reveal delay={0.15}>
          <p className="mx-auto mt-8 max-w-xl text-center text-lead text-pretty text-white/60">
            Something new is taking shape. A smarter approach to bringing business operations, information and
            decision-making together.
          </p>
        </Reveal>
      </Container>

      <N1Mark className="mt-6 py-10 md:mt-0" />

      <Container className="pb-28 md:pb-40">
        <ol className="mx-auto max-w-4xl">
          {TEASER.map((line, index) => (
            <li key={line} className="text-white/15">
              <DrawLine />
              <Reveal y={30} className="flex items-baseline gap-6 py-7 md:gap-12 md:py-9">
                <span className="font-mono text-xs text-blue">0{index + 1}</span>
                <span className="font-display text-display-sm font-medium text-white">{line}</span>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal className="mt-16 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button href={whatsappLink(n1Messages.earlyAccess)} variant="accent">
            Get Early Access Updates
          </Button>
          <Button href="/n1" variant="ghost-light">
            Discover N1
          </Button>
        </Reveal>
        <p className="mt-6 text-center text-sm text-grey">
          N1 ERP is in development and not yet available. Details will be shared as they are confirmed.
        </p>
      </Container>
    </section>
  );
}
