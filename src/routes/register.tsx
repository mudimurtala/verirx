import { createFileRoute } from "@tanstack/react-router";
import { createClientOnlyFn } from "@tanstack/react-start";
import { lazy, Suspense, useEffect, useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const TITLE = "Register a drug batch — VeriRx";
const DESCRIPTION =
  "Manufacturers: connect a wallet and record a drug batch — name, batch ID, manufacture and expiry dates — as an immutable on-chain entry.";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: RegisterPage,
});

const loadRegisterFlow = createClientOnlyFn(() => import("@/components/register-flow.client"));
const RegisterFlow = lazy(loadRegisterFlow);

function LoadingSkeleton() {
  return (
    <div className="mt-10 animate-pulse rounded-3xl border border-border bg-surface/60 p-8">
      <div className="h-4 w-40 rounded bg-surface-2" />
      <div className="mt-6 h-32 rounded bg-surface-2" />
    </div>
  );
}

function RegisterPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 py-16">
        <div>
          <h1 className="text-4xl font-bold">Register a batch</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Manufacturer flow. Records are written to Solana and cannot be edited.
          </p>
        </div>

        {mounted ? (
          <Suspense fallback={<LoadingSkeleton />}>
            <RegisterFlow />
          </Suspense>
        ) : (
          <LoadingSkeleton />
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
