import { Connection, PublicKey, Transaction, TransactionInstruction } from "@solana/web3.js";
import { Buffer } from "buffer";

/** The official, live Solana Memo program — writes arbitrary text on-chain. */
export const MEMO_PROGRAM_ID = new PublicKey("MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr");

export type BatchRecord = {
  batchId: string;
  drugName: string;
  manufacturer: string; // wallet address, base58
  manufactureDate: string;
  expiryDate: string;
  registeredAt: string; // ISO timestamp
};

/** Builds an unsigned transaction containing the batch record as a memo. */
export function buildMemoTransaction(record: BatchRecord, payer: PublicKey): Transaction {
  const memoText = JSON.stringify(record);

  const instruction = new TransactionInstruction({
    keys: [{ pubkey: payer, isSigner: true, isWritable: false }],
    programId: MEMO_PROGRAM_ID,
    data: Buffer.from(memoText, "utf-8"),
  });

  const transaction = new Transaction().add(instruction);
  transaction.feePayer = payer;
  return transaction;
}

/** Explorer link for a given transaction signature, on Devnet. */
export function explorerTxUrl(signature: string): string {
  return `https://explorer.solana.com/tx/${signature}?cluster=devnet`;
}
