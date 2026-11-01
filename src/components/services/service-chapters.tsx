import Link from "next/link";
import { services, type Service } from "@/data/services";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/primitives";
import { MaskText } from "@/components/motion/mask-text";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { whatsappLink } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ServiceVisual } from "./service-visual";

/**
 * The six services as full-height chapters. On large screens each one pins
 * and the next slides over it, like turning pages. Small screens get a
 * normal scroll so long lists are never cut off.
 */
export function ServiceChapters({ headingLevel = "h3" }: { headingLevel?: "h2" | "h3" }) {
  return (
    <div className="relative">
      {services.map((service, index) => (
        <ServiceChapter key={service.slug} service={service} index={index} headingLevel={headingLevel} />
      ))}
    </div>
  );
}

function ServiceChapter({
  service,
  index,
  headingLevel,
}: {
  service: Service;
  index: number;
  headingLevel: "h2" | "h3";
}) {
  const dark = service.theme === "dark";
  const flip = index % 2 === 1;
  const titleId = `service-${service.slug}`;

  return (
    <article
      id={service.slug}
      aria-labelledby={titleId}
      className={cn(
        "relative overflow-hidden scroll-mt-16 lg:flex lg:min-h-[100svh] lg:items-center lg:tall:sticky lg:tall:top-0",
        dark ? "bg-charcoal text-white" : "bg-paper text-obsidian",
        index > 0 && "lg:shadow-[0_-40px_80px_-40px_rgb(0_0_0/0.45)]",
      )}
    >
      {dark ? (
        <div
          aria-hidden
          className="absolute -top-1/3 left-1/3 size-[60vmax] rounded-full bg-[radial-gradient(closest-side,rgb(82_123_255/0.12),transparent)]"
        />
      ) : null}

      <Container className="relative grid gap-12 py-24 md:py-28 lg:grid-cols-12 lg:items-center lg:gap-10 lg:py-0">
        <div className={cn("lg:col-span-6", flip && "lg:order-2 lg:col-start-7")}>
          <div className="flex items-baseline gap-4">
            <span className={cn("font-mono text-xs tracking-[0.2em] uppercase", dark ? "text-grey" : "text-ink-soft")}>
              Service {service.number} / 06
            </span>
            <span className={cn("h-px flex-1", dark ? "bg-white/12" : "bg-obsidian/12")} aria-hidden />
          </div>

          <p
            className={cn(
              "mt-8 font-display text-lg font-medium tracking-[-0.02em]",
              dark ? "text-white/60" : "text-ink-soft",
            )}
          >
            {service.name}
          </p>
          <MaskText
            as={headingLevel}
            id={titleId}
            lines={[service.headline]}
            className="mt-3 max-w-[16ch] font-display text-display-md font-semibold text-balance"
          />
          <Reveal delay={0.1}>
            <p className={cn("mt-6 max-w-xl text-lead text-pretty", dark ? "text-white/62" : "text-ink-soft")}>
              {service.description}
            </p>
          </Reveal>

          <RevealGroup as="ul" className="mt-10 grid gap-x-8 sm:grid-cols-2" stagger={0.04} delay={0.1}>
            {service.items.map((item) => (
              <RevealItem
                as="li"
                key={item}
                className={cn(
                  "flex gap-3 border-t py-3 text-[0.95rem] leading-snug",
                  dark ? "border-white/10 text-white/80" : "border-obsidian/10 text-obsidian/80",
                )}
              >
                <span aria-hidden className="mt-[0.45em] size-1.5 shrink-0 rounded-full bg-blue" />
                {item}
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.15} className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Button href={whatsappLink(service.whatsappMessage)} variant={dark ? "solid-light" : "solid-dark"}>
              Discuss this service
            </Button>
            <Link
              href={`/services/${service.slug}`}
              className={cn(
                "text-sm underline decoration-current/30 underline-offset-4 transition-colors",
                dark ? "text-white/70 hover:text-white" : "text-ink-soft hover:text-obsidian",
              )}
            >
              Service details<span className="sr-only">: {service.name}</span>
            </Link>
          </Reveal>
        </div>

        <div className={cn("relative lg:col-span-5", flip ? "lg:order-1 lg:col-start-1" : "lg:col-start-8")}>
          <Reveal y={40} duration={1.2}>
            <div className={cn("relative mx-auto max-w-[460px]", dark ? "text-white" : "text-obsidian")}>
              <span
                aria-hidden
                className={cn(
                  "absolute -top-10 -left-4 font-display text-[9rem] leading-none font-semibold tracking-[-0.08em] md:text-[12rem]",
                  dark ? "text-white/[0.04]" : "text-obsidian/[0.05]",
                )}
              >
                {service.number}
              </span>
              <ServiceVisual kind={service.visual} />
            </div>
          </Reveal>
        </div>
      </Container>
    </article>
  );
}
