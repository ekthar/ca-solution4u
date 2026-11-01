import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getService, services, serviceSlugToOption } from "@/data/services";
import { PageHero } from "@/components/sections/page-hero";
import { ServiceVisual } from "@/components/services/service-visual";
import { Process } from "@/components/sections/process";
import { Button } from "@/components/ui/button";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { JsonLd } from "@/components/ui/json-ld";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { whatsappLink } from "@/lib/constants";
import { pageMetadata, serviceJsonLd } from "@/lib/metadata";

/**
 * One page per service. Built statically from data/services.ts, which keeps
 * room for future service-area pages without inventing any locations.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMetadata({ title: service.seoTitle, description: service.seoDescription, path: `/services/${slug}` });
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const index = services.findIndex((item) => item.slug === slug);
  const next = services[(index + 1) % services.length];

  return (
    <>
      <PageHero
        eyebrow={`Service ${service.number} / ${service.name}`}
        lines={[service.headline]}
        lead={service.description}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href={whatsappLink(service.whatsappMessage)} variant="solid-light">
            Discuss this service
          </Button>
          <Button
            href={`/contact?service=${serviceSlugToOption[slug] ?? "other"}#enquiry`}
            variant="ghost-light"
            arrow={false}
          >
            Send an enquiry
          </Button>
        </div>
      </PageHero>

      <section aria-labelledby="scope-title" className="bg-paper text-obsidian">
        <Container className="grid gap-16 py-24 md:py-36 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <Eyebrow tone="light">What we help with</Eyebrow>
            <h2 id="scope-title" className="mt-6 font-display text-display-md font-semibold">
              {service.name}
            </h2>
            <RevealGroup as="ul" className="mt-10" stagger={0.05}>
              {service.items.map((item, i) => (
                <RevealItem
                  as="li"
                  key={item}
                  className="flex items-baseline gap-6 border-t border-obsidian/10 py-5 font-display text-xl tracking-[-0.02em] last:border-b"
                >
                  <span className="font-mono text-xs text-ink-soft">{String(i + 1).padStart(2, "0")}</span>
                  {item}
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
          <Reveal className="lg:col-span-5 lg:col-start-8" y={40}>
            <div className="mx-auto max-w-[440px] text-obsidian">
              <ServiceVisual kind={service.visual} />
            </div>
          </Reveal>
        </Container>
      </section>

      <Process />

      <section aria-label="Next service" className="bg-obsidian text-white">
        <Container className="py-20 md:py-28">
          <Link href={`/services/${next.slug}`} className="group block">
            <p className="font-mono text-xs tracking-[0.2em] text-grey uppercase">Next service</p>
            <p className="mt-4 font-display text-display-md font-semibold text-white/50 transition-colors duration-500 group-hover:text-white">
              {next.name}{" "}
              <span aria-hidden className="inline-block transition-transform duration-500 group-hover:translate-x-2">
                &rarr;
              </span>
            </p>
          </Link>
        </Container>
      </section>

      <JsonLd data={serviceJsonLd(slug)} />
    </>
  );
}
