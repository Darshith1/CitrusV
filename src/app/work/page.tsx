import work from "@/content/work.json";
import { FadeUp } from "@/components/motion/FadeUp";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Work",
  description: "Selected CitrusV case studies — websites, software, and IT outcomes.",
};

export default function WorkPage() {
  return (
    <div className="container-citrus py-16 lg:py-24">
      <SectionHeading
        eyebrow="Work"
        title="Case studies that show"
        highlight="how we deliver"
        description="Illustrative engagements based on typical CitrusV scopes. Replace with your live client stories when ready."
        className="mb-16"
      />

      <div className="space-y-10">
        {work.map((item, i) => (
          <FadeUp key={item.slug} delay={i * 0.06}>
            <Card className="overflow-hidden p-0">
              <div className="grid gap-0 lg:grid-cols-[1fr_1.1fr]">
                <div className="bg-gradient-to-br from-brand-blue/15 via-navy/5 to-brand-orange/15 p-8 lg:p-10">
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand-orange">
                    {item.industry}
                  </p>
                  <h2 className="mt-3 text-2xl font-bold text-navy dark:text-white">{item.title}</h2>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {item.stack.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-[var(--border-subtle)] bg-white/80 px-3 py-1 text-xs font-medium text-navy dark:bg-navy/50 dark:text-slate-200"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-5 p-8 lg:p-10">
                  <div>
                    <h3 className="text-sm font-semibold text-navy dark:text-white">Challenge</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{item.challenge}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-navy dark:text-white">Outcome</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{item.outcome}</p>
                  </div>
                  <ul className="grid gap-2 sm:grid-cols-3">
                    {item.results.map((r) => (
                      <li
                        key={r}
                        className="rounded-xl bg-surface px-3 py-2 text-xs font-medium text-navy dark:text-slate-200"
                      >
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          </FadeUp>
        ))}
      </div>

      <FadeUp className="mt-16 rounded-3xl bg-navy p-10 text-center text-white">
        <h2 className="text-2xl font-bold">Have a similar challenge?</h2>
        <p className="mx-auto mt-3 max-w-lg text-slate-400">
          Tell us about your website, product, or IT goals — we&apos;ll outline a clear path
          forward.
        </p>
        <Button href="/book" size="lg" className="mt-6">
          Book a call
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Button>
      </FadeUp>
    </div>
  );
}
