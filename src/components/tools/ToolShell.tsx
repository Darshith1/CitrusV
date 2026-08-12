"use client";

import Link from "next/link";
import { ChevronRight, Lock } from "lucide-react";
import type { Tool } from "@/content/tools-manifest";
import {
  getCategoryById,
  getToolsByCategory,
} from "@/content/tools-manifest";
import { StatusBadge } from "@/components/tools/StatusBadge";
import { Button } from "@/components/ui/Button";
import { bookCallHref, bookCallIsExternal } from "@/lib/site";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

export type ToolShellProps = {
  tool: Tool;
  children: React.ReactNode;
  className?: string;
};

export function ToolShell({ tool, children, className }: ToolShellProps) {
  const category = getCategoryById(tool.categoryId);
  const related = getToolsByCategory(tool.categoryId)
    .filter((t) => t.slug !== tool.slug && t.status !== "comingSoon")
    .slice(0, 4);

  return (
    <div className={cn("mx-auto w-full max-w-4xl px-4 py-8 md:py-12", className)}>
      <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1 text-sm text-muted">
        <Link href="/" className="hover:text-brand-blue">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 shrink-0 opacity-50" aria-hidden />
        <Link href="/tools" className="hover:text-brand-blue">
          Tools
        </Link>
        {category ? (
          <>
            <ChevronRight className="h-4 w-4 shrink-0 opacity-50" aria-hidden />
            <Link
              href={`/tools/${category.id}`}
              className="hover:text-brand-blue"
            >
              {category.name}
            </Link>
          </>
        ) : null}
        <ChevronRight className="h-4 w-4 shrink-0 opacity-50" aria-hidden />
        <span className="font-medium text-navy dark:text-slate-200">{tool.title}</span>
      </nav>

      <header className="mb-8">
        <div className="flex flex-wrap items-start gap-3">
          <h1 className="text-3xl font-bold tracking-tight text-navy dark:text-slate-50 md:text-4xl">
            {tool.title}
          </h1>
          <StatusBadge status={tool.status} className="mt-1" />
        </div>
        <p className="mt-3 max-w-2xl text-lg text-muted">{tool.description}</p>
        <p className="mt-4 flex items-start gap-2 rounded-lg border border-[var(--border-subtle)] bg-surface/80 px-4 py-3 text-sm text-muted">
          <Lock className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" aria-hidden />
          <span>
            Privacy first: processing runs in your browser when possible. We do not
            store your files or text on our servers.
          </span>
        </p>
      </header>

      <div className="mb-12">{children}</div>

      {related.length > 0 ? (
        <section className="mb-12" aria-labelledby="related-tools-heading">
          <h2
            id="related-tools-heading"
            className="mb-4 text-lg font-semibold text-navy dark:text-slate-100"
          >
            Related tools
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {related.map((item) => (
              <li key={item.slug}>
                <Card className="p-4" href={`/tools/${item.categoryId}/${item.slug}`}>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium text-navy dark:text-slate-100">
                      {item.title}
                    </span>
                    <StatusBadge status={item.status} />
                  </div>
                  <p className="mt-1 text-sm text-muted line-clamp-2">
                    {item.description}
                  </p>
                </Card>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <aside className="rounded-2xl border border-[var(--border-subtle)] bg-gradient-to-br from-navy to-navy-light p-8 text-white shadow-lg">
        <h2 className="text-xl font-semibold">Need something custom?</h2>
        <p className="mt-2 max-w-xl text-sm text-white/80">
          CitrusV builds web apps, automations, and internal tools for teams. Hire us
          to ship your next product feature or workflow.
        </p>
        <div className="mt-6">
          <Button
            href={bookCallHref()}
            variant="primary"
            size="md"
            {...(bookCallIsExternal()
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            Hire CitrusV
          </Button>
        </div>
      </aside>
    </div>
  );
}
