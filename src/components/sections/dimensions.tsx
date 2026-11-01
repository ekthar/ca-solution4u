"use client";

import { m, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";

const DIMENSIONS = [
  { name: "Compliance", line: "Filings, deadlines and records kept in order." },
  { name: "Taxation", line: "Obligations understood, planned and met on time." },
  { name: "Financials", line: "Statements and reconciliations you can rely on." },
  { name: "Operations", line: "Day-to-day accounting that keeps the books current." },
  { name: "Planning", line: "Projections and budgets for the road ahead." },
  { name: "Technology", line: "Modern tools that bring the pieces together." },
] as const;

const CENTER = 300;
const RADIUS = 220;
const nodes = DIMENSIONS.map((_, i) => {
  const angle = -Math.PI / 2 + (i / DIMENSIONS.length) * Math.PI * 2;
  return { x: CENTER + Math.cos(angle) * RADIUS, y: CENTER + Math.sin(angle) * RADIUS, angle };
});

/**
 * Signature section. The block pins while the visitor scrolls through six
 * dimensions of a business; each one lights in turn around a central form.
 */
export function Dimensions() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 120]);
  const counterRotate = useTransform(rotate, (value) => -value * 0.6);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const next = Math.min(DIMENSIONS.length - 1, Math.max(0, Math.floor(value * DIMENSIONS.length)));
    setActive((current) => (current === next ? current : next));
  });

  return (
    <section
      ref={ref}
      id="expertise"
      aria-labelledby="dimensions-title"
      className="relative h-[420svh] scroll-mt-0 bg-obsidian text-white"
    >
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <div
          aria-hidden
          className="absolute top-1/2 left-1/2 size-[80vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(82_123_255/0.16),transparent)] lg:left-[68%]"
        />

        <Container className="relative grid h-full grid-rows-[auto_1fr] items-center gap-4 pt-20 pb-6 lg:grid-cols-12 lg:grid-rows-1 lg:gap-10 lg:py-0">
          <div className="lg:col-span-5">
            <Eyebrow>The bigger picture</Eyebrow>
            <h2
              id="dimensions-title"
              className="mt-5 max-w-[15ch] font-display text-[clamp(1.9rem,1rem+3.4vw,4rem)] leading-[1] font-semibold tracking-[-0.045em] text-balance"
            >
              One business. Many moving parts. <span className="text-white/45">One clearer direction.</span>
            </h2>

            <ol className="max-lg:sr-only lg:mt-12">
              {DIMENSIONS.map((dimension, index) => {
                const on = index === active;
                return (
                  <li
                    key={dimension.name}
                    aria-current={on ? "step" : undefined}
                    className="border-t border-white/8 py-3.5 last:border-b"
                  >
                    <div className="flex items-baseline gap-5">
                      <span
                        className={cn(
                          "font-mono text-xs transition-colors duration-500",
                          on ? "text-blue" : "text-white/30",
                        )}
                      >
                        0{index + 1}
                      </span>
                      <span
                        className={cn(
                          "font-display text-2xl font-medium tracking-[-0.03em] transition-colors duration-500",
                          on ? "text-white" : "text-white/35",
                        )}
                      >
                        {dimension.name}
                      </span>
                    </div>
                    <p
                      className={cn(
                        "grid pl-10 text-sm text-white/60 transition-[grid-template-rows,opacity] duration-500 ease-[var(--ease-out-expo)]",
                        on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                      )}
                    >
                      <span className="overflow-hidden">
                        <span className="block pt-2">{dimension.line}</span>
                      </span>
                    </p>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="relative flex h-full min-h-0 flex-col items-center justify-center lg:col-span-7">
            <div className="relative aspect-square h-auto max-h-full w-full max-w-[min(640px,62svh)] lg:max-w-[min(660px,82svh)]">
              <svg viewBox="0 0 600 600" className="size-full overflow-visible" aria-hidden>
                <defs>
                  <radialGradient id="dim-core" cx="0.4" cy="0.35" r="0.75">
                    <stop offset="0" stopColor="#ffffff" stopOpacity="0.5" />
                    <stop offset="0.5" stopColor="#527BFF" stopOpacity="0.25" />
                    <stop offset="1" stopColor="#527BFF" stopOpacity="0" />
                  </radialGradient>
                </defs>

                <circle cx={CENTER} cy={CENTER} r={RADIUS} fill="none" stroke="#fff" strokeOpacity="0.08" />
                <circle
                  cx={CENTER}
                  cy={CENTER}
                  r={RADIUS - 70}
                  fill="none"
                  stroke="#fff"
                  strokeOpacity="0.05"
                  strokeDasharray="2 8"
                />

                {nodes.map((node, index) => {
                  const on = index === active;
                  return (
                    <line
                      key={`l${index}`}
                      x1={CENTER}
                      y1={CENTER}
                      x2={node.x}
                      y2={node.y}
                      stroke={on ? "#527BFF" : "#fff"}
                      strokeOpacity={on ? 0.95 : 0.12}
                      strokeWidth={on ? 1.5 : 1}
                      strokeDasharray={on ? "5 7" : undefined}
                      className={cn("transition-[stroke-opacity] duration-500", on && "animate-dash")}
                    />
                  );
                })}

                {/* Ring segments joining neighbours, lit up to the active one. */}
                {nodes.map((node, index) => {
                  const next = nodes[(index + 1) % nodes.length];
                  const reached = index < active;
                  return (
                    <line
                      key={`r${index}`}
                      x1={node.x}
                      y1={node.y}
                      x2={next.x}
                      y2={next.y}
                      stroke="#fff"
                      strokeOpacity={reached ? 0.45 : 0.06}
                      className="transition-[stroke-opacity] duration-700"
                    />
                  );
                })}

                <circle cx={CENTER} cy={CENTER} r="150" fill="url(#dim-core)" />

                {/* Central form: nested facets turning with the scroll. */}
                <m.g style={{ rotate, transformBox: "view-box", transformOrigin: "300px 300px" }}>
                  <polygon
                    points="300,190 395,245 395,355 300,410 205,355 205,245"
                    fill="#fff"
                    fillOpacity="0.04"
                    stroke="#fff"
                    strokeOpacity="0.45"
                  />
                  <polygon points="300,190 395,245 300,300 205,245" fill="#fff" fillOpacity="0.1" />
                  <polygon points="300,300 395,245 395,355 300,410" fill="#527BFF" fillOpacity="0.35" />
                  <line x1="300" y1="300" x2="300" y2="410" stroke="#fff" strokeOpacity="0.3" />
                </m.g>
                <m.g style={{ rotate: counterRotate, transformBox: "view-box", transformOrigin: "300px 300px" }}>
                  <rect
                    x="255"
                    y="255"
                    width="90"
                    height="90"
                    fill="none"
                    stroke="#fff"
                    strokeOpacity="0.55"
                    transform="rotate(45 300 300)"
                  />
                </m.g>
                <circle cx={CENTER} cy={CENTER} r="6" fill="#fff" />

                {nodes.map((node, index) => {
                  const on = index === active;
                  const labelX = CENTER + Math.cos(node.angle) * (RADIUS + 44);
                  const labelY = CENTER + Math.sin(node.angle) * (RADIUS + 44);
                  return (
                    <g key={`n${index}`}>
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={on ? 22 : 0}
                        fill="#527BFF"
                        fillOpacity="0.18"
                        className="transition-all duration-500"
                      />
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={on ? 8 : 5}
                        fill={on ? "#527BFF" : "#090A0C"}
                        stroke={on ? "#527BFF" : "#fff"}
                        strokeOpacity={on ? 1 : 0.5}
                        className="transition-all duration-500"
                      />
                      <text
                        x={labelX}
                        y={labelY}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill="#fff"
                        fillOpacity={on ? 1 : 0.38}
                        className="font-sans text-[15px] font-medium tracking-[-0.01em] transition-[fill-opacity] duration-500"
                      >
                        {DIMENSIONS[index].name}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Small screens: the active dimension in words, under the form. */}
            <div className="mt-4 w-full text-center lg:hidden" aria-hidden>
              <p className="font-mono text-xs text-blue">0{active + 1} / 06</p>
              <p className="mt-2 font-display text-2xl font-medium tracking-[-0.03em]">{DIMENSIONS[active].name}</p>
              <p className="mx-auto mt-1 max-w-xs text-sm text-white/60">{DIMENSIONS[active].line}</p>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
