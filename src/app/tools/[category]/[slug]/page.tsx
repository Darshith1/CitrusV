import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getToolBySlug, type ToolCategory } from "@/content/tools-manifest";
import { ToolShell } from "@/components/tools/ToolShell";
import { ToolRenderer } from "@/lib/tools/registry";

type Props = { params: Promise<{ category: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return { title: "Tool" };
  return { title: tool.title, description: tool.description };
}

export default async function ToolPage({ params }: Props) {
  const { category, slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool || tool.categoryId !== category) notFound();

  return (
    <ToolShell tool={tool}>
      <ToolRenderer slug={slug} />
    </ToolShell>
  );
}
