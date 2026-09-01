import { Link } from "@tanstack/react-router";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/register", label: "Register Batch" },
  { to: "/verify", label: "Verify" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link to="/" className="font-display text-lg font-bold tracking-tight">
          Veri<span className="text-accent">Rx</span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{ className: "text-foreground" }}
              className="transition-colors hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <Link
          to="/verify"
          className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-accent-foreground transition-transform duration-200 hover:scale-[1.03]"
        >
          Verify a product
        </Link>
      </div>
    </header>
  );
}
