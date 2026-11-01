import { ArrowUpRight } from "lucide-react";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { MaskText } from "@/components/motion/mask-text";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { contact, links, whatsappLink } from "@/lib/constants";
import { ContactForm } from "./contact-form";

const actions = [
  { label: "Call", value: contact.phoneDisplay, href: links.tel, note: "Speak with our team" },
  { label: "WhatsApp", value: contact.phoneDisplay, href: whatsappLink(), note: "Message us anytime", external: true },
  { label: "Email", value: contact.email, href: links.mailto, note: "Write to us in detail" },
] as const;

/** Conversion block: three direct channels, then the enquiry form. */
export function ContactSection({
  headingAs = "h2",
  defaultService,
}: {
  headingAs?: "h1" | "h2";
  defaultService?: string;
}) {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative isolate overflow-hidden bg-obsidian text-white"
    >
      <div
        aria-hidden
        className="absolute -bottom-1/2 left-1/2 -z-10 size-[90vmax] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(82_123_255/0.14),transparent)]"
      />
      <Container className="py-28 md:py-40">
        <Eyebrow>Contact</Eyebrow>
        <MaskText
          as={headingAs}
          id="contact-title"
          lines={["Let\u2019s make your next", "business decision", "a better one."]}
          className="mt-8 max-w-[16ch] font-display text-display-lg font-semibold"
          lineClassName="[&:last-child>span]:text-white/45"
        />
        <Reveal delay={0.1}>
          <p className="mt-8 max-w-xl text-lead text-pretty text-white/60">
            Whether you need help with taxation, GST, accounting, financial planning or business documentation, start
            with a conversation.
          </p>
        </Reveal>

        <RevealGroup as="ul" className="mt-16 grid gap-3 md:grid-cols-3" stagger={0.08}>
          {actions.map((action) => (
            <RevealItem as="li" key={action.label}>
              <a
                href={action.href}
                {...("external" in action ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group relative flex h-full min-h-44 flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition-[border-color,background-color] duration-500 hover:border-white/25 hover:bg-white/[0.06] md:p-8"
              >
                <span className="flex items-center justify-between">
                  <span className="font-mono text-xs tracking-[0.2em] text-grey uppercase">{action.label}</span>
                  <ArrowUpRight
                    aria-hidden
                    className="size-5 text-white/50 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-white"
                  />
                </span>
                <span>
                  <span className="block font-display text-[1.45rem] font-medium tracking-[-0.03em] break-all md:text-[1.6rem]">
                    {action.value}
                  </span>
                  <span className="mt-1 block text-sm text-white/50">{action.note}</span>
                </span>
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-blue transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100"
                />
              </a>
            </RevealItem>
          ))}
        </RevealGroup>

        <div id="enquiry" className="mt-24 grid scroll-mt-28 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h3 className="font-display text-display-sm font-semibold">Prefer to write it down?</h3>
            <p className="mt-4 max-w-sm text-white/60">
              Share a few details and we will get back to you. For anything urgent, call or message us on WhatsApp.
            </p>
          </div>
          <Reveal className="lg:col-span-7 lg:col-start-6">
            <ContactForm defaultService={defaultService} />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
