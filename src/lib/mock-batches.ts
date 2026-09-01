/**
 * Mock on-chain records. Replace this module with real Solana program reads.
 */

export type BatchRecord = {
  batchId: string;
  drugName: string;
  manufacturer: string;
  manufactureDate: string;
  expiryDate: string;
  txSignature: string;
};

export type VerifyStatus = "genuine" | "expired" | "not-found";

export type VerifyResult =
  | { status: "genuine"; record: BatchRecord }
  | { status: "expired"; record: BatchRecord }
  | { status: "not-found"; batchId: string };

export const MOCK_BATCHES: BatchRecord[] = [
  {
    batchId: "VRX-2291-AX",
    drugName: "Amoxicillin 500mg Capsules",
    manufacturer: "Helix Pharmaceuticals Ltd.",
    manufactureDate: "2025-03-14",
    expiryDate: "2027-03-14",
    txSignature: "4bK9…qT2z",
  },
  {
    batchId: "VRX-1180-CD",
    drugName: "Artemether/Lumefantrine 80/480",
    manufacturer: "Meridian Labs",
    manufactureDate: "2022-01-09",
    expiryDate: "2024-01-09",
    txSignature: "7pQ4…mV8d",
  },
];

/** Simulated network + chain latency. */
export function verifyBatch(batchId: string, delay = 1200): Promise<VerifyResult> {
  const id = batchId.trim().toUpperCase();
  return new Promise((resolve) => {
    setTimeout(() => {
      const record = MOCK_BATCHES.find((b) => b.batchId.toUpperCase() === id);
      if (!record) return resolve({ status: "not-found", batchId: id });
      const expired = new Date(record.expiryDate).getTime() < Date.now();
      resolve({ status: expired ? "expired" : "genuine", record });
    }, delay);
  });
}

export const MOCK_WALLET_ADDRESS = "9xQe…4Ttz7Bv1";
