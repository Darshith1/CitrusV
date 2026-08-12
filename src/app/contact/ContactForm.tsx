"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Mail } from "lucide-react";
import careers from "@/content/careers.json";
import { FadeUp } from "@/components/motion/FadeUp";
import { Button } from "@/components/ui/Button";
import { CONTACT_EMAIL } from "@/lib/site";

const interests = [
  "Website",
  "Software",
  "IT Support",
  "Marketing",
  "Careers",
  "Citrus AI",
  "Partnership",
  "Other",
];

export default function ContactForm() {
  const searchParams = useSearchParams();
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);
  const [interest, setInterest] = useState("");
  const [message, setMessage] = useState("");

  const roleSlug = searchParams.get("role");
  const roleTitle = useMemo(() => {
    if (!roleSlug) return null;
    return careers.jobs.find((j) => j.slug === roleSlug)?.title ?? roleSlug;
  }, [roleSlug]);

  useEffect(() => {
    const fromQuery = searchParams.get("interest");
    if (fromQuery && interests.includes(fromQuery)) {
      setInterest(fromQuery);
    } else if (roleSlug) {
      setInterest("Careers");
    }
    if (roleTitle) {
      setMessage(`I'm applying for the ${roleTitle} role.\n\nBackground / links:\n`);
    }
  }, [searchParams, roleSlug, roleTitle]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const interestValue = String(data.get("interest") ?? "");
    const messageValue = String(data.get("message") ?? "");

    setPending(true);
    const subject = encodeURIComponent(
      roleTitle
        ? `CitrusV application — ${roleTitle}`
        : `CitrusV inquiry — ${interestValue}`,
    );
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nInterest: ${interestValue}${
        roleTitle ? `\nRole: ${roleTitle}` : ""
      }\n\n${messageValue}`,
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;

    window.setTimeout(() => {
      setPending(false);
      setSubmitted(true);
      form.reset();
      setInterest("");
      setMessage("");
    }, 600);
  }

  return (
    <FadeUp className="mx-auto max-w-xl">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="rounded-2xl border border-brand-blue/30 bg-brand-blue/5 p-10 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
            >
              <CheckCircle2 className="mx-auto h-14 w-14 text-brand-blue" aria-hidden />
            </motion.div>
            <h2 className="mt-4 text-xl font-bold text-navy dark:text-white">Message ready</h2>
            <p className="mt-2 text-sm text-muted">
              If your email app didn&apos;t open, write us at {CONTACT_EMAIL} directly.
            </p>
            <Button
              type="button"
              variant="ghost"
              className="mt-6"
              onClick={() => setSubmitted(false)}
            >
              Send another
            </Button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="space-y-5 rounded-2xl border border-[var(--border-subtle)] bg-white p-8 shadow-sm dark:bg-navy-light/30"
          >
            {roleTitle ? (
              <p className="rounded-xl bg-brand-orange/10 px-4 py-3 text-sm text-navy dark:text-slate-200">
                Applying for: <strong>{roleTitle}</strong>
              </p>
            ) : null}
            <div>
              <label htmlFor="name" className="text-sm font-medium text-navy dark:text-slate-200">
                Name
              </label>
              <input
                id="name"
                name="name"
                required
                className="mt-1.5 w-full rounded-xl border border-[var(--border-subtle)] bg-surface px-4 py-2.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
              />
            </div>
            <div>
              <label htmlFor="email" className="text-sm font-medium text-navy dark:text-slate-200">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1.5 w-full rounded-xl border border-[var(--border-subtle)] bg-surface px-4 py-2.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
              />
            </div>
            <div>
              <label
                htmlFor="interest"
                className="text-sm font-medium text-navy dark:text-slate-200"
              >
                I&apos;m interested in
              </label>
              <select
                id="interest"
                name="interest"
                required
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-[var(--border-subtle)] bg-surface px-4 py-2.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
              >
                <option value="" disabled>
                  Select an option
                </option>
                {interests.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="message"
                className="text-sm font-medium text-navy dark:text-slate-200"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="mt-1.5 w-full resize-y rounded-xl border border-[var(--border-subtle)] bg-surface px-4 py-2.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
              />
            </div>
            <Button type="submit" size="lg" className="w-full justify-center" disabled={pending}>
              <Mail className="h-4 w-4" aria-hidden />
              {pending ? "Opening mail…" : "Send via email"}
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </FadeUp>
  );
}
