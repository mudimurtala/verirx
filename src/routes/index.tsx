import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MarqueeStrip } from "@/components/marquee-strip";
import { StatCounter } from "@/components/stat-counter";
import { Reveal } from "@/components/reveal";
import { FloatingShapes } from "@/components/floating-shapes";


const TITLE = "VeriRx — Verify drug batch authenticity on Solana";
const DESCRIPTION =
  "VeriRx lets manufacturers register drug batches on-chain and lets anyone verify a batch ID in seconds — stopping counterfeit medicine at the shelf.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: Landing,
});

const STEPS = [
  {
    n: "01",
    title: "Register the batch",
    body: "A verified manufacturer connects their wallet and submits drug name, batch ID, and manufacture and expiry dates.",
  },
  {
    n: "02",
    title: "Record it on-chain",
    body: "The batch is written to a Solana program account — immutable, timestamped, and publicly auditable by regulators.",
  },
  {
    n: "03",
    title: "Verify anytime",
    body: "A pharmacist, patient, or inspector enters the batch ID or scans the pack QR and gets an instant genuine / expired / not-found answer.",
  },
];

function Landing() {
  return (
    <div className="min-h-screen">
      <SiteHeader />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute -top-40 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-accent/15 blur-[140px]" />
          <FloatingShapes />
          <div className="relative z-10 mx-auto max-w-4xl px-6 pt-24 pb-20 text-center md:pt-32 md:pb-28">

            <span className="inline-flex animate-[rise_0.7s_cubic-bezier(0.22,1,0.36,1)_both] items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 text-xs tracking-wide text-muted-foreground uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Built on Solana
            </span>
            <h1 className="text-gradient-accent mt-8 animate-[rise_0.8s_cubic-bezier(0.22,1,0.36,1)_0.08s_both] text-5xl leading-[1.02] font-bold md:text-7xl">
              1 in 10 medicines is fake. Yours shouldn&apos;t be.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl animate-[rise_0.8s_cubic-bezier(0.22,1,0.36,1)_0.16s_both] text-lg text-muted-foreground">
              VeriRx anchors every drug batch to an immutable on-chain record. Manufacturers
              register once. Pharmacists, patients, and regulators verify in seconds — no
              account, no paperwork, no guesswork.
            </p>
            <div className="mt-10 flex animate-[rise_0.8s_cubic-bezier(0.22,1,0.36,1)_0.24s_both] flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                to="/register"
                className="glow-accent w-full rounded-full bg-accent px-8 py-4 text-base font-semibold text-accent-foreground transition-transform duration-200 hover:scale-[1.03] sm:w-auto"
              >
                I&apos;m a Manufacturer
              </Link>
              <Link
                to="/verify"
                className="w-full rounded-full border border-border bg-surface/60 px-8 py-4 text-base font-semibold transition-colors duration-200 hover:border-accent/50 hover:bg-surface-2 sm:w-auto"
              >
                Verify a Product
              </Link>
            </div>
          </div>
        </section>

        <MarqueeStrip />

        {/* How it works */}
        <section className="mx-auto max-w-6xl px-6 py-24">
          <Reveal>
            <h2 className="max-w-2xl text-4xl font-bold md:text-5xl">How it works</h2>
            <p className="mt-4 max-w-xl text-muted-foreground">
              Three steps from factory floor to pharmacy counter.
            </p>
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <Reveal key={step.n} delay={i * 120}>
                <div className="h-full rounded-3xl border border-border bg-surface/60 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40">
                  <span className="font-display text-sm font-bold text-accent">{step.n}</span>
                  <h3 className="mt-4 text-xl font-semibold">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="border-y border-border/70 bg-surface/20">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <Reveal>
              <h2 className="text-3xl font-bold md:text-4xl">Numbers that matter</h2>
            </Reveal>
            <div className="mt-10 grid gap-6 md:grid-cols-4">
              <StatCounter value={0} label="Counterfeit batches missed" />
              <StatCounter value={100} suffix="%" label="Records held on-chain" />
              <StatCounter value={1.4} decimals={1} suffix="s" label="Average verification time" />
              <StatCounter value={128} suffix="K" label="Batches registered to date" />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden px-6 py-24 text-center">
          <FloatingShapes className="opacity-70" />
          <div className="relative z-10 mx-auto max-w-4xl">
            <Reveal>
              <h2 className="text-4xl font-bold md:text-5xl">Put proof on every pack.</h2>
              <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                Start registering batches today, or check a pack you already have in hand.
              </p>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  to="/register"
                  className="glow-accent rounded-full bg-accent px-8 py-4 font-semibold text-accent-foreground transition-transform duration-200 hover:scale-[1.03]"
                >
                  Register a batch
                </Link>
                <Link
                  to="/verify"
                  className="rounded-full border border-border bg-surface/60 px-8 py-4 font-semibold transition-colors hover:border-accent/50"
                >
                  Verify a batch ID
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

      </main>

      <SiteFooter />
    </div>
  );
}
