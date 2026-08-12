import { FadeUp } from "@/components/motion/FadeUp";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata = {
  title: "Terms of Service",
  description: "CitrusV terms of service template.",
};

export default function TermsPage() {
  return (
    <div className="container-citrus py-16 lg:py-24">
      <SectionHeading
        eyebrow="Legal"
        title="Terms of Service"
        description="Template terms — have legal counsel review before relying on them."
        className="mb-12"
      />
      <FadeUp className="max-w-3xl space-y-8 text-muted">
        <section>
          <h2 className="text-lg font-bold text-navy dark:text-white">Agreement</h2>
          <p className="mt-2 text-sm leading-relaxed">
            By accessing citrusv.com or engaging CitrusV for services, you agree to these template
            terms and any signed statement of work that governs a specific project.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-navy dark:text-white">Services</h2>
          <p className="mt-2 text-sm leading-relaxed">
            Scope, timelines, fees, and deliverables are defined in writing. Change requests may
            affect schedule and cost.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-navy dark:text-white">Limitation of liability</h2>
          <p className="mt-2 text-sm leading-relaxed">
            To the extent permitted by law, CitrusV is not liable for indirect or consequential
            damages. Total liability is limited to fees paid for the relevant engagement.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-navy dark:text-white">Contact</h2>
          <p className="mt-2 text-sm leading-relaxed">
            Reach us via the contact form or LinkedIn (see site footer).
          </p>
        </section>
        <p className="text-xs text-muted">Last updated: June 2025 (template).</p>
      </FadeUp>
    </div>
  );
}
