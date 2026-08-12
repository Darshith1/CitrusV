"use client";

import Link from "next/link";
import { Clock } from "lucide-react";
import type { Tool } from "@/content/tools-manifest";
import { getCategoryById } from "@/content/tools-manifest";
import { StatusBadge } from "@/components/tools/StatusBadge";
import { Button } from "@/components/ui/Button";

export type ComingSoonToolProps = {
  tool: Tool;
};

export function ComingSoonTool({ tool }: ComingSoonToolProps) {
  const category = getCategoryById(tool.categoryId);

  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-[var(--border-subtle)] bg-white px-6 py-16 text-center dark:bg-navy-light/30">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-orange/15 text-brand-orange">
        <Clock className="h-7 w-7" aria-hidden />
      </div>
      <StatusBadge status="comingSoon" className="mb-4" />
      <h2 className="text-2xl font-semibold text-navy dark:text-slate-100">
        {tool.title}
      </h2>
      <p className="mt-3 max-w-md text-muted">{tool.description}</p>
      {category ? (
        <p className="mt-2 text-sm text-muted">
          Category:{" "}
          <Link
            href={`/tools/${category.id}`}
            className="font-medium text-brand-blue hover:underline"
          >
            {category.name}
          </Link>
        </p>
      ) : null}
      <div className="mt-8">
        <Button href="/tools" variant="secondary" size="md">
          Browse live tools
        </Button>
      </div>
    </div>
  );
}
