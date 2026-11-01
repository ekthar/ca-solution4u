import type { ReactNode } from "react";
import { PageHero } from "./page-hero";
import { Container } from "@/components/ui/primitives";

/** Long-form legal text on a light, readable column. */
export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <>
      <PageHero eyebrow={`Last updated ${updated}`} lines={[title]} />
      <section className="bg-paper text-obsidian">
        <Container className="py-20 md:py-28">
          <div className="max-w-3xl space-y-10 text-[1.05rem] leading-relaxed text-ink-soft [&_a]:text-obsidian [&_a]:underline [&_a]:underline-offset-4 [&_h2]:mb-3 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-[-0.025em] [&_h2]:text-obsidian [&_li]:ml-5 [&_li]:list-disc [&_ul]:mt-3 [&_ul]:space-y-1.5">
            {children}
          </div>
        </Container>
      </section>
    </>
  );
}
