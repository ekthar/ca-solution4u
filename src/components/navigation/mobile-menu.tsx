"use client";

import Link from "next/link";
import { AnimatePresence, m } from "motion/react";
import { useEffect, useRef } from "react";
import { primaryNav } from "@/data/navigation";
import { contact, links, whatsappLink } from "@/lib/constants";
import { easeOutExpo } from "@/components/motion/variants";
import { cn } from "@/lib/utils";

type Props = { open: boolean; onClose: () => void; pathname: string };

/** Full-screen menu for small screens. Escape closes it; focus stays inside. */
export function MobileMenu({ open, onClose, pathname }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const first = panelRef.current?.querySelector<HTMLElement>("a");
    first?.focus({ preventScroll: true });

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
      // The trap covers the whole header so the logo and close button stay reachable.
      const scope = panelRef.current?.closest("header");
      if (event.key !== "Tab" || !scope) return;
      const focusable = Array.from(scope.querySelectorAll<HTMLElement>("a, button")).filter(
        (el) => el.offsetParent !== null,
      );
      const firstEl = focusable[0];
      const lastEl = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === firstEl) {
        event.preventDefault();
        lastEl?.focus();
      } else if (!event.shiftKey && document.activeElement === lastEl) {
        event.preventDefault();
        firstEl?.focus();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <m.div
          id="mobile-menu"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-0 flex flex-col bg-obsidian px-5 pt-24 pb-[calc(2rem+env(safe-area-inset-bottom))] text-white md:hidden"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.6, ease: easeOutExpo }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -top-40 right-[-30%] size-[34rem] rounded-full bg-blue/20 blur-[120px]"
          />
          <ul className="relative flex flex-col">
            {primaryNav.map((item, index) => {
              const active =
                !item.href.includes("#") && (item.href === "/" ? pathname === "/" : pathname.startsWith(item.href));
              return (
                <li key={item.href} className="overflow-hidden border-b border-white/8">
                  <m.div
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "100%", transition: { duration: 0.3 } }}
                    transition={{ duration: 0.7, ease: easeOutExpo, delay: 0.12 + index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex items-center justify-between py-4 font-display text-[2.4rem] leading-none font-medium tracking-[-0.045em]",
                        active ? "text-white" : "text-white/70",
                      )}
                    >
                      {item.label}
                      <span className="font-mono text-xs tracking-normal text-grey">0{index + 1}</span>
                    </Link>
                  </m.div>
                </li>
              );
            })}
          </ul>

          <m.div
            className="relative mt-auto flex flex-col gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: easeOutExpo, delay: 0.4 }}
          >
            <Link
              href="/contact"
              onClick={onClose}
              className="flex min-h-14 items-center justify-center rounded-full bg-white text-base font-medium text-obsidian"
            >
              Let&apos;s Talk
            </Link>
            <div className="grid grid-cols-2 gap-3">
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-12 items-center justify-center rounded-full text-sm ring-1 ring-white/20 ring-inset"
              >
                WhatsApp
              </a>
              <a
                href={links.tel}
                className="flex min-h-12 items-center justify-center rounded-full text-sm ring-1 ring-white/20 ring-inset"
              >
                Call
              </a>
            </div>
            <a href={links.mailto} className="mt-2 text-center text-sm text-grey">
              {contact.email}
            </a>
          </m.div>
        </m.div>
      ) : null}
    </AnimatePresence>
  );
}
