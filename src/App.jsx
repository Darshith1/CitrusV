import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const stats = [
  { label: "Fresh concept", value: "01" },
  { label: "Bold launch", value: "Soon" },
  { label: "Built for", value: "Curious minds" },
];

const springConfig = { stiffness: 120, damping: 18, mass: 0.4 };

export default function App() {
  const [interactive, setInteractive] = useState(false);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const glowX = useSpring(cursorX, springConfig);
  const glowY = useSpring(cursorY, springConfig);
  const cardRotateX = useTransform(glowY, [-200, 200], [8, -8]);
  const cardRotateY = useTransform(glowX, [-200, 200], [-8, 8]);
  const panelX = useTransform(glowX, [-200, 200], [-10, 10]);
  const panelY = useTransform(glowY, [-200, 200], [-8, 8]);
  const panelXInverse = useTransform(glowX, [-200, 200], [7, -7]);
  const panelYInverse = useTransform(glowY, [-200, 200], [6, -6]);
  const glowBlobOneX = useTransform(glowX, [-300, 300], [-18, 18]);
  const glowBlobOneY = useTransform(glowY, [-300, 300], [-12, 12]);
  const glowBlobTwoX = useTransform(glowX, [-300, 300], [16, -16]);
  const glowBlobTwoY = useTransform(glowY, [-300, 300], [12, -12]);
  const glowBlobThreeX = useTransform(glowX, [-300, 300], [-10, 10]);
  const glowBlobThreeY = useTransform(glowY, [-300, 300], [18, -18]);
  const cardHighlight = useTransform(
    glowX,
    [-300, 0, 300],
    [
      "radial-gradient(circle at 25% 30%, rgba(255,190,92,0.16), transparent 52%)",
      "radial-gradient(circle at 50% 30%, rgba(255,190,92,0.18), transparent 52%)",
      "radial-gradient(circle at 75% 30%, rgba(255,190,92,0.16), transparent 52%)",
    ]
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const mediaQuery = window.matchMedia("(min-width: 768px) and (pointer: fine)");

    const updateInteractivity = () => {
      setInteractive(mediaQuery.matches);
    };

    updateInteractivity();
    mediaQuery.addEventListener("change", updateInteractivity);

    return () => {
      mediaQuery.removeEventListener("change", updateInteractivity);
    };
  }, []);

  const handlePointerMove = (event) => {
    if (!interactive) {
      return;
    }

    const { innerWidth, innerHeight } = window;
    cursorX.set(event.clientX - innerWidth / 2);
    cursorY.set(event.clientY - innerHeight / 2);
  };

  const resetPointer = () => {
    cursorX.set(0);
    cursorY.set(0);
  };

  return (
    <main
      className="relative min-h-screen overflow-hidden bg-[var(--bg)] text-[var(--text)]"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
    >
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute left-[-12rem] top-[-10rem] h-80 w-80 rounded-full bg-[var(--glow)] blur-3xl animate-float-slow"
          style={{
            x: interactive ? glowBlobOneX : 0,
            y: interactive ? glowBlobOneY : 0,
          }}
        />
        <motion.div
          className="absolute right-[-8rem] top-24 h-72 w-72 rounded-full bg-[var(--accent)]/20 blur-3xl animate-float-delayed"
          style={{
            x: interactive ? glowBlobTwoX : 0,
            y: interactive ? glowBlobTwoY : 0,
          }}
        />
        <motion.div
          className="absolute bottom-[-10rem] left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-[var(--highlight)]/20 blur-3xl animate-pulse-soft"
          style={{
            x: interactive ? glowBlobThreeX : 0,
            y: interactive ? glowBlobThreeY : 0,
          }}
        />
        {interactive ? (
          <motion.div
            className="cursor-glow absolute h-72 w-72 rounded-full"
            style={{
              x: glowX,
              y: glowY,
              left: "50%",
              top: "50%",
            }}
          />
        ) : null}
        <div className="grid-pattern absolute inset-0 opacity-40" />
      </div>

      <section className="relative mx-auto flex min-h-screen max-w-7xl items-center px-6 py-10 sm:px-10 lg:px-16">
        <div className="grid w-full gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <motion.div
            className="max-w-3xl animate-rise"
            style={interactive ? { x: panelX, y: panelY } : undefined}
          >
            <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm tracking-[0.25em] uppercase backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-[var(--highlight)] shadow-[0_0_16px_var(--highlight)]" />
              CitrusV
            </div>

            <h1 className="mt-8 text-5xl font-semibold leading-none tracking-[-0.06em] sm:text-7xl lg:text-8xl">
              CitrusV
              <span className="block bg-gradient-to-r from-[var(--highlight)] via-white to-[var(--accent)] bg-clip-text text-transparent">
                Coming Soon
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-white/70 sm:text-lg">
              CitrusV is getting ready behind the scenes. We&apos;re crafting a
              vibrant digital experience with sharp design, smooth interactions,
              and a fresh point of view.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="mailto:hello@citrusv.com"
                className="rounded-full bg-[var(--highlight)] px-6 py-3 text-sm font-medium text-[#2c1a00] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(255,190,92,0.35)]"
              >
                Contact CitrusV
              </a>
              <div className="rounded-full border border-white/15 bg-white/6 px-5 py-3 text-sm text-white/70 backdrop-blur-md">
                Cursor-reactive on desktop, calm and clean on mobile.
              </div>
            </div>
          </motion.div>

          <motion.div
            className="animate-rise-delayed [perspective:1400px]"
            style={interactive ? { x: panelXInverse, y: panelYInverse } : undefined}
          >
            <motion.div
              className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-white/8 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl"
              style={
                interactive
                  ? {
                      rotateX: cardRotateX,
                      rotateY: cardRotateY,
                      transformStyle: "preserve-3d",
                    }
                  : undefined
              }
            >
              <motion.div
                className="absolute inset-0 rounded-[2rem] opacity-70"
                style={
                  interactive
                    ? { background: cardHighlight }
                    : undefined
                }
              />
              <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent" />

              <div className="relative flex items-center justify-between">
                <p className="text-sm uppercase tracking-[0.3em] text-white/55">
                  Launch status
                </p>
                <div className="flex items-center gap-2 text-sm text-white/70">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  In progress
                </div>
              </div>

              <div className="relative mt-10 rounded-[1.5rem] border border-white/10 bg-black/15 p-5">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.28em] text-white/45">
                      Website
                    </p>
                    <p className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                      Coming Soon
                    </p>
                  </div>
                  <div className="orbit-ring relative h-20 w-20 shrink-0">
                    <span className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--highlight)] shadow-[0_0_24px_var(--highlight)]" />
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  {stats.map((stat) => (
                    <motion.div
                      key={stat.label}
                      className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/5 px-4 py-4"
                      whileHover={
                        interactive
                          ? {
                              scale: 1.02,
                              borderColor: "rgba(255,255,255,0.18)",
                            }
                          : undefined
                      }
                    >
                      <span className="text-sm text-white/55">{stat.label}</span>
                      <span className="text-base font-medium">{stat.value}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
