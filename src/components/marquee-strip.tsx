const BADGES = [
  "NAFDAC",
  "WHO PQ",
  "EU-GMP",
  "US FDA",
  "MHRA",
  "Solana",
  "GS1 Standards",
  "PIC/S",
];

export function MarqueeStrip() {
  const items = [...BADGES, ...BADGES];
  return (
    <div className="relative overflow-hidden border-y border-border/70 bg-surface/30 py-6">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
      <div className="flex w-max animate-[marquee_32s_linear_infinite] items-center gap-4">
        {items.map((badge, i) => (
          <span
            key={`${badge}-${i}`}
            className="rounded-full border border-border bg-surface-2/60 px-6 py-2 text-sm font-medium tracking-wide text-muted-foreground"
          >
            {badge}
          </span>
        ))}
      </div>
    </div>
  );
}
