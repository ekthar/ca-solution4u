import { Container, Eyebrow } from "@/components/ui/primitives";
import { DrawLine } from "@/components/motion/draw-line";
import { Reveal } from "@/components/motion/reveal";
import { ScrollWords } from "@/components/motion/scroll-words";
import { site } from "@/lib/constants";

export function Philosophy() {
  return (
    <section aria-labelledby="philosophy-title" className="relative bg-paper text-obsidian">
      <Container className="py-28 md:py-44">
        <Eyebrow tone="light">Beyond the numbers</Eyebrow>

        <ScrollWords
          id="philosophy-title"
          text={"Numbers tell a story.\nWe help you understand what comes next."}
          className="mt-10 max-w-[18ch] font-display text-display-lg font-semibold text-balance"
        />

        <div className="mt-20 grid gap-10 md:mt-28 md:grid-cols-12">
          <div className="text-obsidian/20 md:col-span-12">
            <DrawLine />
          </div>
          <Reveal className="md:col-span-4">
            <p className="font-display text-xl font-medium tracking-[-0.02em] text-balance">{site.positioning}</p>
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-6 md:col-start-7">
            <p className="text-lead text-pretty text-ink-soft">
              Every business has decisions to make, obligations to meet and opportunities to discover. We bring
              financial understanding, structured processes and practical guidance together to help you make those
              decisions with confidence.
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
