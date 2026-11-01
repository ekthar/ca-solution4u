import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/primitives";

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] items-center bg-obsidian text-white">
      <Container className="pt-24">
        <p className="font-mono text-xs tracking-[0.2em] text-grey uppercase">Error 404</p>
        <h1 className="mt-6 max-w-[14ch] font-display text-display-lg font-semibold">This page is not on the map.</h1>
        <p className="mt-6 max-w-md text-lead text-white/60">The link may be old, or the page may have moved.</p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button href="/" variant="solid-light">
            Back to home
          </Button>
          <Button href="/contact" variant="ghost-light" arrow={false}>
            Contact us
          </Button>
        </div>
      </Container>
    </section>
  );
}
