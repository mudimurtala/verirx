import { useEffect, useRef, useState } from "react";

type Props = {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
  decimals?: number;
};

/** Counts up from 0 to `value` once the element scrolls into view. */
export function StatCounter({ value, label, suffix = "", prefix = "", decimals = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || started) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setStarted(true);
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const duration = 1400;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(value * eased);
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [started, value]);

  return (
    <div
      ref={ref}
      className="rounded-2xl border border-border bg-surface/60 p-4 transition-colors duration-300 hover:border-accent/40 md:rounded-3xl md:p-8"
    >
      <p className="font-display text-3xl font-bold tracking-tight text-accent md:text-5xl">
        {prefix}
        {display.toFixed(decimals)}
        {suffix}
      </p>
      <p className="mt-3 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
