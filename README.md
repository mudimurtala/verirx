# VeriRx

VeriRx is a drug batch authenticity verification platform built on the Solana blockchain. It lets pharmaceutical manufacturers register drug batch details on-chain, and lets anyone — pharmacists, patients, or regulators — instantly verify whether a batch is genuine by looking up its batch ID.

## The problem

Counterfeit and substandard medicine remains a serious, well-documented issue in Nigeria and across Africa. VeriRx aims to make batch verification instant, tamper-proof, and publicly auditable by anchoring batch records on Solana.

## How it works

1. **Register** — A manufacturer connects their wallet and records a batch's details (drug name, batch ID, manufacture date, expiry date) on-chain.
2. **Record** — The record is written to Solana, making it immutable and publicly verifiable.
3. **Verify** — Anyone can look up a batch ID to confirm it's genuine, check its expiry status, or flag it as unregistered.

## Tech stack

- React + TypeScript
- Tailwind CSS
- Vite
- Solana (on-chain verification layer)

## Getting started

```bash
git clone https://github.com/mudimurtala/verirx.git
cd verirx
npm install
npm run dev
```

## Status

Actively in development. The verification and registration flows are being connected to live Solana logic.

## License

TBD