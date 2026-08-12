import type { Metadata, Viewport } from "next";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "CitrusV — Websites, Software & IT",
    template: "%s | CitrusV",
  },
  description:
    "CitrusV is a premium digital partner for website development, custom software, IT support, and practical AI integration.",
  keywords: ["CitrusV", "web development", "IT support", "custom software", "digital agency"],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon.ico"],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "CitrusV — Websites, Software & IT",
    description:
      "Bold brands, intelligent products, and reliable IT — crafted by CitrusV.",
    type: "website",
    siteName: "CitrusV",
    images: [{ url: "/icon-512.png", width: 512, height: 512, alt: "CitrusV" }],
  },
  twitter: {
    card: "summary",
    title: "CitrusV",
    description: "Websites, software, and IT solutions that scale with your business.",
    images: ["/icon-512.png"],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0D2240" },
    { media: "(prefers-color-scheme: dark)", color: "#0D2240" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-dvh flex-col antialiased">
        <ScrollProgress />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
