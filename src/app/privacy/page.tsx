import { FadeUp } from "@/components/motion/FadeUp";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata = {
  title: "Privacy Policy",
  description: "CitrusV privacy policy template.",
};

export default function PrivacyPage() {
  return (
    <div className="container-citrus py-16 lg:py-24">
      <SectionHeading
        eyebrow="Legal"
        title="Privacy Policy"
        description="Template policy — replace with counsel-reviewed language before production use."
        className="mb-12"
      />
      <FadeUp className="prose-citrus max-w-3xl space-y-8 text-muted">
        <section>
          <h2 className="text-lg font-bold text-navy dark:text-white">Overview</h2>
          <p className="mt-2 text-sm leading-relaxed">
            CitrusV (&quot;we&quot;, &quot;us&quot;) respects your privacy. This template describes
            how we may collect, use, and protect information when you visit our website or use our
            services.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-navy dark:text-white">Information we collect</h2>
          <p className="mt-2 text-sm leading-relaxed">
            We may collect contact details you submit (name, email, message content), usage data
            such as pages visited and device type, and cookies used for analytics and site
            functionality.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-navy dark:text-white">How we use information</h2>
          <p className="mt-2 text-sm leading-relaxed">
            To respond to inquiries, provide services, improve our website, and comply with legal
            obligations. We do not sell personal information.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-navy dark:text-white">Contact</h2>
          <p className="mt-2 text-sm leading-relaxed">
            Questions about this policy: use the contact form or LinkedIn from the site footer.
          </p>
        </section>
        <p className="text-xs text-muted">Last updated: June 2025 (template).</p>
      </FadeUp>
    </div>
  );
}
