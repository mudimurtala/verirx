import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MOCK_BATCHES, verifyBatch, type VerifyResult } from "@/lib/mock-batches";
import { FloatingShapes } from "@/components/floating-shapes";

const TITLE = "Verify a drug batch — VeriRx";
const DESCRIPTION =
  "Enter a batch ID to check a medicine against its on-chain record. Instant genuine, expired, or not-found result — no account needed.";

export const Route = createFileRoute("/verify")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: VerifyPage,
});

function VerifyPage() {
  const [batchId, setBatchId] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VerifyResult | null>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!batchId.trim()) return;
    setLoading(true);
    setResult(null);
    const res = await verifyBatch(batchId);
    setResult(res);
    setLoading(false);
  };

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="relative overflow-hidden px-6 py-16">
        <FloatingShapes className="opacity-60" />
        <div className="relative z-10 mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold">Verify a product</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Enter the batch ID printed on the pack, or scan its QR code. No wallet or account
          required.
        </p>

        <form
          onSubmit={onSubmit}
          className="mt-8 flex flex-col gap-3 rounded-3xl border border-border bg-surface/60 p-4 sm:flex-row"
        >
          <input
            value={batchId}
            onChange={(e) => setBatchId(e.target.value)}
            placeholder="e.g. VRX-2291-AX"
            className="flex-1 rounded-xl bg-surface-2/60 px-5 py-4 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:ring-1 focus:ring-accent/60"
          />
          <button
            type="button"
            title="QR scanning coming soon"
            className="rounded-xl border border-border px-5 py-4 text-sm font-medium text-muted-foreground transition-colors hover:border-accent/50 hover:text-foreground"
          >
            Scan QR
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 rounded-xl bg-accent px-7 py-4 text-sm font-semibold text-accent-foreground transition-transform duration-200 hover:scale-[1.02] disabled:opacity-50"
          >
            {loading && (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-accent-foreground/40 border-t-accent-foreground" />
            )}
            {loading ? "Checking chain…" : "Verify"}
          </button>
        </form>

        <p className="mt-3 text-xs text-muted-foreground">
          Demo IDs:{" "}
          {MOCK_BATCHES.map((b) => (
            <button
              key={b.batchId}
              onClick={() => setBatchId(b.batchId)}
              className="mr-2 underline underline-offset-4 transition-colors hover:text-accent"
            >
              {b.batchId}
            </button>
          ))}
          or try anything else for a not-found result.
        </p>

        {loading && (
          <div className="mt-8 animate-pulse rounded-3xl border border-border bg-surface/60 p-8">
            <div className="h-4 w-40 rounded bg-surface-2" />
            <div className="mt-4 h-8 w-64 rounded bg-surface-2" />
            <div className="mt-6 h-20 rounded bg-surface-2" />
          </div>
        )}

        {result && !loading && <ResultCard result={result} />}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function ResultCard({ result }: { result: VerifyResult }) {
  if (result.status === "not-found") {
    return (
      <Shell tone="destructive" icon="✕" title="No matching record" subtitle={result.batchId}>
        <p className="text-sm text-muted-foreground">
          This batch ID is not registered on-chain. Do not dispense or consume — report it to
          your regulator.
        </p>
      </Shell>
    );
  }

  const { record } = result;
  const genuine = result.status === "genuine";

  return (
    <Shell
      tone={genuine ? "success" : "warning"}
      icon={genuine ? "✓" : "!"}
      title={genuine ? "Verified genuine" : "Registered but expired"}
      subtitle={record.batchId}
    >
      <dl className="grid gap-4 sm:grid-cols-2">
        <Field label="Drug name" value={record.drugName} />
        <Field label="Manufacturer" value={record.manufacturer} />
        <Field label="Manufactured" value={record.manufactureDate} />
        <Field label="Expires" value={record.expiryDate} />
        <Field label="Transaction" value={record.txSignature} />
      </dl>
      {!genuine && (
        <p className="mt-6 text-sm text-warning">
          This batch is authentic but past its expiry date. Do not dispense.
        </p>
      )}
    </Shell>
  );
}

const TONES = {
  success: "border-accent/40 text-accent",
  warning: "border-warning/40 text-warning",
  destructive: "border-destructive/40 text-destructive",
} as const;

function Shell({
  tone,
  icon,
  title,
  subtitle,
  children,
}: {
  tone: keyof typeof TONES;
  icon: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`mt-8 animate-[rise_0.5s_ease-out_both] rounded-3xl border bg-surface/60 p-8 ${TONES[tone]}`}
    >
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-current text-base">
          {icon}
        </span>
        <div>
          <p className="text-lg font-semibold">{title}</p>
          <p className="font-display text-2xl font-bold text-foreground">{subtitle}</p>
        </div>
      </div>
      <div className="mt-7">{children}</div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs tracking-wide text-muted-foreground uppercase">{label}</dt>
      <dd className="mt-1 text-sm font-medium text-foreground">{value}</dd>
    </div>
  );
}
