const stats = [
  { label: "Fresh concept", value: "01" },
  { label: "Bold launch", value: "Soon" },
  { label: "Built for", value: "Curious minds" },
];

export default function App() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--bg)] text-[var(--text)]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-12rem] top-[-10rem] h-80 w-80 rounded-full bg-[var(--glow)] blur-3xl animate-float-slow" />
        <div className="absolute right-[-8rem] top-24 h-72 w-72 rounded-full bg-[var(--accent)]/20 blur-3xl animate-float-delayed" />
        <div className="absolute bottom-[-10rem] left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-[var(--highlight)]/20 blur-3xl animate-pulse-soft" />
        <div className="grid-pattern absolute inset-0 opacity-40" />
      </div>

      <section className="relative mx-auto flex min-h-screen max-w-7xl items-center px-6 py-10 sm:px-10 lg:px-16">
        <div className="grid w-full gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div className="max-w-3xl animate-rise">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm tracking-[0.25em] uppercase backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-[var(--highlight)] shadow-[0_0_16px_var(--highlight)]" />
              CitrusV
            </div>

            <h1 className="mt-8 text-5xl font-semibold leading-none tracking-[-0.06em] sm:text-7xl lg:text-8xl">
              Something
              <span className="block bg-gradient-to-r from-[var(--highlight)] via-white to-[var(--accent)] bg-clip-text text-transparent">
                refreshingly new
              </span>
              is coming soon.
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
                Launching with motion, color, and a little surprise.
              </div>
            </div>
          </div>

          <div className="animate-rise-delayed">
            <div className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-white/8 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl">
              <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent" />

              <div className="flex items-center justify-between">
                <p className="text-sm uppercase tracking-[0.3em] text-white/55">
                  Launch status
                </p>
                <div className="flex items-center gap-2 text-sm text-white/70">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  In progress
                </div>
              </div>

              <div className="mt-10 rounded-[1.5rem] border border-white/10 bg-black/15 p-5">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.28em] text-white/45">
                      Website
                    </p>
                    <p className="mt-3 text-3xl font-semibold tracking-[-0.04em]">
                      Coming Soon
                    </p>
                  </div>
                  <div className="orbit-ring relative h-20 w-20">
                    <span className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--highlight)] shadow-[0_0_24px_var(--highlight)]" />
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  {stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/5 px-4 py-4"
                    >
                      <span className="text-sm text-white/55">{stat.label}</span>
                      <span className="text-base font-medium">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
