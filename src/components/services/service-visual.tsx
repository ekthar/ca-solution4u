import type { ServiceVisual as VisualKind } from "@/data/services";
import { cn } from "@/lib/utils";

/**
 * One abstract composition per service, drawn in SVG so each costs a few
 * hundred bytes. Lines use currentColor, so they fit light and dark sections.
 * All motion is CSS and stops under reduced motion.
 */
export function ServiceVisual({ kind, className }: { kind: VisualKind; className?: string }) {
  const Visual = visuals[kind];
  return (
    <div aria-hidden className={cn("relative aspect-square w-full", className)}>
      <Visual />
    </div>
  );
}

const BLUE = "#527BFF";

/** Audit: a precision lens passing over a field, measured and calibrated. */
function Lens() {
  const ticks = Array.from({ length: 72 }, (_, i) => i);
  return (
    <svg viewBox="0 0 400 400" className="size-full overflow-visible">
      <defs>
        <radialGradient id="lens-fill" cx="0.35" cy="0.3" r="0.8">
          <stop offset="0" stopColor="currentColor" stopOpacity="0.16" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
        <clipPath id="lens-clip">
          <circle cx="200" cy="200" r="96" />
        </clipPath>
      </defs>
      {[178, 150, 124].map((r, i) => (
        <circle key={r} cx="200" cy="200" r={r} fill="none" stroke="currentColor" strokeOpacity={0.12 + i * 0.05} />
      ))}
      <g className="origin-center animate-spin-slower" style={{ transformBox: "fill-box" }}>
        {ticks.map((i) => {
          const a = (i / ticks.length) * Math.PI * 2;
          const long = i % 6 === 0;
          const r1 = 178;
          const r2 = long ? 164 : 171;
          return (
            <line
              key={i}
              x1={200 + Math.cos(a) * r1}
              y1={200 + Math.sin(a) * r1}
              x2={200 + Math.cos(a) * r2}
              y2={200 + Math.sin(a) * r2}
              stroke="currentColor"
              strokeOpacity={long ? 0.55 : 0.22}
            />
          );
        })}
      </g>
      <g clipPath="url(#lens-clip)">
        {Array.from({ length: 13 }, (_, i) => (
          <g key={i}>
            <line x1={104 + i * 16} y1="96" x2={104 + i * 16} y2="304" stroke="currentColor" strokeOpacity="0.2" />
            <line x1="96" y1={104 + i * 16} x2="304" y2={104 + i * 16} stroke="currentColor" strokeOpacity="0.2" />
          </g>
        ))}
        <rect x="184" y="184" width="32" height="32" fill={BLUE} fillOpacity="0.9" />
      </g>
      <circle cx="200" cy="200" r="96" fill="url(#lens-fill)" stroke="currentColor" strokeOpacity="0.6" />
      <g
        className="origin-center animate-spin-slow"
        style={{ transformBox: "view-box", transformOrigin: "200px 200px" }}
      >
        <path d="M200 46 A154 154 0 0 1 354 200" fill="none" stroke={BLUE} strokeWidth="2" strokeLinecap="round" />
        <circle cx="354" cy="200" r="4" fill={BLUE} />
      </g>
      <line x1="200" y1="10" x2="200" y2="60" stroke="currentColor" strokeOpacity="0.4" />
      <line x1="200" y1="340" x2="200" y2="390" stroke="currentColor" strokeOpacity="0.4" />
      <line x1="10" y1="200" x2="60" y2="200" stroke="currentColor" strokeOpacity="0.4" />
      <line x1="340" y1="200" x2="390" y2="200" stroke="currentColor" strokeOpacity="0.4" />
    </svg>
  );
}

/** Taxation: layered planes, each obligation given its own clear level. */
function Strata() {
  const layers = [0, 1, 2, 3, 4];
  return (
    <svg viewBox="0 0 400 400" className="size-full overflow-visible">
      {layers.map((i) => {
        const y = 110 + i * 46;
        const active = i === 2;
        return (
          <g key={i} className="animate-float" style={{ animationDelay: `${i * -0.9}s`, animationDuration: "9s" }}>
            <path
              d={`M200 ${y - 58} L338 ${y} L200 ${y + 58} L62 ${y} Z`}
              fill={active ? BLUE : "currentColor"}
              fillOpacity={active ? 0.92 : 0.05 + i * 0.015}
              stroke={active ? BLUE : "currentColor"}
              strokeOpacity={active ? 1 : 0.4}
            />
            {active ? null : <path d={`M131 ${y - 29} L269 ${y + 29}`} stroke="currentColor" strokeOpacity="0.14" />}
          </g>
        );
      })}
      <line x1="200" y1="40" x2="200" y2="372" stroke="currentColor" strokeOpacity="0.25" strokeDasharray="2 6" />
      <circle cx="200" cy="40" r="3" fill="currentColor" fillOpacity="0.6" />
    </svg>
  );
}

/** GST: two records woven together, matched points lit where they agree. */
function Weave() {
  const rows = Array.from({ length: 9 }, (_, i) => i);
  const matches = [
    [1, 2],
    [3, 5],
    [4, 1],
    [6, 6],
    [7, 3],
  ];
  return (
    <svg viewBox="0 0 400 400" className="size-full overflow-visible">
      {rows.map((i) => (
        <path
          key={`a${i}`}
          d={`M40 ${60 + i * 35} C 140 ${40 + i * 35}, 260 ${80 + i * 35}, 360 ${60 + i * 35}`}
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.22"
        />
      ))}
      {rows.map((i) => (
        <path
          key={`b${i}`}
          d={`M${60 + i * 35} 40 C ${40 + i * 35} 140, ${80 + i * 35} 260, ${60 + i * 35} 360`}
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.22"
        />
      ))}
      {matches.map(([c, r], i) => (
        <g key={i}>
          <circle cx={60 + c * 35} cy={60 + r * 35} r="14" fill={BLUE} fillOpacity="0.14" />
          <circle cx={60 + c * 35} cy={60 + r * 35} r="5" fill={BLUE} />
        </g>
      ))}
      <path
        d="M95 130 L165 235 L200 95 L270 270 L305 165"
        fill="none"
        stroke={BLUE}
        strokeWidth="1.5"
        strokeDasharray="4 6"
        className="animate-dash"
      />
    </svg>
  );
}

/** Project reports: a structure rising floor by floor from a drawn plan. */
function Blueprint() {
  const blocks = [
    { x: 70, h: 70 },
    { x: 130, h: 120 },
    { x: 190, h: 175 },
    { x: 250, h: 235 },
  ];
  return (
    <svg viewBox="0 0 400 400" className="size-full overflow-visible">
      {Array.from({ length: 11 }, (_, i) => (
        <line key={i} x1="30" y1={40 + i * 32} x2="370" y2={40 + i * 32} stroke="currentColor" strokeOpacity="0.07" />
      ))}
      <line x1="30" y1="330" x2="370" y2="330" stroke="currentColor" strokeOpacity="0.5" />
      {blocks.map((b, i) => {
        const top = 330 - b.h;
        const last = i === blocks.length - 1;
        return (
          <g key={b.x}>
            <path
              d={`M${b.x} ${top} l20 -14 h50 l-20 14 z`}
              fill={last ? BLUE : "currentColor"}
              fillOpacity={last ? 0.95 : 0.14}
            />
            <path
              d={`M${b.x + 50} ${top} l20 -14 v${b.h} l-20 14 z`}
              fill="currentColor"
              fillOpacity={last ? 0.3 : 0.08}
              stroke="currentColor"
              strokeOpacity="0.3"
            />
            <rect
              x={b.x}
              y={top}
              width="50"
              height={b.h}
              fill="currentColor"
              fillOpacity={last ? 0.12 : 0.04}
              stroke="currentColor"
              strokeOpacity="0.55"
            />
          </g>
        );
      })}
      <path
        d="M40 300 L95 260 L155 210 L215 150 L275 90 L350 40"
        fill="none"
        stroke={BLUE}
        strokeWidth="1.5"
        strokeDasharray="4 6"
        className="animate-dash"
      />
      <circle cx="350" cy="40" r="5" fill={BLUE} className="animate-pulse-dot" />
    </svg>
  );
}

/** Advisory: contour lines resolving toward a single bright point ahead. */
function Horizon() {
  const lines = Array.from({ length: 12 }, (_, i) => i);
  return (
    <svg viewBox="0 0 400 400" className="size-full overflow-visible">
      <defs>
        <radialGradient id="hz-sun" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor={BLUE} stopOpacity="0.85" />
          <stop offset="1" stopColor={BLUE} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="270" cy="150" r="90" fill="url(#hz-sun)" />
      <circle cx="270" cy="150" r="7" fill="#fff" />
      {lines.map((i) => {
        const y = 175 + i * 18;
        const amp = 26 - i * 1.6;
        return (
          <path
            key={i}
            d={`M20 ${y} C 110 ${y - amp}, 180 ${y + amp}, 260 ${y - amp / 2} S 360 ${y - amp}, 380 ${y}`}
            fill="none"
            stroke="currentColor"
            strokeOpacity={0.5 - i * 0.035}
          />
        );
      })}
      <line x1="20" y1="160" x2="380" y2="160" stroke="currentColor" strokeOpacity="0.18" />
    </svg>
  );
}

/** Accounting: a field of cells settling into perfect order. */
function Lattice() {
  const size = 8;
  const cells = Array.from({ length: size * size }, (_, i) => i);
  const lit = new Set([10, 19, 28, 37, 46, 21, 42, 53]);
  return (
    <svg viewBox="0 0 400 400" className="size-full overflow-visible">
      <g transform="translate(200 200) rotate(-12) translate(-160 -160)">
        {cells.map((i) => {
          const c = i % size;
          const r = Math.floor(i / size);
          const on = lit.has(i);
          return (
            <rect
              key={i}
              x={c * 40 + 6}
              y={r * 40 + 6}
              width="28"
              height="28"
              rx="5"
              fill={on ? BLUE : "currentColor"}
              fillOpacity={on ? 0.95 : 0.05 + ((c + r) % 3) * 0.03}
              stroke="currentColor"
              strokeOpacity={on ? 0 : 0.18}
            />
          );
        })}
        <path d="M46 46 L286 286" stroke="currentColor" strokeOpacity="0.35" strokeDasharray="2 6" />
      </g>
    </svg>
  );
}

const visuals: Record<VisualKind, () => React.JSX.Element> = {
  lens: Lens,
  strata: Strata,
  weave: Weave,
  blueprint: Blueprint,
  horizon: Horizon,
  lattice: Lattice,
};
