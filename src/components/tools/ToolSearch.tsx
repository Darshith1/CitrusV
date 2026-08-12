"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import Link from "next/link";
import {
  categories,
  tools,
  type Tool,
  type ToolCategory,
} from "@/content/tools-manifest";
import { StatusBadge } from "@/components/tools/StatusBadge";
import { cn } from "@/lib/utils";

export type ToolSearchProps = {
  className?: string;
  initialCategory?: ToolCategory | "all";
  placeholder?: string;
};

function matchesQuery(tool: Tool, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return (
    tool.slug.includes(q) ||
    tool.title.toLowerCase().includes(q) ||
    tool.description.toLowerCase().includes(q)
  );
}

export function ToolSearch({
  className,
  initialCategory = "all",
  placeholder = "Search tools by name or keyword…",
}: ToolSearchProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ToolCategory | "all">(initialCategory);

  const filtered = useMemo(() => {
    return tools.filter((tool) => {
      if (category !== "all" && tool.categoryId !== category) return false;
      return matchesQuery(tool, query);
    });
  }, [query, category]);

  return (
    <div className={cn("w-full", className)}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <label className="relative flex-1">
          <span className="sr-only">Search tools</span>
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
            aria-hidden
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="w-full rounded-full border border-[var(--border-subtle)] bg-white py-2.5 pl-10 pr-4 text-sm text-navy shadow-sm outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 dark:bg-navy-light/40 dark:text-slate-100"
          />
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as ToolCategory | "all")}
          className="rounded-full border border-[var(--border-subtle)] bg-white px-4 py-2.5 text-sm text-navy shadow-sm outline-none focus:border-brand-blue dark:bg-navy-light/40 dark:text-slate-100"
          aria-label="Filter by category"
        >
          <option value="all">All categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <p className="mt-3 text-sm text-muted">
        {filtered.length} tool{filtered.length === 1 ? "" : "s"} found
      </p>

      <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((tool) => (
          <li key={tool.slug}>
            <Link
              href={`/tools/${tool.categoryId}/${tool.slug}`}
              className="block rounded-xl border border-[var(--border-subtle)] bg-white p-4 transition hover:border-brand-blue/40 hover:shadow-md dark:bg-navy-light/30"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="font-medium text-navy dark:text-slate-100">
                  {tool.title}
                </span>
                <StatusBadge status={tool.status} />
              </div>
              <p className="mt-2 text-sm text-muted line-clamp-2">
                {tool.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>

      {filtered.length === 0 ? (
        <p className="mt-8 text-center text-muted">No tools match your search.</p>
      ) : null}
    </div>
  );
}
