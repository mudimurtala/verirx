import { Link } from "@tanstack/react-router";
import { BrandLogo } from "@/components/brand-logo";
import { btnOutline, btnSizes } from "@/lib/button-styles";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/register", label: "Register Batch" },
  { to: "/verify", label: "Verify" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
        <Link to="/" aria-label="VeriRx home">
          <BrandLogo />
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
        <Link to="/verify" className={`${btnOutline} ${btnSizes.sm}`}>
          Verify a product
        </Link>
      </div>
    </header>
  );
}
