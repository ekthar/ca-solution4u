/** Status pill used wherever N1 appears, so it is never mistaken for a released product. */
export function ComingSoon() {
  return (
    <p className="inline-flex items-center gap-2.5 rounded-full border border-white/14 bg-white/[0.04] px-4 py-2 font-mono text-[0.7rem] tracking-[0.24em] text-white/80 uppercase backdrop-blur">
      <span className="size-1.5 animate-pulse-dot rounded-full bg-blue" />
      Coming soon
    </p>
  );
}
