import { FadeUp } from "@/components/motion/FadeUp";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata = {
  title: "About",
  description: "Mission, values, and the team behind CitrusV.",
};

const values = [
  {
    title: "Clarity first",
    body: "We translate complex technology into decisions you can act on — no jargon walls.",
  },
  {
    title: "Craft & care",
    body: "Polished experiences and reliable systems, because your brand deserves both.",
  },
  {
    title: "Partnership",
    body: "We embed with your team, share context, and stay accountable after launch.",
  },
];

export default function AboutPage() {
  return (
    <div className="container-citrus py-16 lg:py-24">
      <SectionHeading
        eyebrow="About CitrusV"
        title="We help businesses"
        highlight="show up online"
        description="CitrusV combines website development, custom software, and IT support so you can focus on growth — not firefighting."
        className="mb-16"
      />

      <FadeUp className="mb-20 max-w-3xl">
        <h2 className="text-2xl font-bold text-navy">Our mission</h2>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          Make premium digital and IT capability accessible to teams who need results, not slide
          decks. We build what you ship, maintain what you rely on, and improve it as you scale.
        </p>
      </FadeUp>

      <SectionHeading eyebrow="Values" title="How we work" className="mb-10" />
      <div className="mb-20 grid gap-6 md:grid-cols-3">
        {values.map((v, i) => (
          <FadeUp key={v.title} delay={i * 0.06}>
            <Card className="h-full">
              <h3 className="text-lg font-bold text-navy">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{v.body}</p>
            </Card>
          </FadeUp>
        ))}
      </div>

      <FadeUp>
        <div className="rounded-3xl border border-[var(--border-subtle)] bg-surface/80 p-8 text-center lg:p-12">
          <h2 className="text-2xl font-bold text-navy">Meet the team</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted">
            We&apos;re a remote-friendly studio. Team bios and photos will appear here as we publish
            them — until then, talk to us directly.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button href="/careers">View careers</Button>
            <Button href="/book" variant="ghost">
              Book a call
            </Button>
          </div>
        </div>
      </FadeUp>
    </div>
  );
}
