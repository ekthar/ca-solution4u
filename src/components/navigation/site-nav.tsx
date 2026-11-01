"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { primaryNav } from "@/data/navigation";
import { Wordmark } from "@/components/ui/wordmark";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MobileMenu } from "./mobile-menu";

function isActive(pathname: string, href: string) {
  if (href.includes("#")) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Minimal top bar. Transparent over the hero, then a translucent blurred
 * surface once the page scrolls. Every page opens on a dark hero, so the
 * bar always sits on dark.
 */
export function SiteNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu after a route change.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "absolute inset-0 border-b transition-[background-color,border-color,backdrop-filter] duration-500 ease-out",
          scrolled || open
            ? "border-white/8 bg-obsidian/72 backdrop-blur-xl backdrop-saturate-150"
            : "border-transparent bg-transparent",
        )}
        aria-hidden
      />
      <nav
        aria-label="Main"
        className="relative mx-auto flex h-16 max-w-[1320px] items-center justify-between px-5 text-white sm:px-8 md:h-[4.5rem] lg:px-12"
      >
        <Link href="/" aria-label="CA SOLUTION4U home" className="relative z-10 -m-2 rounded-lg p-2">
          <Wordmark />
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          <ul className="flex items-center gap-1">
            {primaryNav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative rounded-full px-4 py-2 text-[0.9rem] tracking-[-0.01em] transition-colors duration-300",
                      active ? "text-white" : "text-white/62 hover:text-white",
                    )}
                  >
                    {item.label}
                    {active ? <span aria-hidden className="absolute inset-x-4 -bottom-0.5 h-px bg-white/70" /> : null}
                  </Link>
                </li>
              );
            })}
          </ul>
          <Button href="/contact" variant="solid-light" arrow={false} className="ml-4 min-h-10 px-5 text-[0.88rem]">
            Let&apos;s Talk
          </Button>
        </div>

        <button
          type="button"
          className="relative z-10 -mr-2 flex size-11 items-center justify-center rounded-full md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <span aria-hidden className="relative block h-3 w-5">
            <span
              className={cn(
                "absolute left-0 h-[1.5px] w-5 rounded bg-white transition-transform duration-500 ease-[var(--ease-out-expo)]",
                open ? "top-[5px] rotate-45" : "top-0",
              )}
            />
            <span
              className={cn(
                "absolute left-0 h-[1.5px] w-5 rounded bg-white transition-transform duration-500 ease-[var(--ease-out-expo)]",
                open ? "top-[5px] -rotate-45" : "top-[10px]",
              )}
            />
          </span>
        </button>
      </nav>

      <MobileMenu open={open} onClose={() => setOpen(false)} pathname={pathname} />
    </header>
  );
}
