import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { BatchRecord } from "@/lib/solana-memo";

export type IndexedBatch = BatchRecord & {
  signature: string;
};

/** Save a batch record + its Solana transaction signature, keyed by batchId. */
export async function saveBatchIndex(record: BatchRecord, signature: string): Promise<void> {
  const ref = doc(db, "batches", record.batchId);
  await setDoc(ref, {
    ...record,
    signature,
    indexedAt: serverTimestamp(),
  });
}

/** Look up a previously registered batch by its ID. Returns null if not found. */
export async function lookupBatchIndex(batchId: string): Promise<IndexedBatch | null> {
  const ref = doc(db, "batches", batchId.trim());
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return snap.data() as IndexedBatch;
}

export type VerifyResult =
  | { status: "not-found"; batchId: string }
  | {
      status: "genuine" | "expired";
      record: {
        batchId: string;
        drugName: string;
        manufacturer: string;
        manufactureDate: string;
        expiryDate: string;
        txSignature: string;
      };
    };

/** Public verification: look up a batch and determine genuine vs expired vs not-found. */
export async function verifyBatch(batchId: string): Promise<VerifyResult> {
  const trimmed = batchId.trim();
  const found = await lookupBatchIndex(trimmed);

  if (!found) {
    return { status: "not-found", batchId: trimmed };
  }

  const isExpired = new Date(found.expiryDate).getTime() < Date.now();

  return {
    status: isExpired ? "expired" : "genuine",
    record: {
      batchId: found.batchId,
      drugName: found.drugName,
      manufacturer: found.manufacturer,
      manufactureDate: found.manufactureDate,
      expiryDate: found.expiryDate,
      txSignature: found.signature,
    },
  };
}
