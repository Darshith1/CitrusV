"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { GradientText } from "./GradientText";

export type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <motion.header
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={cn("max-w-2xl", alignClass, className)}
    >
      {eyebrow ? (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand-blue">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-balance text-2xl font-bold tracking-tight text-navy sm:text-3xl md:text-4xl">
        {title}
        {highlight ? (
          <>
            {" "}
            <GradientText as="span">{highlight}</GradientText>
          </>
        ) : null}
      </h2>
      {description ? (
        <p className="mt-3 text-sm leading-relaxed text-muted sm:mt-4 sm:text-base md:text-lg">{description}</p>
      ) : null}
    </motion.header>
  );
}
