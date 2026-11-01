"use client";

import { m } from "motion/react";
import { cn } from "@/lib/utils";
import { easeOutExpo, revealViewport } from "./variants";

/** A hairline that draws from left to right when it enters the viewport. */
export function DrawLine({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <m.span
      aria-hidden
      data-reveal=""
      className={cn("block h-px origin-left bg-current", className)}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={revealViewport}
      transition={{ duration: 1.4, ease: easeOutExpo, delay }}
    />
  );
}
