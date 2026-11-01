import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { Magnetic } from "@/components/motion/magnetic";
import { cn } from "@/lib/utils";

type Variant = "solid-light" | "solid-dark" | "ghost-light" | "ghost-dark" | "accent";

const variants: Record<Variant, string> = {
  "solid-light": "bg-white text-obsidian hover:bg-silver",
  "solid-dark": "bg-obsidian text-white hover:bg-graphite",
  accent: "bg-blue text-white hover:bg-[#4069f5] shadow-[0_10px_40px_-12px_rgb(82_123_255/0.8)]",
  "ghost-light": "text-white ring-1 ring-white/25 ring-inset hover:bg-white/8 hover:ring-white/50",
  "ghost-dark": "text-obsidian ring-1 ring-obsidian/20 ring-inset hover:bg-obsidian/5 hover:ring-obsidian/45",
};

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  arrow?: boolean;
  magnetic?: boolean;
  ariaLabel?: string;
};

function isExternal(href: string) {
  return /^(https?:|tel:|mailto:)/.test(href);
}

/**
 * Pill-shaped call to action. Internal routes use next/link; WhatsApp, tel
 * and mailto links are plain anchors. WhatsApp opens in a new tab.
 */
export function Button({
  href,
  children,
  variant = "solid-light",
  className,
  arrow = true,
  magnetic = true,
  ariaLabel,
}: ButtonProps) {
  const classes = cn(
    "group relative inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-[0.95rem] font-medium tracking-[-0.01em] transition-[background-color,box-shadow,color] duration-300 ease-out select-none",
    variants[variant],
    className,
  );

  const content = (
    <>
      <span>{children}</span>
      {arrow ? (
        <ArrowUpRight
          aria-hidden
          className="size-4 transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          strokeWidth={2}
        />
      ) : null}
    </>
  );

  const external = isExternal(href);
  const newTab = href.startsWith("http");

  const element = external ? (
    <a
      href={href}
      className={classes}
      aria-label={ariaLabel}
      {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {content}
    </a>
  ) : (
    <Link href={href} className={classes} aria-label={ariaLabel}>
      {content}
    </Link>
  );

  return magnetic ? <Magnetic>{element}</Magnetic> : element;
}
