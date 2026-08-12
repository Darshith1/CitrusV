"use client";

import Link from "next/link";
import { ArrowUpRight, Linkedin, MapPin } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { LINKEDIN_URL } from "@/lib/site";

const columns = [
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "What we do", href: "/what-we-do" },
      { label: "Work", href: "/work" },
      { label: "Careers", href: "/careers" },
      { label: "Partners", href: "/partners" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Lab",
    links: [
      { label: "Tools", href: "/tools" },
      { label: "Citrus AI", href: "/citrus-ai" },
      { label: "Playzone", href: "/playzone" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Book a call", href: "/book" },
      { label: "LinkedIn", href: LINKEDIN_URL, external: true },
      { label: "Contact", href: "/contact" },
    ],
  },
] as const;

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border-subtle)] bg-navy text-slate-200">
      <div className="container-citrus py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(3,minmax(0,1fr))]">
          <div className="space-y-5">
            <Logo onDark />
            <p className="max-w-sm text-sm leading-relaxed text-slate-400">
              CitrusV designs and builds websites, software, and IT systems that help businesses
              grow — with practical AI where it matters.
            </p>
            <div className="flex flex-col gap-2 text-sm text-slate-400">
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-brand-orange" aria-hidden />
                Global · Remote-first
              </span>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 transition-colors hover:text-white"
              >
                <Linkedin className="h-4 w-4 text-brand-blue" aria-hidden />
                LinkedIn
              </a>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {"external" in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-slate-400 transition-colors hover:text-brand-orange"
                      >
                        {link.label}
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                      </a>
                    ) : link.href.startsWith("mailto:") ? (
                      <a
                        href={link.href}
                        className="text-sm text-slate-400 transition-colors hover:text-brand-orange"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-slate-400 transition-colors hover:text-brand-orange"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} CitrusV. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-slate-300">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-slate-300">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
