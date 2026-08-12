"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type CardProps = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "article" | "section";
  href?: string;
  /** Accessible name when href is set */
  linkLabel?: string;
};

export function Card({
  children,
  className,
  as = "div",
  href,
  linkLabel = "Learn more",
}: CardProps) {
  const Component = motion.create(as);

  const shared = {
    whileHover: { y: -4, scale: 1.005 },
    transition: { type: "spring" as const, stiffness: 320, damping: 26 },
    className: cn(
      "group relative overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-white p-5 shadow-sm transition-shadow hover:shadow-xl hover:shadow-navy/10 sm:p-6",
      href && "cursor-pointer",
      className,
    ),
  };

  if (href) {
    return (
      <Component {...shared}>
        <Link href={href} className="absolute inset-0 z-10" aria-label={linkLabel} />
        <div className="relative z-0 pointer-events-none">{children}</div>
      </Component>
    );
  }

  return <Component {...shared}>{children}</Component>;
}
