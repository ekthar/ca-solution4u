import { cn } from "@/lib/utils";

/**
 * CA SOLUTION4U wordmark. A small prism mark plus set type.
 * The "4U" is weighted to read as the brand promise.
 */
export function Wordmark({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5 font-display", className)}>
      <BrandMark className="size-7 shrink-0" />
      <span className="flex items-baseline text-[1.02rem] leading-none tracking-[-0.03em]">
        <span className="font-semibold">CA</span>
        <span className={cn("ml-1.5 font-medium", compact && "max-sm:hidden")}>
          SOLUTION<span className="font-bold">4U</span>
        </span>
      </span>
    </span>
  );
}

/** Prism mark: two offset glass facets meeting on a bright edge. */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden focusable="false">
      <rect width="32" height="32" rx="8" fill="currentColor" opacity="0.1" />
      <path d="M8 23 16 7l3.2 6.4L13.6 23z" fill="currentColor" />
      <path d="M16.8 23 21 14.6 24 23z" fill="#527bff" />
    </svg>
  );
}
