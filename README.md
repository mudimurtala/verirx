# VeriRx

Build a modern web app called VeriRx — a drug batch authenticity verification platform built on the Solana blockchain. It lets pharmaceutical manufacturers register drug batch details on-chain, and lets anyone (pharmacists, patients, regulators) instantly verify whether a batch is genuine by looking up its batch ID.

Tech constraints (important — follow exactly)

Use React + TypeScript + Tailwind CSS, built with Vite.

Do NOT add Supabase, any backend framework, database, or authentication system.

Do NOT implement real blockchain logic — this is a UI-only build. All wallet connection, batch registration, and verification results should use mock/static data and simulated states (loading, success, error) so I can wire in the real Solana logic myself afterward.

Keep the codebase clean, componentized, and easy to extend — I will be cloning this to my local machine and building on top of it by hand.

No external UI kits beyond Tailwind — plain Tailwind utility classes, no shadcn/ui or similar unless it's simple to remove later.

Design direction

Dark, bold, confident, tech-forward — similar in spirit to modern enterprise/AI agency sites. Specifically:

Dark background theme (near-black), high contrast white/light text, one accent color (suggest a vivid green or teal to evoke Solana's brand without copying it exactly).

Big, bold hero headline with a short supporting line and a prominent rounded CTA button.

Animated stat counters somewhere on the landing page (e.g. "0 counterfeit batches missed," "100% on-chain," "instant verification") — numbers can be illustrative/mock.

A horizontally scrolling marquee strip (e.g. of partner/regulator-style badges or trust logos — placeholders are fine).

Smooth, subtle motion/transitions on scroll and hover — not flashy, but polished.

Rounded cards with generous spacing, clear visual hierarchy, modern sans-serif typography.

Pages / screens

1. Landing page

Hero section: headline explaining the counterfeit-drug problem and how VeriRx solves it with blockchain verification.

Two clear CTA buttons: "I'm a Manufacturer" (→ Register page) and "Verify a Product" (→ Verify page).

A "How it works" section with 3 numbered steps (Register → Record on-chain → Verify anytime).

Animated stats section (mock numbers).

Trust/marquee strip.

Footer with simple contact/info placeholders.

2. Register Batch page (manufacturer flow)

A "Connect Wallet" button at the top (mock — just toggles a connected/disconnected UI state, shows a fake wallet address once "connected").

A form with fields: Drug Name, Batch ID, Manufacture Date, Expiry Date.

Submit button that shows a loading state, then a success state displaying the batch ID and a placeholder QR code image.

3. Verify Batch page (public flow)

No wallet needed.

An input field for entering a Batch ID (plus a "scan QR" button that can just be a UI placeholder).

On submit, simulate a lookup with a brief loading state, then show one of three mock result states:

✅ Verified genuine — shows drug name, manufacturer, dates.

⚠️ Expired — found but past expiry.

❌ Not found — no matching record.

Naming

Use "VeriRx" as the app name throughout (logo text is fine as styled text, no need for a custom graphic logo).

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/e0aba8c5-6d1b-49e1-8ece-138eab6c6c69).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
