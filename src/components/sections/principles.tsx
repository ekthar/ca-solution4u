import { Container, Eyebrow } from "@/components/ui/primitives";
import { DrawLine } from "@/components/motion/draw-line";
import { MaskText } from "@/components/motion/mask-text";
import { Reveal } from "@/components/motion/reveal";

const PRINCIPLES = [
  { name: "Clarity", text: "We make complex financial matters easier to understand." },
  { name: "Precision", text: "We value accurate information, structured processes and attention to detail." },
  { name: "Partnership", text: "We believe in building long-term professional relationships." },
  { name: "Progress", text: "We combine financial expertise with modern business technology." },
] as const;

export function Principles() {
  return (
    <section aria-labelledby="principles-title" className="bg-paper text-obsidian">
      <Container className="py-28 md:py-40">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow tone="light">Why CA SOLUTION4U</Eyebrow>
            <MaskText
              id="principles-title"
              lines={["Professional thinking.", "Practical solutions."]}
              className="mt-8 font-display text-display-md font-semibold"
              lineClassName="[&:last-child>span]:text-obsidian/40"
            />
          </div>

          <ol className="lg:col-span-7">
            {PRINCIPLES.map((principle, index) => (
              <li key={principle.name} className="text-obsidian/15">
                <DrawLine delay={index * 0.08} />
                <Reveal
                  delay={index * 0.06}
                  className="grid grid-cols-[auto_1fr] items-start gap-x-6 py-8 text-obsidian md:grid-cols-[8rem_1fr_1.3fr] md:gap-x-10 md:py-10"
                >
                  <span className="font-display text-[3.5rem] leading-[0.85] font-semibold tracking-[-0.06em] text-obsidian/[0.12] md:text-[5.5rem]">
                    0{index + 1}
                  </span>
                  <h3 className="font-display text-display-sm font-semibold">{principle.name}</h3>
                  <p className="col-start-2 mt-2 text-pretty text-ink-soft md:col-start-3 md:mt-1.5">
                    {principle.text}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
