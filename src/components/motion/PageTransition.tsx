"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeIn } from "@/lib/motion";

type PageTransitionProps = {
  children: React.ReactNode;
  className?: string;
};

export function PageTransition({ children, className }: PageTransitionProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={fadeIn}
      initial="visible"
      animate="visible"
      className={className}
    >
      {children}
    </motion.div>
  );
}
