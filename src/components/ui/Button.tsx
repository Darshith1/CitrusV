"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

const variantStyles: Record<ButtonVariant, string> = {
  secondary:
    "bg-navy !text-white border border-navy-light hover:bg-navy-light shadow-md shadow-navy/20",
  primary:
    "bg-brand-orange !text-white shadow-lg shadow-brand-orange/30 hover:bg-[#e67e00] hover:shadow-brand-orange/45 border border-transparent",
  ghost:
    "bg-transparent text-navy border border-[var(--border-subtle)] hover:bg-surface hover:border-brand-blue/30",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "min-h-10 px-4 py-2 text-sm",
  md: "min-h-11 px-6 py-2.5 text-sm font-medium",
  lg: "min-h-12 px-8 py-3 text-base font-semibold",
};

type SharedProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  "aria-label"?: string;
};

type ButtonAsButton = SharedProps & { href?: undefined };
type ButtonAsLink = SharedProps & { href: string; target?: string; rel?: string };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const motionInteraction = {
  whileHover: { scale: 1.02, y: -1 },
  whileTap: { scale: 0.98 },
  transition: { type: "spring" as const, stiffness: 400, damping: 25 },
};

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    className,
    children,
    disabled,
    type = "button",
    onClick,
    "aria-label": ariaLabel,
  } = props;

  const fullWidth = Boolean(className?.includes("w-full"));

  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 touch-manipulation",
    variantStyles[variant],
    sizeStyles[size],
    className,
  );

  if ("href" in props && props.href) {
    const { href, target, rel } = props;
    return (
      <motion.div
        {...motionInteraction}
        className={cn("inline-flex max-w-full", fullWidth && "w-full")}
      >
        <Link
          href={href}
          className={classes}
          target={target}
          rel={rel}
          aria-label={ariaLabel}
          onClick={onClick}
        >
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
      className={classes}
      {...motionInteraction}
    >
      {children}
    </motion.button>
  );
}
