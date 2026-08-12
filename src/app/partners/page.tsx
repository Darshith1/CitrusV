import partners from "@/content/partners.json";
import { FadeUp } from "@/components/motion/FadeUp";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata = {
  title: "Partners & industries",
  description: "Industries CitrusV serves — illustrative examples until live client logos are added.",
};

export default function PartnersPage() {
  return (
    <div className="container-citrus py-16 lg:py-24">
      <SectionHeading
        eyebrow="Industries"
        title="Where we"
        highlight="deliver"
        description="Illustrative industry examples and sample outcomes. Swap in your real client logos and quotes when available — we don’t present placeholders as live logos."
        align="center"
        className="mb-10"
      />
      <FadeUp className="mb-14 text-center">
        <p className="inline-flex rounded-full border border-[var(--border-subtle)] bg-surface px-4 py-1.5 text-xs font-medium text-muted">
          Sample stories for demo purposes
        </p>
      </FadeUp>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {partners.map((partner, i) => (
          <FadeUp key={partner.name} delay={i * 0.05}>
            <Card className="flex h-full flex-col">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-blue">
                {partner.industry}
              </p>
              <h3 className="mt-2 text-xl font-bold text-navy dark:text-white">{partner.name}</h3>
              <blockquote className="mt-4 flex-1 border-l-2 border-brand-orange/40 pl-4 text-sm leading-relaxed text-muted">
                &ldquo;{partner.testimonial}&rdquo;
              </blockquote>
            </Card>
          </FadeUp>
        ))}
      </div>

      <FadeUp className="mt-16 text-center">
        <Button href="/book" size="lg">
          Book a call about your industry
        </Button>
      </FadeUp>
    </div>
  );
}
