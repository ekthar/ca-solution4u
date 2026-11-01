"use client";

import { m, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { createElement, useRef } from "react";
import { cn } from "@/lib/utils";

type Props = {
  text: string;
  as?: "h2" | "p";
  id?: string;
  className?: string;
  /** Opacity of words not yet reached. */
  dim?: number;
};

/**
 * Words brighten one after another as the block scrolls through the
 * viewport. Opacity only, so it stays on the compositor. Reduced motion
 * shows the full sentence at once.
 */
export function ScrollWords({ text, as = "h2", id, className, dim = 0.14 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const lines = text.split("\n");
  const words = lines.map((line) => line.split(" "));
  const total = words.reduce((sum, line) => sum + line.length, 0);
  const lineOffsets = words.map((_, i) => words.slice(0, i).reduce((sum, line) => sum + line.length, 0));

  // The ref sits on a wrapper so the heading tag can stay dynamic.
  return (
    <div ref={ref}>
      {createElement(
        as,
        { id, className: cn(className) },
        <>
          <span className="sr-only">{lines.join(" ")}</span>
          <span aria-hidden>
            {words.map((line, lineIndex) => (
              <span key={lineIndex} className="block">
                {line.map((word, wordIndex) => {
                  const position = lineOffsets[lineIndex] + wordIndex;
                  const start = position / total;
                  const end = (position + 1) / total;
                  return (
                    <Word
                      key={`${word}-${wordIndex}`}
                      progress={scrollYProgress}
                      range={[start, end]}
                      dim={reduce ? 1 : dim}
                    >
                      {word}
                    </Word>
                  );
                })}
              </span>
            ))}
          </span>
        </>,
      )}
    </div>
  );
}

function Word({
  children,
  progress,
  range,
  dim,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  dim: number;
}) {
  const opacity = useTransform(progress, range, [dim, 1]);
  return (
    <>
      <m.span style={{ opacity }} className="inline-block">
        {children}
      </m.span>{" "}
    </>
  );
}
