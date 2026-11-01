import Link from "next/link";
import { footerNav, legalNav } from "@/data/navigation";
import { contact, links, site, whatsappLink } from "@/lib/constants";
import { Container } from "@/components/ui/primitives";
import { Wordmark } from "@/components/ui/wordmark";
import { CurrentYear } from "./current-year";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-obsidian text-white" aria-labelledby="footer-title">
      <h2 id="footer-title" className="sr-only">
        Site footer
      </h2>
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />
      <Container className="pt-20 pb-10 md:pt-28">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <Wordmark />
            <p className="mt-6 max-w-sm font-display text-display-sm text-balance text-white/88">{site.tagline}</p>
          </div>

          <nav aria-label="Footer" className="md:col-span-3 md:col-start-7">
            <p className="font-mono text-[0.7rem] tracking-[0.18em] text-grey uppercase">Explore</p>
            <ul className="mt-5 space-y-3">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-white/70 transition-colors hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <p className="font-mono text-[0.7rem] tracking-[0.18em] text-grey uppercase">Contact</p>
            <ul className="mt-5 space-y-3">
              <li>
                <a href={links.tel} className="text-white/70 transition-colors hover:text-white">
                  {contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 transition-colors hover:text-white"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={links.mailto} className="break-all text-white/70 transition-colors hover:text-white">
                  {contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p
          aria-hidden
          className="mt-20 font-display text-[clamp(3.5rem,15vw,15rem)] leading-[0.8] font-semibold tracking-[-0.065em] text-white/[0.05] select-none"
        >
          SOLUTION4U
        </p>

        <div className="mt-8 flex flex-col gap-6 border-t border-white/8 pt-8 text-sm text-grey md:flex-row md:items-center md:justify-between">
          <p>
            &copy; <CurrentYear /> {site.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
