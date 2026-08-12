"use client";

import { cn } from "@/lib/utils";

type GradientTextProps = {
  children: React.ReactNode;
  className?: string;
  as?: "span" | "p" | "h1" | "h2" | "h3";
};

export function GradientText({ children, className, as: Tag = "span" }: GradientTextProps) {
  return (
    <Tag
      className={cn(
        "bg-gradient-to-r from-brand-blue via-[#4da3ff] to-brand-orange bg-clip-text text-transparent",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
