"use client";

import { useReducedMotion, motion } from "framer-motion";
import { cn } from "@/lib/utils";

type AnimatedGradientProps = {
  className?: string;
  children?: React.ReactNode;
};

export function AnimatedGradient({ className, children }: AnimatedGradientProps) {
  const reduce = useReducedMotion();

  return (
    <div className={cn("relative overflow-hidden bg-surface/40", className)}>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-[30%] opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at 30% 40%, rgba(30,144,255,0.35), transparent 55%), radial-gradient(ellipse at 70% 30%, rgba(255,140,0,0.28), transparent 50%), radial-gradient(ellipse at 50% 80%, rgba(13,34,64,0.12), transparent 45%)",
        }}
        animate={reduce ? undefined : { x: [0, 24, 0], y: [0, -16, 0] }}
        transition={
          reduce
            ? undefined
            : { duration: 18, repeat: Infinity, ease: "easeInOut" }
        }
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
