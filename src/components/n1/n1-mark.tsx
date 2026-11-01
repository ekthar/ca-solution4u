"use client";

import { m, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

const DEPTH = 10;

/**
 * Oversized metallic "N1". Stacked offset copies fake an extruded, machined
 * edge; a slow sheen moves across the face. The block tilts a little as it
 * scrolls past. Glass fragments float at different depths around it.
 */
export function N1Mark({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], reduce ? [0, 0, 0] : [24, 6, -10]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], reduce ? [1, 1, 1] : [0.86, 1, 1.04]);
  const nearY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [120, -160]);
  const farY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [60, -60]);

  return (
    <div ref={ref} aria-hidden className={cn("relative select-none [perspective:1400px]", className)}>
      {/* Light streaks behind the mark. */}
      <div className="absolute inset-0 overflow-hidden">
        {[18, 42, 64, 82].map((top, i) => (
          <span key={top} className="absolute left-0 h-px w-full" style={{ top: `${top}%` }}>
            <span
              className="absolute inset-y-0 left-0 w-1/3 animate-streak bg-gradient-to-r from-transparent via-blue/80 to-transparent"
              style={{ animationDelay: `${i * -1.7}s`, animationDuration: `${6 + i}s` }}
            />
          </span>
        ))}
      </div>

      <m.div style={{ y: farY }} className="absolute top-[8%] left-[4%] hidden w-44 md:block">
        <GlassFragment variant="bars" />
      </m.div>
      <m.div style={{ y: nearY }} className="absolute right-[3%] bottom-[10%] z-10 w-40 md:w-56">
        <GlassFragment variant="ring" />
      </m.div>
      <m.div style={{ y: farY }} className="absolute top-[14%] right-[10%] hidden w-32 lg:block">
        <GlassFragment variant="dots" />
      </m.div>

      <m.div style={{ rotateX, scale }} className="relative flex justify-center [transform-style:preserve-3d]">
        <div className="relative font-display text-mega font-bold">
          {Array.from({ length: DEPTH }, (_, i) => (
            <span
              key={i}
              className="absolute inset-0 text-[#2a2d34]"
              style={{ transform: `translate3d(${(i + 1) * 0.6}px, ${(i + 1) * 0.9}px, 0)`, opacity: 1 - i * 0.06 }}
            >
              N1
            </span>
          ))}
          <span className="metal-text relative block animate-sheen">N1</span>
          <span className="absolute inset-x-[8%] -bottom-6 h-16 rounded-[50%] bg-blue/35 blur-3xl" />
        </div>
      </m.div>
    </div>
  );
}

/** Small piece of glass UI. Abstract only: it hints at an interface, it shows no feature. */
function GlassFragment({ variant }: { variant: "bars" | "ring" | "dots" }) {
  return (
    <div
      className="glass animate-float rounded-2xl p-4"
      style={{ animationDuration: variant === "ring" ? "11s" : "13s" }}
    >
      <div className="mb-3 flex gap-1.5">
        <span className="size-1.5 rounded-full bg-white/40" />
        <span className="size-1.5 rounded-full bg-white/25" />
        <span className="size-1.5 rounded-full bg-white/15" />
      </div>
      {variant === "bars" ? (
        <div className="space-y-2">
          <span className="block h-1.5 w-4/5 rounded-full bg-white/30" />
          <span className="block h-1.5 w-3/5 rounded-full bg-white/15" />
          <span className="block h-1.5 w-2/3 rounded-full bg-blue/70" />
        </div>
      ) : null}
      {variant === "ring" ? (
        <div className="flex items-center gap-4">
          <span className="relative size-14 shrink-0 rounded-full border-[5px] border-white/12">
            <span className="absolute -inset-[5px] rounded-full border-[5px] border-transparent border-t-blue border-r-blue" />
          </span>
          <span className="flex-1 space-y-2">
            <span className="block h-1.5 w-full rounded-full bg-white/25" />
            <span className="block h-1.5 w-2/3 rounded-full bg-white/12" />
          </span>
        </div>
      ) : null}
      {variant === "dots" ? (
        <div className="grid grid-cols-4 gap-1.5">
          {Array.from({ length: 12 }, (_, i) => (
            <span key={i} className={cn("aspect-square rounded-[4px]", i === 6 ? "bg-blue/80" : "bg-white/12")} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
