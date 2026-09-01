type Size = "sm" | "lg";

/**
 * Boxed wordmark: "Veri" set in the outlined frame, "Rx" reversed out of a
 * solid accent tile, with a tiny tracked caption rule underneath.
 */
export function BrandLogo({ size = "sm" }: { size?: Size }) {
  const lg = size === "lg";
  return (
    <span className="group inline-flex flex-col items-center leading-none">
      <span
        className={`inline-flex items-center gap-1 border-2 border-foreground/85 transition-colors duration-200 group-hover:border-accent ${
          lg ? "gap-1.5 px-3 py-2" : "px-2 py-1.5"
        }`}
      >
        <span
          className={`font-display font-bold tracking-tight ${lg ? "text-2xl" : "text-lg"}`}
        >
          Veri
        </span>
        <span
          className={`font-display flex items-center justify-center bg-accent font-bold tracking-tight text-accent-foreground ${
            lg ? "h-8 min-w-8 px-1.5 text-2xl" : "h-6 min-w-6 px-1 text-lg"
          }`}
        >
          Rx
        </span>
      </span>
      <span
        className={`mt-1 flex w-full items-center gap-1.5 ${lg ? "text-[9px]" : "text-[7px]"}`}
      >
        <span className="h-px flex-1 bg-foreground/40" />
        <span className="font-semibold tracking-[0.35em] text-muted-foreground uppercase">
          Verified
        </span>
        <span className="h-px flex-1 bg-foreground/40" />
      </span>
    </span>
  );
}
