"use client";

import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  CheckCircle2,
  GraduationCap,
  HeartHandshake,
  Laptop,
  Rocket,
} from "lucide-react";
import careers from "@/content/careers.json";
import { FadeUp } from "@/components/motion/FadeUp";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";

const cultureIcons = [Rocket, Laptop, HeartHandshake, GraduationCap];

export default function CareersContent() {
  const jobs = careers.jobs ?? [];

  return (
    <div>
      <section className="border-b border-[var(--border-subtle)] bg-gradient-to-br from-brand-blue/10 via-white to-brand-orange/10 dark:from-brand-blue/20 dark:via-navy dark:to-brand-orange/10">
        <div className="container-citrus py-16 lg:py-24">
          <FadeUp className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-brand-blue">
              Careers
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-navy sm:text-5xl dark:text-white">
              Build with CitrusV
            </h1>
            <p className="mt-5 text-lg text-muted">
              Join a remote-friendly team shipping websites, software, and IT systems that clients
              rely on every day.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button href="#open-roles" size="lg">
                View open roles
              </Button>
              <Button href="/contact?interest=Careers" variant="ghost" size="lg">
                General application
              </Button>
            </div>
          </FadeUp>
        </div>
      </section>

      <div className="container-citrus py-16 lg:py-24">
        <SectionHeading
          eyebrow="Culture"
          title="Why"
          highlight="CitrusV"
          description="We hire people who care about craft, clarity, and the clients who depend on what we ship."
          align="center"
          className="mb-12"
        />
        <div className="mb-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {careers.culture.map((item, i) => {
            const Icon = cultureIcons[i % cultureIcons.length];
            return (
              <FadeUp key={item.title} delay={i * 0.05}>
                <Card className="h-full">
                  <Icon className="mb-4 h-7 w-7 text-brand-orange" aria-hidden />
                  <h3 className="font-bold text-navy dark:text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
                </Card>
              </FadeUp>
            );
          })}
        </div>

        <SectionHeading eyebrow="Benefits" title="What we" highlight="offer" className="mb-10" />
        <FadeUp className="mb-20">
          <ul className="grid gap-4 sm:grid-cols-2">
            {careers.benefits.map((benefit) => (
              <li
                key={benefit}
                className="flex items-start gap-3 rounded-2xl border border-[var(--border-subtle)] bg-white px-4 py-3 text-sm text-muted dark:bg-navy-light/30"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-orange" aria-hidden />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </FadeUp>

        <SectionHeading
          eyebrow="Hiring"
          title="How we"
          highlight="hire"
          description="A clear process — respectful of your time."
          className="mb-10"
        />
        <div className="mb-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {careers.process.map((step, i) => (
            <FadeUp key={step.title} delay={i * 0.05}>
              <div className="rounded-2xl border border-[var(--border-subtle)] p-5">
                <span className="text-xs font-bold text-brand-blue">0{i + 1}</span>
                <h3 className="mt-2 font-bold text-navy dark:text-white">{step.title}</h3>
                <p className="mt-1 text-sm text-muted">{step.detail}</p>
              </div>
            </FadeUp>
          ))}
        </div>

        <div id="open-roles">
          <SectionHeading
            eyebrow="Open roles"
            title="Current"
            highlight="openings"
            className="mb-10"
          />
          {jobs.length === 0 ? (
            <FadeUp className="rounded-2xl border border-dashed border-[var(--border-subtle)] bg-surface/50 p-10 text-center">
              <Briefcase className="mx-auto h-10 w-10 text-brand-blue" aria-hidden />
              <h3 className="mt-4 text-xl font-bold text-navy dark:text-white">
                No open roles right now
              </h3>
              <p className="mx-auto mt-2 max-w-md text-sm text-muted">
                We&apos;re always interested in great people. Send a general application and
                we&apos;ll keep you in mind.
              </p>
              <Button href="/contact?interest=Careers" className="mt-6">
                Send general application
              </Button>
            </FadeUp>
          ) : (
            <div className="space-y-6">
              {jobs.map((job, i) => (
                <FadeUp key={job.slug} delay={i * 0.06}>
                  <Card className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-navy dark:text-white">{job.title}</h3>
                      <p className="mt-1 text-sm text-muted">
                        {job.department} · {job.location} · {job.type}
                      </p>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                        {job.description}
                      </p>
                    </div>
                    <Button
                      href={`/contact?interest=Careers&role=${encodeURIComponent(job.slug)}`}
                      variant="secondary"
                      className="shrink-0"
                    >
                      Apply
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </Button>
                  </Card>
                </FadeUp>
              ))}
            </div>
          )}
        </div>

        <p className="mt-16 text-center text-xs leading-relaxed text-muted">
          CitrusV is an equal opportunity employer. We evaluate applicants without regard to race,
          color, religion, sex, national origin, age, disability, veteran status, or any other
          protected characteristic.{" "}
          <Link href="/contact" className="text-brand-blue hover:underline">
            Questions? Contact us
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
