import type { Metadata } from "next";
import Link from "next/link";
import {
  Calculator,
  Code2,
  Database,
  DollarSign,
  FileText,
  Image,
  Link as LinkIcon,
  Music,
  Palette,
  QrCode,
  Share2,
  Shield,
  Sparkles,
  Timer,
  Type,
  Video,
  Wrench,
} from "lucide-react";
import { categories, getToolsByCategory, getToolCount } from "@/content/tools-manifest";
import { ToolSearch } from "@/components/tools/ToolSearch";
import { FadeUp } from "@/components/motion/FadeUp";
import { Card } from "@/components/ui/Card";
import { GradientText } from "@/components/ui/GradientText";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Free Online Tools",
  description: "Browse CitrusV's free browser-based tools for text, dev, design, and more.",
};

const iconMap = {
  Type,
  FileText,
  Image,
  Video,
  Music,
  Link: LinkIcon,
  QrCode,
  Share2,
  Code2,
  Sparkles,
  Timer,
  Calculator,
  Shield,
  Palette,
  DollarSign,
  Database,
  Wrench,
} as const;

type ToolsPageProps = {
  searchParams: Promise<{ category?: string }>;
};

export default async function ToolsPage({ searchParams }: ToolsPageProps) {
  const { category: categoryParam } = await searchParams;
  const initialCategory =
    categoryParam && categories.some((c) => c.id === categoryParam)
      ? (categoryParam as (typeof categories)[number]["id"])
      : "all";

  return (
    <div className="container-citrus py-12 sm:py-16">
      <FadeUp>
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-blue sm:text-sm">CitrusV Toolbox</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-navy sm:text-4xl md:text-5xl">
          <GradientText>Free online tools</GradientText>
        </h1>
        <p className="mt-4 max-w-2xl text-base text-muted sm:text-lg">
          {getToolCount()} practical utilities — privacy-first, fast, and free. Search or browse by category.
        </p>
      </FadeUp>

      <section className="mt-12" aria-labelledby="categories-heading">
        <SectionHeading title="Categories" />
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, i) => {
            const Icon = iconMap[cat.icon as keyof typeof iconMap] ?? Wrench;
            const count = getToolsByCategory(cat.id).length;
            return (
              <li key={cat.id}>
                <FadeUp delay={i * 0.04}>
                  <Card href={`/tools/${cat.id}`} className="h-full" linkLabel={cat.name}>
                    <div className="flex items-start gap-4">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue">
                        <Icon className="h-5 w-5" aria-hidden />
                      </span>
                      <div>
                        <h2 className="text-lg font-semibold text-navy dark:text-slate-100">{cat.name}</h2>
                        <p className="mt-1 text-sm text-muted line-clamp-2">{cat.description}</p>
                        <p className="mt-3 text-xs font-medium text-brand-blue">{count} tools</p>
                      </div>
                    </div>
                  </Card>
                </FadeUp>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mt-16" aria-labelledby="search-heading">
        <SectionHeading title="Search all tools" />
        <div className="mt-6">
          <ToolSearch initialCategory={initialCategory} />
        </div>
        <p className="mt-8 text-center text-sm text-muted">
          Need a custom tool for your team?{" "}
          <Link href="/book" className="font-medium text-brand-blue hover:underline">
            Hire CitrusV
          </Link>
        </p>
      </section>
    </div>
  );
}
