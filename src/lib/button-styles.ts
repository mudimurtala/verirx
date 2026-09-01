/**
 * Shared button treatment: squared corners, uppercase tracked label,
 * accent outline that fills on hover (solid variant inverts the same idea).
 */
const base =
  "inline-flex items-center justify-center gap-2 rounded-[3px] text-xs font-bold uppercase tracking-[0.14em] transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-40";

export const btnSizes = {
  sm: "px-5 py-2.5",
  md: "px-7 py-3.5",
  lg: "px-8 py-4 text-sm",
} as const;

export const btnOutline = `${base} border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground`;

export const btnSolid = `${base} border-2 border-accent bg-accent text-accent-foreground hover:bg-transparent hover:text-accent`;

export const btnGhost = `${base} border-2 border-border text-foreground hover:border-accent hover:text-accent`;
