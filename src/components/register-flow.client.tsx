import { useState, type FormEvent } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { SolanaWalletProvider } from "@/lib/solana-wallet-provider";
import { btnGhost, btnOutline, btnSizes, btnSolid } from "@/lib/button-styles";

type FormState = {
  drugName: string;
  batchId: string;
  manufactureDate: string;
  expiryDate: string;
};

const EMPTY: FormState = {
  drugName: "",
  batchId: "",
  manufactureDate: "",
  expiryDate: "",
};

const inputClass =
  "mt-2 w-full rounded-xl border border-input bg-surface-2/60 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-accent/70";

export default function RegisterFlow() {
  return (
    <SolanaWalletProvider>
      <RegisterFlowInner />
    </SolanaWalletProvider>
  );
}

function RegisterFlowInner() {
  const { publicKey, connected, disconnect } = useWallet();
  const { setVisible } = useWalletModal();
  const [form, setForm] = useState<FormState>(EMPTY);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const set = (key: keyof FormState) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!connected) return;
    setStatus("submitting");
    setTimeout(() => setStatus("success"), 1600);
  };

  return (
    <>
      <div className="flex justify-end">
        {connected && publicKey ? (
          <button onClick={() => disconnect()} className={`${btnOutline} ${btnSizes.sm}`}>
            <span className="h-2 w-2 rounded-full bg-accent" />
            {publicKey.toBase58().slice(0, 4)}...{publicKey.toBase58().slice(-4)}
          </button>
        ) : (
          <button onClick={() => setVisible(true)} className={`${btnSolid} ${btnSizes.sm}`}>
            Connect Wallet
          </button>
        )}
      </div>

      {status === "success" ? (
        <SuccessCard
          batchId={form.batchId || "VRX-0000-XX"}
          drugName={form.drugName}
          onReset={() => {
            setForm(EMPTY);
            setStatus("idle");
          }}
        />
      ) : (
        <form
          onSubmit={onSubmit}
          className="mt-8 rounded-2xl border border-border bg-surface/60 p-5 sm:mt-10 sm:rounded-3xl sm:p-8"
        >
          {!connected && (
            <p className="mb-6 rounded-xl border border-border bg-surface-2/60 px-4 py-3 text-sm text-muted-foreground">
              Connect a wallet to enable batch registration.
            </p>
          )}
          <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
            <label className="block sm:col-span-2">
              <span className="text-sm font-medium">Drug name</span>
              <input
                required
                value={form.drugName}
                onChange={set("drugName")}
                placeholder="Amoxicillin 500mg Capsules"
                className={inputClass}
              />
            </label>
            <label className="block sm:col-span-2">
              <span className="text-sm font-medium">Batch ID</span>
              <input
                required
                value={form.batchId}
                onChange={set("batchId")}
                placeholder="VRX-2291-AX"
                className={inputClass}
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium">Manufacture date</span>
              <input
                required
                type="date"
                value={form.manufactureDate}
                onChange={set("manufactureDate")}
                className={inputClass}
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium">Expiry date</span>
              <input
                required
                type="date"
                value={form.expiryDate}
                onChange={set("expiryDate")}
                className={inputClass}
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={!connected || status === "submitting"}
            className={`mt-8 w-full ${btnSolid} ${btnSizes.lg}`}
          >
            {status === "submitting" && (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-accent-foreground/40 border-t-accent-foreground" />
            )}
            {status === "submitting" ? "Writing to chain…" : "Register batch on-chain"}
          </button>
        </form>
      )}
    </>
  );
}

function SuccessCard({
  batchId,
  drugName,
  onReset,
}: {
  batchId: string;
  drugName: string;
  onReset: () => void;
}) {
  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&bgcolor=10-15-14&color=255-255-255&data=${encodeURIComponent(
    batchId,
  )}`;
  return (
    <div className="mt-10 animate-[rise_0.6s_ease-out_both] rounded-3xl border border-accent/40 bg-surface/60 p-8 text-center">
      <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-accent uppercase">
        Batch recorded
      </span>
      <h2 className="mt-5 text-3xl font-bold">{batchId}</h2>
      {drugName && <p className="mt-1 text-sm text-muted-foreground">{drugName}</p>}
      <div className="mt-8 flex justify-center">
        <img
          src={qrSrc}
          alt={`QR code placeholder for batch ${batchId}`}
          width={220}
          height={220}
          loading="lazy"
          className="rounded-2xl border border-border bg-surface-2 p-3"
        />
      </div>
      <p className="mt-6 text-sm text-muted-foreground">
        Print this code on the pack. Anyone can scan it to verify authenticity.
      </p>
      <button onClick={onReset} className={`mt-8 ${btnGhost} ${btnSizes.md}`}>
        Register another batch
      </button>
    </div>
  );
}
