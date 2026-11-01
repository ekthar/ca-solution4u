"use client";

import { m, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { MaskText } from "@/components/motion/mask-text";
import { Reveal } from "@/components/motion/reveal";

const STEPS = [
  { name: "Understand", text: "We understand your requirements and business context." },
  { name: "Analyse", text: "We review the available information and identify the appropriate approach." },
  { name: "Execute", text: "We work through the agreed service and documentation requirements." },
  { name: "Support", text: "We help you stay informed and prepared for the next step." },
] as const;

/** Four steps on a vertical rail that fills as the visitor scrolls. */
export function Process() {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.7", "end 0.6"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <section aria-labelledby="process-title" className="relative overflow-hidden bg-charcoal text-white">
      <Container className="py-28 md:py-40">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:sticky lg:top-32 lg:col-span-5 lg:self-start">
            <Eyebrow>The process</Eyebrow>
            <MaskText
              id="process-title"
              lines={["From the first", "conversation to the", "next milestone."]}
              className="mt-8 font-display text-display-md font-semibold"
              lineClassName="[&:last-child>span]:text-white/45"
            />
          </div>

          <ol ref={ref} className="relative lg:col-span-6 lg:col-start-7">
            <span aria-hidden className="absolute top-2 bottom-2 left-[15px] w-px bg-white/10" />
            <m.span
              aria-hidden
              className="absolute top-2 bottom-2 left-[15px] w-px origin-top bg-gradient-to-b from-blue to-white"
              style={{ scaleY: reduce ? 1 : fill }}
            />
            {STEPS.map((step, index) => (
              <li key={step.name} className="relative pb-16 pl-16 last:pb-0 md:pb-24">
                <span
                  aria-hidden
                  className="absolute top-1 left-0 flex size-[31px] items-center justify-center rounded-full border border-white/20 bg-charcoal font-mono text-[0.65rem] text-white/80"
                >
                  0{index + 1}
                </span>
                <Reveal y={30}>
                  <h3 className="font-display text-display-sm font-semibold">{step.name}</h3>
                  <p className="mt-3 max-w-md text-lead text-pretty text-white/60">{step.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
