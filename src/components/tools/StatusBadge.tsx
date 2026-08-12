"use client";

import { cn } from "@/lib/utils";
import type { ToolStatus } from "@/content/tools-manifest";

const statusConfig: Record<
  ToolStatus,
  { label: string; className: string }
> = {
  live: {
    label: "Live",
    className:
      "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/25",
  },
  beta: {
    label: "Beta",
    className:
      "bg-brand-blue/15 text-brand-blue dark:text-sky-300 border-brand-blue/25",
  },
  comingSoon: {
    label: "Coming soon",
    className: "bg-muted/15 text-muted border-[var(--border-subtle)]",
  },
};

export type StatusBadgeProps = {
  status: ToolStatus;
  className?: string;
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide",
        config.className,
        className,
      )}
    >
      {config.label}
    </span>
  );
}
