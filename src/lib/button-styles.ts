/**
 * Shared button treatment: squared corners, uppercase tracked label,
 * accent outline that fills on hover (solid variant inverts the same idea).
 */
const base =
  "btn-notch inline-flex items-center justify-center gap-2 rounded-[3px] text-xs font-bold uppercase tracking-[0.14em] disabled:cursor-not-allowed disabled:opacity-40";

export const btnSizes = {
  sm: "px-5 py-2.5",
  md: "px-7 py-3.5",
  lg: "px-8 py-4 text-sm",
} as const;

export const btnOutline = `${base} border-2 border-accent/70 text-accent hover:border-accent hover:bg-accent/10`;

export const btnSolid = `${base} border-2 border-accent bg-accent text-accent-foreground hover:border-accent/60 hover:bg-accent/85`;

export const btnGhost = `${base} border-2 border-border text-foreground hover:border-accent/70 hover:text-accent`;

