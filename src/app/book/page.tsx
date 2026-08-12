import { Calendar, CheckCircle2, Clock, ListChecks, Mail, Video } from "lucide-react";
import { FadeUp } from "@/components/motion/FadeUp";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  CONTACT_EMAIL,
  GOOGLE_APPOINTMENTS_URL,
  bookCallMailto,
  googleAppointmentsEmbedUrl,
} from "@/lib/site";

export const metadata = {
  title: "Book a call",
  description: "Schedule a Google Meet strategy call with CitrusV.",
};

const agenda = [
  "Your goals, timeline, and constraints",
  "Whether website, software, IT, or marketing is the right first step",
  "A clear recommendation and next actions — no hard sell",
];

export default function BookPage() {
  const appointmentsUrl = GOOGLE_APPOINTMENTS_URL;
  const embedUrl = googleAppointmentsEmbedUrl();

  return (
    <div className="container-citrus py-16 lg:py-24">
      <SectionHeading
        eyebrow="Book"
        title="Strategy call with"
        highlight="CitrusV"
        description={
          appointmentsUrl
            ? "Pick a time below. You’ll get a Google Meet link in the calendar invite automatically."
            : "Request a time by email — we’ll confirm and send a Google Meet link."
        }
        align="center"
        className="mb-12"
      />

      <div
        className={
          appointmentsUrl
            ? "mx-auto grid max-w-5xl gap-8 lg:grid-cols-[0.9fr_1.2fr]"
            : "mx-auto grid max-w-4xl gap-8 lg:grid-cols-[1fr_1.1fr]"
        }
      >
        <FadeUp>
          <ul className="space-y-4 rounded-3xl border border-[var(--border-subtle)] bg-surface/60 p-8">
            <li className="flex gap-3 text-sm text-muted">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" aria-hidden />
              <span>
                <strong className="text-navy">Duration:</strong> 30–45 minutes
              </span>
            </li>
            <li className="flex gap-3 text-sm text-muted">
              <Video className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" aria-hidden />
              <span>
                <strong className="text-navy">Format:</strong> Google Meet
              </span>
            </li>
            <li className="flex gap-3 text-sm text-muted">
              <ListChecks className="mt-0.5 h-5 w-5 shrink-0 text-brand-orange" aria-hidden />
              <div>
                <strong className="text-navy">We’ll cover</strong>
                <ul className="mt-2 space-y-2">
                  {agenda.map((item) => (
                    <li key={item} className="flex gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </FadeUp>

        <FadeUp>
          <div className="overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-gradient-to-br from-brand-blue/10 to-brand-orange/10">
            {appointmentsUrl && embedUrl ? (
              <div className="p-4 sm:p-6">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3 px-1">
                  <p className="text-sm text-muted">
                    <Video className="mr-1.5 inline h-4 w-4 text-brand-blue" aria-hidden />
                    Direct Google Meet booking · {CONTACT_EMAIL}
                  </p>
                  <Button
                    href={appointmentsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="ghost"
                    size="sm"
                  >
                    <Calendar className="h-4 w-4" aria-hidden />
                    Open in Google
                  </Button>
                </div>
                <iframe
                  src={embedUrl}
                  title="Book a Google Meet with CitrusV"
                  className="h-[640px] w-full rounded-2xl bg-white"
                  loading="lazy"
                />
              </div>
            ) : (
              <div className="p-10 text-center">
                <Video className="mx-auto h-12 w-12 text-brand-blue" aria-hidden />
                <p className="mt-4 text-muted">
                  Remote-friendly · No obligation · Google Meet after we confirm
                </p>
                <p className="mt-2 text-sm text-muted">
                  Reach us at{" "}
                  <a
                    href={bookCallMailto()}
                    className="font-medium text-brand-blue hover:underline"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </p>
                <Button
                  href={bookCallMailto()}
                  size="lg"
                  className="mt-8 w-full justify-center"
                >
                  <Mail className="h-4 w-4" aria-hidden />
                  Email to book a Meet
                </Button>
                <Button href="/contact" variant="ghost" className="mt-4 w-full justify-center">
                  Prefer the contact form
                </Button>
              </div>
            )}
          </div>
        </FadeUp>
      </div>
    </div>
  );
}
