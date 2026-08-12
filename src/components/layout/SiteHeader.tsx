"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
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
  { label: "Contact", href: "/contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const externalBook = bookCallIsExternal();

  const mobileMenu =
    mounted &&
    createPortal(
      <AnimatePresence>
        {open ? (
          <div className="fixed inset-0 z-[200] lg:hidden" role="dialog" aria-modal="true">
            <motion.button
              type="button"
              aria-label="Close menu"
              className="absolute inset-0 bg-navy/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              id="mobile-nav"
              className="absolute inset-y-0 right-0 flex w-[min(100%,20rem)] flex-col bg-white shadow-2xl"
              style={{
                paddingTop: "max(1rem, env(safe-area-inset-top))",
                paddingBottom: "max(1rem, env(safe-area-inset-bottom))",
                paddingRight: "env(safe-area-inset-right)",
              }}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 380, damping: 36 }}
            >
              <div className="flex items-center justify-between gap-3 border-b border-[var(--border-subtle)] px-5 py-3">
                <Logo />
                <button
                  type="button"
                  className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-[var(--border-subtle)] text-navy touch-manipulation"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4" aria-label="Mobile">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.04 }}
                  >
                    <Link
                      href={link.href}
                      className="block rounded-xl px-4 py-3.5 text-base font-semibold text-navy transition-colors active:bg-surface"
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="space-y-3 border-t border-[var(--border-subtle)] px-5 py-5">
                <Button
                  href={bookCallHref()}
                  className="w-full justify-center"
                  size="lg"
                  onClick={() => setOpen(false)}
                  {...(externalBook ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  Book a call
                </Button>
                <p className="text-center text-xs text-muted">Design · Software · IT</p>
              </div>
            </motion.aside>
          </div>
        ) : null}
      </AnimatePresence>,
      document.body,
    );

  return (
    <>
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
            {navLinks
              .filter((l) => l.href !== "/contact")
              .map((link) => (
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
              {...(externalBook ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              Book a call
            </Button>
          </div>

          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-white p-2.5 text-navy shadow-sm touch-manipulation lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" strokeWidth={2.25} /> : <Menu className="h-5 w-5" strokeWidth={2.25} />}
          </button>
        </div>
      </header>
      {mobileMenu}
    </>
  );
}
