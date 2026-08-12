import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  categories,
  getCategoryById,
  getToolsByCategory,
  type ToolCategory,
} from "@/content/tools-manifest";
import { StatusBadge } from "@/components/tools/StatusBadge";
import { FadeUp } from "@/components/motion/FadeUp";
import { Card } from "@/components/ui/Card";

type Props = { params: Promise<{ category: string }> };

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategoryById(category as ToolCategory);
  if (!cat) return { title: "Tools" };
  return { title: cat.name, description: cat.description };
}

export default async function CategoryToolsPage({ params }: Props) {
  const { category } = await params;
  const cat = getCategoryById(category as ToolCategory);
  if (!cat) notFound();
  const tools = getToolsByCategory(cat.id);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 md:py-16">
      <FadeUp>
        <nav className="mb-4 text-sm text-muted">
          <Link href="/tools" className="hover:text-brand-blue">Tools</Link>
          <span className="mx-2">/</span>
          <span className="text-navy dark:text-slate-200">{cat.name}</span>
        </nav>
        <h1 className="text-3xl font-bold text-navy dark:text-slate-50 md:text-4xl">{cat.name}</h1>
        <p className="mt-3 max-w-2xl text-muted">{cat.description}</p>
        <p className="mt-2 text-sm text-muted">{tools.length} tools</p>
      </FadeUp>

      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool, i) => (
          <li key={tool.slug}>
            <FadeUp delay={i * 0.03}>
              <Card href={`/tools/${cat.id}/${tool.slug}`} className="h-full p-5">
                <div className="flex items-start justify-between gap-2">
                  <h2 className="font-semibold text-navy dark:text-slate-100">{tool.title}</h2>
                  <StatusBadge status={tool.status} />
                </div>
                <p className="mt-2 text-sm text-muted line-clamp-3">{tool.description}</p>
              </Card>
            </FadeUp>
          </li>
        ))}
      </ul>
    </div>
  );
}
