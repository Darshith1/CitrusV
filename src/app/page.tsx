"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  Cloud,
  Code,
  Globe,
  Headset,
  Sparkles,
  Wrench,
} from "lucide-react";
import services from "@/content/services.json";
import work from "@/content/work.json";
import { AnimatedGradient } from "@/components/motion/AnimatedGradient";
import { FadeUp } from "@/components/motion/FadeUp";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { GradientText } from "@/components/ui/GradientText";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { staggerContainer } from "@/lib/motion";
import { bookCallHref, bookCallIsExternal } from "@/lib/site";

const industries = [
  "Transportation",
  "Healthcare",
  "Retail",
  "Finance",
  "Manufacturing",
  "Education",
];

const pillars = [
  {
    title: "Websites & product design",
    description: "Brand-led sites and web apps that convert and perform.",
    href: "/what-we-do",
    icon: Globe,
  },
  {
    title: "Custom software",
    description: "Internal tools, APIs, and platforms built around your workflows.",
    href: "/what-we-do",
    icon: Code,
  },
  {
    title: "IT solutions & support",
    description: "Reliable infrastructure, security, and help when you need it.",
    href: "/what-we-do",
    icon: Headset,
  },
  {
    title: "Cloud, marketing & AI",
    description: "DevOps, growth campaigns, and AI features that earn their place.",
    href: "/what-we-do",
    icon: Cloud,
  },
];

const process = [
  { title: "Discover", detail: "Goals, constraints, and success metrics." },
  { title: "Design", detail: "UX, architecture, and a clear roadmap." },
  { title: "Build", detail: "Iterative delivery with reviews and QA." },
  { title: "Launch", detail: "Go-live, monitoring, and handoff." },
  { title: "Support", detail: "Ongoing IT and continuous improvement." },
];

function IndustriesStrip() {
  const items = [...industries, ...industries];
  const reduce = useReducedMotion();

  return (
    <div className="relative overflow-hidden border-y border-[var(--border-subtle)] bg-surface/80 py-6 sm:py-8">
      <motion.div
        className="flex w-max gap-8 px-4 sm:gap-12 sm:px-6"
        animate={reduce ? undefined : { x: ["0%", "-50%"] }}
        transition={
          reduce ? undefined : { duration: 40, repeat: Infinity, ease: "linear" }
        }
      >
        {items.map((name, i) => (
          <div
            key={`${name}-${i}`}
            className="flex shrink-0 items-center gap-3 text-sm font-semibold text-navy/70"
          >
            <Sparkles className="h-4 w-4 text-brand-orange" aria-hidden />
            {name}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <AnimatedGradient className="border-b border-[var(--border-subtle)]">
        <section className="container-citrus relative py-16 sm:py-24 lg:py-32">
          <FadeUp className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-brand-blue sm:mb-4 sm:text-xs sm:tracking-[0.25em]">
              Design · Software · IT
            </p>
            <h1 className="text-balance text-[1.85rem] font-bold leading-[1.15] tracking-tight text-navy sm:text-5xl lg:text-6xl">
              <GradientText as="span">CitrusV</GradientText> builds websites, software, and IT
              systems that grow with your business.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted sm:mt-6 sm:text-lg">
              One partner for digital products, reliable infrastructure, and practical AI — from
              first launch through long-term support.
            </p>
            <div className="cta-row mx-auto mt-8 max-w-md sm:mt-10 sm:max-w-none">
              <Button
                href={bookCallHref()}
                size="lg"
                className="w-full sm:w-auto"
                {...(bookCallIsExternal()
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                Book a call
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
              <Button href="/work" variant="secondary" size="lg" className="w-full sm:w-auto">
                See our work
              </Button>
            </div>
          </FadeUp>
        </section>
      </AnimatedGradient>

      <section className="py-5 sm:py-6">
        <FadeUp>
          <p className="container-citrus mb-3 text-center text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-muted sm:mb-4 sm:text-xs">
            Industries we serve
          </p>
        </FadeUp>
        <IndustriesStrip />
      </section>

      <section className="container-citrus py-14 sm:py-20 lg:py-28">
        <SectionHeading
          eyebrow="Work"
          title="Outcomes that"
          highlight="matter"
          description="Selected engagements that show how we turn messy ops and outdated sites into systems people rely on."
          align="center"
          className="mb-10 sm:mb-14"
        />
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {work.slice(0, 3).map((item, i) => (
            <FadeUp key={item.slug} delay={i * 0.06}>
              <Card href="/work" className="h-full" linkLabel={`${item.title} case study`}>
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-orange">
                  {item.industry}
                </p>
                <h3 className="mt-3 text-lg font-bold text-navy">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.outcome}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-blue">
                  View case studies <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </span>
              </Card>
            </FadeUp>
          ))}
        </div>
      </section>

      <section className="bg-surface/60 py-14 sm:py-20 lg:py-28">
        <div className="container-citrus">
          <SectionHeading
            eyebrow="Capabilities"
            title="What we"
            highlight="deliver"
            description="Design, engineering, and IT under one roof — coordinated for clarity and speed."
            align="center"
            className="mb-10 sm:mb-14"
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {pillars.map((item, index) => {
              const Icon = item.icon;
              return (
                <FadeUp key={item.title} delay={index * 0.05}>
                  <Card href={item.href} className="h-full" linkLabel={item.title}>
                    <div className="mb-4 inline-flex rounded-xl bg-brand-blue/10 p-3">
                      <Icon className="h-6 w-6 text-brand-blue" aria-hidden />
                    </div>
                    <h3 className="text-lg font-bold text-navy">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
                  </Card>
                </FadeUp>
              );
            })}
          </motion.div>
          <FadeUp className="mt-8 text-center sm:mt-10">
            <Button href="/what-we-do" variant="ghost" size="lg" className="w-full sm:w-auto">
              Explore all services
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
          </FadeUp>
        </div>
      </section>

      <section className="container-citrus py-14 sm:py-20 lg:py-28">
        <SectionHeading
          eyebrow="Process"
          title="How we"
          highlight="work"
          description="A transparent path from first conversation to launch and ongoing support."
          align="center"
          className="mb-10 sm:mb-14"
        />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-5">
          {process.map((step, i) => (
            <FadeUp key={step.title} delay={i * 0.05}>
              <div className="flex gap-4 rounded-2xl border border-[var(--border-subtle)] bg-white p-4 sm:block sm:p-5">
                <span className="text-xs font-bold text-brand-orange">0{i + 1}</span>
                <div className="sm:mt-2">
                  <h3 className="font-bold text-navy">{step.title}</h3>
                  <p className="mt-1 text-sm text-muted">{step.detail}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      <section className="border-y border-[var(--border-subtle)] bg-navy py-12 text-slate-100 sm:py-16 lg:py-20">
        <div className="container-citrus">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <FadeUp>
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-brand-orange sm:text-xs">
                CitrusV Lab
              </p>
              <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">Try what we build</h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-400 sm:text-base">
                Free tools, Citrus AI, and Playzone experiments — a secondary playground that shows
                how we ship. When you need a partner for your business, book a call.
              </p>
            </FadeUp>
            <FadeUp className="cta-row sm:flex-row sm:justify-start lg:justify-end">
              <Button href="/tools" variant="secondary" size="lg" className="w-full sm:w-auto">
                <Wrench className="h-4 w-4" aria-hidden />
                Tools
              </Button>
              <Button href="/citrus-ai" variant="secondary" size="lg" className="w-full sm:w-auto">
                <Bot className="h-4 w-4" aria-hidden />
                Citrus AI
              </Button>
            </FadeUp>
          </div>
        </div>
      </section>

      <section className="container-citrus py-12 sm:py-16 lg:py-20">
        <FadeUp>
          <div className="flex flex-col items-stretch justify-between gap-6 rounded-2xl border border-[var(--border-subtle)] bg-gradient-to-br from-brand-blue/10 via-white to-brand-orange/10 p-6 sm:flex-row sm:items-center sm:rounded-3xl sm:p-8 lg:p-10">
            <div>
              <h2 className="text-xl font-bold text-navy sm:text-2xl">Join the team</h2>
              <p className="mt-2 max-w-lg text-sm text-muted sm:text-base">
                We&apos;re hiring builders who care about craft, clarity, and clients.
              </p>
            </div>
            <Button href="/careers" size="lg" className="w-full shrink-0 sm:w-auto">
              View careers
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
          </div>
        </FadeUp>
      </section>

      <section className="container-citrus pb-16 sm:pb-20 lg:pb-28">
        <FadeUp>
          <div className="rounded-2xl bg-navy p-7 text-center text-white sm:rounded-3xl sm:p-10 lg:p-14">
            <h2 className="text-2xl font-bold sm:text-3xl">Ready to talk business?</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-slate-400 sm:mt-4 sm:text-base">
              Book a 30–45 minute Google Meet. We&apos;ll map goals, constraints, and a clear next
              step — no hard sell.
            </p>
            <div className="cta-row mx-auto mt-7 max-w-md sm:mt-8 sm:max-w-none">
              <Button
                href={bookCallHref()}
                size="lg"
                className="w-full sm:w-auto"
                {...(bookCallIsExternal()
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                Book a call
              </Button>
              <Button href="/contact" variant="secondary" size="lg" className="w-full sm:w-auto">
                Contact us
              </Button>
            </div>
          </div>
        </FadeUp>
      </section>

      <section className="sr-only" aria-hidden>
        {services.map((s) => (
          <span key={s.title}>{s.title}</span>
        ))}
      </section>
    </>
  );
}
