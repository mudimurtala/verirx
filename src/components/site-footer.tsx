import { BrandLogo } from "@/components/brand-logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/70 bg-surface/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <BrandLogo size="lg" />

          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            Drug batch authenticity, recorded on Solana. Register once, verify anywhere,
            forever.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold">Contact</p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>hello@verirx.example</li>
            <li>+000 000 0000</li>
            <li>Lagos · Remote</li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold">Resources</p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>Documentation</li>
            <li>Program address</li>
            <li>Regulator access</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/70 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} VeriRx. Demo interface — no live chain data.
      </div>
    </footer>
  );
}
