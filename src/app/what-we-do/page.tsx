"use client";

import Link from "next/link";
import {
  Cloud,
  Code,
  Globe,
  Headset,
  Megaphone,
  Sparkles,
  ChevronDown,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import services from "@/content/services.json";
import { FadeUp } from "@/components/motion/FadeUp";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  globe: Globe,
  code: Code,
  headset: Headset,
  cloud: Cloud,
  megaphone: Megaphone,
  sparkles: Sparkles,
};

const steps = [
  {
    title: "Discover",
    detail: "Goals, users, constraints, and success metrics — aligned in a short workshop.",
  },
  {
    title: "Design & plan",
    detail: "Architecture, UX, and a delivery roadmap with clear milestones.",
  },
  {
    title: "Build & integrate",
    detail: "Iterative development with reviews, QA, and staging you can touch.",
  },
  {
    title: "Launch & support",
    detail: "Go-live, monitoring, IT handoff, and ongoing improvements.",
  },
];

const faqs = [
  {
    q: "How long does a typical website or software project take?",
    a: "Marketing sites often ship in 4–8 weeks. Custom software and portals depend on scope — we map a milestone plan in discovery so timelines stay honest.",
  },
  {
    q: "Do we own the code and assets?",
    a: "Yes. Deliverables and IP ownership are defined in the agreement. We hand off repositories, credentials, and documentation at launch.",
  },
  {
    q: "What does ongoing IT support look like?",
    a: "We offer monitoring, updates, backups, and helpdesk-style support with clear response expectations. Scope is tailored to your stack and risk profile.",
  },
  {
    q: "How do you use AI with clients?",
    a: "Practically — assistants, automation, and content aids where they save time. We avoid hype features that add risk without value, and we document data handling.",
  },
  {
    q: "How do engagements start?",
    a: "Book a call. We discuss goals and constraints, then propose a scoped next step — often a discovery workshop or fixed-scope pilot.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[var(--border-subtle)]">
      <button
        type="button"
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="font-semibold text-navy dark:text-white">{q}</span>
        <ChevronDown
          className={cn(
            "h-5 w-5 shrink-0 text-brand-blue transition-transform",
            open && "rotate-180",
          )}
          aria-hidden
        />
      </button>
      {open ? <p className="pb-5 text-sm leading-relaxed text-muted">{a}</p> : null}
    </div>
  );
}

export default function WhatWeDoPage() {
  return (
    <div className="container-citrus py-16 lg:py-24">
      <SectionHeading
        eyebrow="What we do"
        title="Digital products and IT that"
        highlight="keep you moving"
        description="We design and build websites and software, then support the stack — cloud, security, marketing, and AI — so you get outcomes, not orphaned tools."
        className="mb-10"
      />
      <FadeUp className="mb-16 flex flex-wrap gap-3">
        <Button href="/book" size="lg">
          Book a call
        </Button>
        <Button href="/work" variant="ghost" size="lg">
          See our work
        </Button>
      </FadeUp>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="mb-24 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {services.map((service, i) => {
          const Icon = iconMap[service.icon] ?? Sparkles;
          return (
            <FadeUp key={service.title} delay={i * 0.05}>
              <Card className="h-full">
                <Icon className="mb-4 h-8 w-8 text-brand-blue" aria-hidden />
                <h3 className="text-lg font-bold text-navy dark:text-white">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{service.description}</p>
                <p className="mt-4 text-xs font-medium text-brand-blue">
                  Outcome-focused delivery · Book to scope
                </p>
              </Card>
            </FadeUp>
          );
        })}
      </motion.div>

      <SectionHeading
        eyebrow="Engagement"
        title="How we work"
        highlight="with you"
        description="A transparent timeline from first call to long-term support."
        className="mb-12"
      />

      <div className="relative mb-24 max-w-3xl">
        <div
          className="absolute bottom-2 left-[11px] top-2 w-px bg-gradient-to-b from-brand-blue via-brand-orange to-transparent md:left-1/2 md:-translate-x-px"
          aria-hidden
        />
        <motion.ol
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-10"
        >
          {steps.map((step, index) => (
            <motion.li
              key={step.title}
              variants={fadeUp}
              className="relative grid gap-4 md:grid-cols-2 md:gap-8"
            >
              <div
                className={`md:text-right ${index % 2 === 1 ? "md:order-2 md:text-left" : ""}`}
              >
                <span className="inline-flex items-center gap-3">
                  <span className="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-blue text-xs font-bold text-white">
                    {index + 1}
                  </span>
                  <h3 className="text-lg font-bold text-navy dark:text-white">{step.title}</h3>
                </span>
              </div>
              <p
                className={`pl-9 text-sm leading-relaxed text-muted md:pl-0 ${index % 2 === 1 ? "md:order-1 md:pr-8 md:text-right" : "md:pl-8"}`}
              >
                {step.detail}
              </p>
            </motion.li>
          ))}
        </motion.ol>
      </div>

      <SectionHeading
        eyebrow="FAQ"
        title="Common"
        highlight="questions"
        description="Straight answers buyers ask before they book a call."
        className="mb-8"
      />
      <FadeUp className="mx-auto mb-16 max-w-2xl">
        {faqs.map((item) => (
          <FaqItem key={item.q} q={item.q} a={item.a} />
        ))}
      </FadeUp>

      <FadeUp className="rounded-3xl bg-navy p-10 text-center text-white">
        <h2 className="text-2xl font-bold">Let&apos;s scope your next step</h2>
        <p className="mx-auto mt-3 max-w-lg text-slate-400">
          Prefer email?{" "}
          <Link href="/contact" className="text-brand-orange underline-offset-2 hover:underline">
            Contact us
          </Link>
          . Or book a Meet and we&apos;ll map options live.
        </p>
        <Button href="/book" size="lg" className="mt-6">
          Book a call
        </Button>
      </FadeUp>
    </div>
  );
}
