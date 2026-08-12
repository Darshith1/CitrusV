import Link from "next/link";
import { FadeUp } from "@/components/motion/FadeUp";
import { Button } from "@/components/ui/Button";
import { GradientText } from "@/components/ui/GradientText";

export default function NotFound() {
  return (
    <div className="container-citrus flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <FadeUp>
        <p className="text-8xl font-bold tracking-tighter text-navy/10 dark:text-white/10">404</p>
        <h1 className="mt-2 text-3xl font-bold text-navy dark:text-white">
          Page not <GradientText as="span">found</GradientText>
        </h1>
        <p className="mt-4 max-w-md text-muted">
          The link may be outdated or mistyped. Head home or book a call — we&apos;ll get you
          pointed in the right direction.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button href="/" size="lg">
            Back to home
          </Button>
          <Button href="/book" variant="ghost" size="lg">
            Book a call
          </Button>
        </div>
        <Link href="/contact" className="mt-6 inline-block text-sm text-brand-blue hover:underline">
          Contact support
        </Link>
      </FadeUp>
    </div>
  );
}
