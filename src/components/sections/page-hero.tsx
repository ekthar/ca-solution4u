import type { ReactNode } from "react";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { MaskText } from "@/components/motion/mask-text";
import { Reveal } from "@/components/motion/reveal";

type Props = {
  eyebrow: string;
  lines: ReadonlyArray<string>;
  lead?: ReactNode;
  children?: ReactNode;
};

/** Dark opening block for inner pages, so the navigation always sits on dark. */
export function PageHero({ eyebrow, lines, lead, children }: Props) {
  return (
    <section aria-labelledby="page-title" className="relative isolate overflow-hidden bg-obsidian text-white">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute -top-1/2 right-[-20%] size-[70vmax] animate-light-drift rounded-full bg-[radial-gradient(closest-side,rgb(82_123_255/0.15),transparent)]" />
        <div className="grain absolute inset-0 opacity-[0.05] mix-blend-overlay" />
      </div>
      <Container className="pt-40 pb-20 md:pt-52 md:pb-28">
        <Reveal y={10}>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
        <MaskText
          as="h1"
          id="page-title"
          lines={lines}
          className="mt-8 max-w-[18ch] font-display text-display-lg font-semibold text-balance"
          lineClassName="[&:not(:first-child)>span]:text-white/45"
          delay={0.1}
        />
        {lead ? (
          <Reveal delay={0.35}>
            <p className="mt-8 max-w-2xl text-lead text-pretty text-white/60">{lead}</p>
          </Reveal>
        ) : null}
        {children ? (
          <Reveal delay={0.45} className="mt-10">
            {children}
          </Reveal>
        ) : null}
      </Container>
    </section>
  );
}
