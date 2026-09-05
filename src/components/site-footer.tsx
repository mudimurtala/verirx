import { BrandLogo } from "@/components/brand-logo";
import { Github } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/70 bg-surface/40">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-8 px-6 py-10 md:grid-cols-4 md:gap-10 md:py-14">
        <div className="col-span-2 min-w-0">
          <BrandLogo size="lg" />
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            Drug batch authenticity, recorded on Solana. Register once, verify anywhere, forever.
          </p>
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold">Contact</p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <a
                href="mailto:ibnmuhyideen95@gmail.com"
                className="text-xs break-words transition-colors hover:text-accent sm:text-sm"
              >
                ibnmuhyideen95@gmail.com
              </a>
            </li>
            <li>
              <a href="tel:+2348140943947" className="transition-colors hover:text-accent">
                +2348140943947
              </a>
            </li>
            <li>Ilorin · Remote</li>
            <li>
              <a
                href="https://github.com/mudimurtala/verirx"
                target="_blank"
                rel="noreferrer"
                aria-label="View source on GitHub"
                className="inline-flex text-muted-foreground transition-colors hover:text-accent"
              >
                <Github className="h-5 w-5" />
              </a>
            </li>
          </ul>
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold">Resources</p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <a
                href="https://github.com/mudimurtala/verirx#readme"
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-accent"
              >
                Documentation
              </a>
            </li>
            <li>
              <a
                href="https://explorer.solana.com/address/MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr?cluster=devnet"
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-accent"
              >
                Memo program
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/70 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} VeriRx. Running on Solana Devnet, not yet on Mainnet.
      </div>
    </footer>
  );
}
