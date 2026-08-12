"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  /** Light wordmark for dark backgrounds (footer). */
  onDark?: boolean;
  compact?: boolean;
};

/** Brand wordmark: Citrus in navy/black (or white on dark), V in orange. */
export function Logo({ className, onDark = false, compact = false }: LogoProps) {
  if (compact) {
    return (
      <Link
        href="/"
        className={cn("inline-flex items-center", className)}
        aria-label="CitrusV home"
      >
        <Image
          src="/icon-192.png"
          alt="CitrusV"
          width={36}
          height={36}
          className="h-9 w-9"
          priority
        />
      </Link>
    );
  }

  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center font-bold tracking-tight transition-opacity hover:opacity-90",
        "text-xl sm:text-2xl",
        className,
      )}
      aria-label="CitrusV home"
    >
      <span className={onDark ? "text-white" : "text-navy"}>Citrus</span>
      <span className="text-brand-orange">V</span>
    </Link>
  );
}
