"use client";

import { cn } from "@/lib/utils";

export const inputClass =
  "w-full rounded-lg border border-[var(--border-subtle)] bg-white px-3 py-2 text-sm text-navy outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 dark:bg-navy-light/40 dark:text-slate-100";

export const textareaClass =
  "w-full min-h-[120px] rounded-lg border border-[var(--border-subtle)] bg-white px-3 py-2 font-mono text-sm text-navy outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 dark:bg-navy-light/40 dark:text-slate-100";

export function ToolPanel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-[var(--border-subtle)] bg-white p-4 shadow-sm dark:bg-navy-light/30",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Label({ children, htmlFor, className }: { children: React.ReactNode; htmlFor?: string; className?: string }) {
  return (
    <label htmlFor={htmlFor} className={cn("mb-1 block text-sm font-medium text-navy dark:text-slate-200", className)}>
      {children}
    </label>
  );
}

export function CopyButton({ text }: { text: string }) {
  return (
    <button
      type="button"
      onClick={() => void navigator.clipboard.writeText(text)}
      className="rounded-lg border border-[var(--border-subtle)] px-3 py-1.5 text-xs font-medium text-brand-blue hover:bg-brand-blue/5"
    >
      Copy
    </button>
  );
}
