"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/layout/Logo";
import { cn } from "@/lib/utils";
import { bookCallHref, bookCallIsExternal } from "@/lib/site";

const navLinks = [
  { label: "What we do", href: "/what-we-do" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-all duration-300",
        scrolled
          ? "border-[var(--border-subtle)] bg-white/90 backdrop-blur-xl shadow-sm"
          : "border-[var(--border-subtle)]/60 bg-white/70 backdrop-blur-md",
      )}
    >
      <div className="container-citrus flex h-14 items-center justify-between gap-3 sm:h-16 lg:h-20">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-2 text-sm font-medium text-navy/80 transition-colors hover:bg-surface hover:text-brand-blue"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button
            href={bookCallHref()}
            size="md"
            {...(bookCallIsExternal()
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            Book a call
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-[var(--border-subtle)] p-2.5 text-navy touch-manipulation lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <>
            <motion.button
              type="button"
              aria-label="Close menu overlay"
              className="fixed inset-0 z-40 bg-navy/40 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              id="mobile-nav"
              className="fixed inset-y-0 right-0 z-50 flex w-[min(100%,22rem)] flex-col border-l border-[var(--border-subtle)] bg-white shadow-2xl lg:hidden"
              style={{
                paddingTop: "max(1.25rem, env(safe-area-inset-top))",
                paddingBottom: "max(1.25rem, env(safe-area-inset-bottom))",
              }}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
            >
              <div className="flex items-center justify-between gap-3 px-5 pb-6">
                <Logo />
                <button
                  type="button"
                  className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-navy touch-manipulation"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3" aria-label="Mobile">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-xl px-4 py-3.5 text-base font-medium text-navy transition-colors hover:bg-surface active:bg-surface"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/contact"
                  className="rounded-xl px-4 py-3.5 text-base font-medium text-navy transition-colors hover:bg-surface active:bg-surface"
                  onClick={() => setOpen(false)}
                >
                  Contact
                </Link>
              </nav>
              <div className="mt-auto border-t border-[var(--border-subtle)] px-5 pt-5">
                <Button
                  href={bookCallHref()}
                  className="w-full justify-center"
                  size="lg"
                  onClick={() => setOpen(false)}
                  {...(bookCallIsExternal()
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  Book a call
                </Button>
              </div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
