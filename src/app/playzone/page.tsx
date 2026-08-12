"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Gamepad2, Grid3X3, Brain, Hash, Zap } from "lucide-react";

const games = [
  {
    slug: "snake",
    href: "/playzone/snake",
    title: "Snake",
    description: "Classic arcade snake — eat, grow, don't crash.",
    icon: Zap,
    accent: "from-brand-blue to-cyan-400",
  },
  {
    slug: "memory",
    href: "/playzone/memory",
    title: "Memory Match",
    description: "Flip cards and find every Citrus-themed pair.",
    icon: Brain,
    accent: "from-brand-orange to-amber-400",
  },
  {
    slug: "tic-tac-toe",
    href: "/playzone/tic-tac-toe",
    title: "Tic-Tac-Toe",
    description: "You are X. Can you outsmart the CPU?",
    icon: Grid3X3,
    accent: "from-violet-500 to-brand-blue",
  },
  {
    slug: "number-puzzle",
    href: "/playzone/number-puzzle",
    title: "2048-lite",
    description: "Slide tiles, merge numbers, chase 2048.",
    icon: Hash,
    accent: "from-emerald-500 to-brand-blue",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const card = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export default function PlayzonePage() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-navy via-navy-light to-navy-dark py-12 text-white md:py-16">
      <motion.div
        className="pointer-events-none absolute -left-20 top-10 h-80 w-80 rounded-full bg-brand-blue/30 blur-3xl"
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute -right-16 bottom-0 h-96 w-96 rounded-full bg-brand-orange/25 blur-3xl"
        animate={{ x: [0, -25, 0], y: [0, 15, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container-citrus relative">
        <motion.header
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 text-center md:mb-14"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur">
            <Gamepad2 className="h-4 w-4 text-brand-orange" aria-hidden />
            CitrusV Playzone
          </div>
          <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
            Play a little. <span className="text-brand-orange">Win big smiles.</span>
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-white/75">
            Quick browser games — no installs, no accounts. Pick a card and jump in.
          </p>
        </motion.header>

        <motion.ul
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {games.map((game) => {
            const Icon = game.icon;
            return (
              <motion.li key={game.slug} variants={card}>
                <Link href={game.href} className="group block h-full">
                  <motion.article
                    whileHover={{ y: -8, rotate: -0.5 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 22 }}
                    className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-md"
                  >
                    <motion.div
                      className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${game.accent} shadow-lg`}
                      whileHover={{ scale: 1.1, rotate: 6 }}
                      transition={{ type: "spring", stiffness: 500, damping: 15 }}
                    >
                      <Icon className="h-7 w-7 text-white" aria-hidden />
                    </motion.div>
                    <h2 className="text-xl font-bold">{game.title}</h2>
                    <p className="mt-2 flex-1 text-sm text-white/70">{game.description}</p>
                    <span className="mt-4 inline-flex items-center text-sm font-semibold text-brand-orange group-hover:underline">
                      Play now →
                    </span>
                    <motion.div
                      className="pointer-events-none absolute -bottom-8 -right-8 h-32 w-32 rounded-full bg-white/5"
                      animate={{ scale: [1, 1.15, 1] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    />
                  </motion.article>
                </Link>
              </motion.li>
            );
          })}
        </motion.ul>

        <p className="mt-12 text-center text-sm text-white/50">
          Powered by <span className="font-semibold text-brand-blue">CitrusV</span>
        </p>
      </div>
    </div>
  );
}
