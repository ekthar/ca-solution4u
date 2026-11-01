"use client";

import { m, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

const PANES = [
  { h: 46, x: -3, z: -2.4, delay: 0.0 },
  { h: 60, x: -2, z: -1.6, delay: 0.06 },
  { h: 74, x: -1, z: -0.8, delay: 0.12 },
  { h: 88, x: 0, z: 0, delay: 0.18 },
  { h: 72, x: 1, z: 0.8, delay: 0.24 },
  { h: 56, x: 2, z: 1.6, delay: 0.3 },
  { h: 40, x: 3, z: 2.4, delay: 0.36 },
] as const;

/**
 * The hero object: a fan of glass slabs, an orbit ring and a light beam,
 * built in CSS 3D so it costs no download. It tilts toward a fine pointer
 * and stays still for reduced-motion visitors.
 */
export function GlassStructure({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 60, damping: 18, mass: 0.8 });
  const sy = useSpring(py, { stiffness: 60, damping: 18, mass: 0.8 });
  const rotateY = useTransform(sx, [-1, 1], [-30, -6]);
  const rotateX = useTransform(sy, [-1, 1], [8, -4]);
  const glowX = useTransform(sx, [-1, 1], ["38%", "62%"]);

  useEffect(() => {
    if (reduce) return;
    const fine = window.matchMedia("(pointer: fine)");
    if (!fine.matches) return;
    function onMove(event: PointerEvent) {
      px.set((event.clientX / window.innerWidth) * 2 - 1);
      py.set((event.clientY / window.innerHeight) * 2 - 1);
    }
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [px, py, reduce]);

  return (
    <div aria-hidden className={cn("pointer-events-none select-none [perspective:1600px]", className)}>
      {/* Light that follows the tilt and pools under the structure. */}
      <m.div
        className="absolute top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue/30 blur-[90px]"
        style={{ left: glowX }}
      />
      <div className="absolute inset-x-[10%] bottom-[6%] h-24 rounded-[50%] bg-white/10 blur-3xl" />

      <m.div
        className="absolute inset-0 [transform-style:preserve-3d]"
        style={{ rotateY, rotateX }}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      >
        {/* Orbit ring: precision, measured motion. */}
        <div className="absolute top-1/2 left-1/2 size-[84%] [transform:translate(-50%,-50%)_rotateX(74deg)] [transform-style:preserve-3d]">
          <div className="size-full animate-spin-slow rounded-full border border-white/14">
            <span className="absolute top-0 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue shadow-[0_0_18px_4px_rgb(82_123_255/0.7)]" />
          </div>
        </div>

        {PANES.map((pane, index) => (
          <div
            key={index}
            className="absolute top-1/2 left-1/2 w-[15%] [transform-style:preserve-3d]"
            style={{
              height: `${pane.h}%`,
              transform: `translate(-50%, -50%) translateX(${pane.x * 62}%) translateZ(${pane.z * 60}px) rotateY(38deg)`,
            }}
          >
            <m.div
              className="relative size-full overflow-hidden rounded-[14px] border border-white/18"
              style={{
                background:
                  "linear-gradient(165deg, rgb(255 255 255 / 0.22) 0%, rgb(255 255 255 / 0.04) 38%, rgb(82 123 255 / 0.10) 72%, rgb(255 255 255 / 0.03) 100%)",
                boxShadow: "inset 1px 1px 0 rgb(255 255 255 / 0.35), inset -1px -1px 0 rgb(255 255 255 / 0.05)",
              }}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.4 + pane.delay }}
            >
              {/* Edge highlight that drifts down each slab. */}
              <span
                className="absolute inset-x-0 top-0 h-1/3 animate-float bg-gradient-to-b from-white/25 to-transparent"
                style={{ animationDelay: `${index * -1.3}s` }}
              />
              <span className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-white/70 via-white/10 to-transparent" />
            </m.div>
          </div>
        ))}

        {/* A thin beam of light threading the slabs. */}
        <div className="absolute top-[52%] left-[4%] h-px w-[92%] overflow-hidden [transform:translateZ(40px)]">
          <span className="absolute inset-y-0 left-0 w-1/3 animate-streak bg-gradient-to-r from-transparent via-white to-transparent" />
        </div>
        <div className="absolute top-[52%] left-[4%] h-px w-[92%] bg-gradient-to-r from-transparent via-blue/50 to-transparent [transform:translateZ(40px)]" />
      </m.div>
    </div>
  );
}
