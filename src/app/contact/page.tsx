import { Suspense } from "react";
import ContactForm from "./ContactForm";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata = {
  title: "Contact",
  description: "Contact CitrusV about websites, software, IT support, marketing, or careers.",
};

export default function ContactPage() {
  return (
    <div className="container-citrus py-16 lg:py-24">
      <SectionHeading
        eyebrow="Contact"
        title="Let's talk about"
        highlight="your project"
        description="Share a few details — we'll open your mail client with a pre-filled message."
        className="mb-12"
      />
      <Suspense
        fallback={
          <div className="mx-auto max-w-xl rounded-2xl border border-[var(--border-subtle)] bg-surface/50 p-8 text-center text-sm text-muted">
            Loading form…
          </div>
        }
      >
        <ContactForm />
      </Suspense>
    </div>
  );
}
