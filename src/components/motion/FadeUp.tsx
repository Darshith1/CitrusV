"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { fadeUp, fadeUpReduced } from "@/lib/motion";
import { cn } from "@/lib/utils";

type FadeUpProps = HTMLMotionProps<"div"> & {
  delay?: number;
};

/**
 * Scroll reveal that stays readable on SSR/first paint (no opacity:0 flash).
 * Motion is transform-only unless reduced-motion is on.
 */
export function FadeUp({ children, className, delay = 0, ...props }: FadeUpProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      variants={reduce ? fadeUpReduced : fadeUp}
      initial={reduce ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: reduce ? 0 : delay }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
