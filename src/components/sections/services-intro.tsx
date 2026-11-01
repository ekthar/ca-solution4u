import Link from "next/link";
import { services } from "@/data/services";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { MaskText } from "@/components/motion/mask-text";
import { Reveal } from "@/components/motion/reveal";

/** Opens the services chapters with an index that jumps to each one. */
export function ServicesIntro() {
  return (
    <section aria-labelledby="services-title" className="bg-obsidian text-white">
      <Container className="pt-28 pb-20 md:pt-40 md:pb-28">
        <Eyebrow>The expertise</Eyebrow>
        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-end">
          <MaskText
            id="services-title"
            lines={["Six disciplines.", "One standard of care."]}
            className="font-display text-display-lg font-semibold lg:col-span-8"
            lineClassName="[&:last-child>span]:text-white/45"
          />
          <Reveal className="lg:col-span-4">
            <p className="text-lead text-pretty text-white/60">
              From recurring compliance to the plans that shape what you build next. Choose a discipline, or start a
              conversation and we will point you to the right one.
            </p>
          </Reveal>
        </div>

        <nav aria-label="Services" className="mt-16 md:mt-20">
          <ul className="grid gap-px border-y border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <li key={service.slug} className="bg-obsidian">
                <Link
                  href={`#${service.slug}`}
                  className="group flex items-baseline gap-5 px-1 py-6 transition-colors hover:bg-white/[0.03] sm:px-6"
                >
                  <span className="font-mono text-xs text-grey transition-colors group-hover:text-blue">
                    {service.number}
                  </span>
                  <span className="font-display text-xl font-medium tracking-[-0.025em] text-white/80 transition-colors group-hover:text-white">
                    {service.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </section>
  );
}
