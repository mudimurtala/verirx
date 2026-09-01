type Shape = {
  /** left/top as percentages of the container */
  x: number;
  y: number;
  size: number;
  kind: "ring" | "pill" | "hex" | "cross" | "dot";
  duration: number;
  delay: number;
  opacity: number;
};

const SHAPES: Shape[] = [
  { x: 6, y: 18, size: 88, kind: "ring", duration: 17, delay: 0, opacity: 0.5 },
  { x: 15, y: 68, size: 34, kind: "hex", duration: 21, delay: 2.5, opacity: 0.45 },
  { x: 26, y: 8, size: 18, kind: "dot", duration: 14, delay: 1.2, opacity: 0.7 },
  { x: 36, y: 82, size: 54, kind: "pill", duration: 24, delay: 0.6, opacity: 0.35 },
  { x: 49, y: 12, size: 26, kind: "cross", duration: 19, delay: 3.4, opacity: 0.5 },
  { x: 63, y: 74, size: 120, kind: "ring", duration: 26, delay: 1.8, opacity: 0.3 },
  { x: 78, y: 22, size: 44, kind: "hex", duration: 18, delay: 0.3, opacity: 0.5 },
  { x: 88, y: 60, size: 20, kind: "dot", duration: 15, delay: 2.1, opacity: 0.6 },
  { x: 94, y: 12, size: 62, kind: "pill", duration: 23, delay: 3.9, opacity: 0.32 },
  { x: 70, y: 44, size: 16, kind: "dot", duration: 20, delay: 1.5, opacity: 0.5 },
];

function ShapeGlyph({ kind, size }: { kind: Shape["kind"]; size: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 100 100",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 4,
  } as const;

  switch (kind) {
    case "ring":
      return (
        <svg {...common}>
          <circle cx="50" cy="50" r="44" />
        </svg>
      );
    case "hex":
      return (
        <svg {...common}>
          <polygon points="50,6 90,28 90,72 50,94 10,72 10,28" strokeLinejoin="round" />
        </svg>
      );
    case "pill":
      return (
        <svg {...common} viewBox="0 0 100 50">
          <rect x="3" y="3" width="94" height="44" rx="22" />
          <line x1="50" y1="3" x2="50" y2="47" />
        </svg>
      );
    case "cross":
      return (
        <svg {...common}>
          <path d="M50 14 V86 M14 50 H86" strokeLinecap="round" />
        </svg>
      );
    case "dot":
    default:
      return (
        <svg {...common} fill="currentColor" stroke="none">
          <circle cx="50" cy="50" r="26" />
        </svg>
      );
  }
}

/**
 * Ambient decorative layer: small shapes that drift slowly over the background
 * but stay beneath page content. Purely presentational.
 */
export function FloatingShapes({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 z-0 hidden overflow-hidden text-accent opacity-10 select-none sm:block ${className}`}
    >
      {SHAPES.map((s, i) => (
        <span
          key={i}
          className="absolute motion-reduce:animate-none"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            opacity: s.opacity,
            animation: `drift ${s.duration}s ease-in-out ${s.delay}s infinite`,
          }}
        >
          <span
            className="block motion-reduce:animate-none"
            style={{ animation: `spin-slow ${s.duration * 2}s linear ${s.delay}s infinite` }}
          >
            <ShapeGlyph kind={s.kind} size={s.size} />
          </span>
        </span>
      ))}
    </div>
  );
}
