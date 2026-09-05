# VeriRx

Verify drug batch authenticity, secured on Solana.

## The story behind this

What does a microbiology graduate have to do with writing code? Most people would not find an easy answer. Neither did I, for a long time.

I studied microbiology at university, and I have spent time close to healthcare, close enough to know how much trust people place in a box of medicine without any real way of checking what is actually inside it.

Long before that, though, I was the kid who could not leave a phone alone. I needed to know how it worked, how a screen full of icons ends up letting me call someone across the country, or how an app turns a thought into something real. That curiosity is what pulled me toward software engineering, and it is still the same curiosity behind almost everything I build.

Web3 sat outside that curiosity for a long time. I found it interesting enough, but I felt I had not earned it yet. I was still learning how the internet itself worked, how software gets built, how it creates real value, how all the pieces I used every day actually fit together. Blockchain felt like a whole new mountain, and I had not finished climbing the one I was already on.

Then MLH happened. If you know the Major League Hacking community, you know they do not let you stay comfortable for long. They push you toward things you would normally put off, new stacks, new ideas, new ways of building. That is how I ended up in the 100 Days of Solana challenge, a daily commitment to learn Solana one small piece at a time.

I did not finish it. After a while, other commitments pulled me away and I had to stop. But something had already shifted by then. I understood enough of Solana to know it was not just hype. I understood wallets, transactions, and what it actually means for something to live permanently on a blockchain, unable to be quietly changed later.

I kept thinking about what to do with that. I went back and forth, asking myself what a project worth finishing would actually look like, until I landed on the idea for VeriRx.

I went back to what I actually know. I know, the way many Nigerians know, that fake and substandard medicine is a real problem here, dangerous enough that agencies like NAFDAC fight it every single day. Counterfeit drugs move through the country from every direction, and once a fake pill is packaged to look close enough to the real one, there is often no easy way for a patient, a pharmacist, or even a regulator to tell the difference on the spot.

That is exactly the kind of problem blockchain is good for. A record that cannot be quietly altered is precisely what drug verification needs. A manufacturer registers a batch once. That record lives on Solana permanently, for anyone to check. A pharmacist, a patient, an inspector, anyone can look up a batch ID and get an honest answer: genuine, expired, or never registered at all.

That is how VeriRx came to be. Two unrelated parts of my life, health and a lifelong curiosity about how technology actually works, finally had a real reason to meet. That is who I am.

## What VeriRx does

- A manufacturer connects a Solana wallet and registers a batch, drug name, batch ID, manufacture date, expiry date, with one signed transaction.
- That transaction is written permanently to Solana (currently Devnet) using the Memo program. Anyone can independently verify it on Solana Explorer, since nothing about it depends on trusting me or this app.
- A Firestore index sits alongside it purely so a batch ID can be looked up instantly. Solana itself has no way to search transactions by their content, so this index exists only to make lookups fast. The blockchain record is what actually guarantees the data has not been tampered with.
- Anyone can enter a batch ID on the Verify page and get an instant result: genuine, expired, or not found.

## Live demo

- Live site: https://verirx.netlify.app
- Demo video: coming soon
- Solana Memo program used: [MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr](https://explorer.solana.com/address/MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr?cluster=devnet)

## Tech stack

- React, TypeScript, TanStack Start, Tailwind CSS, Vite
- @solana/wallet-adapter-react and @solana/web3.js for wallet connection and on chain transactions (Solana Devnet)
- Firebase Firestore as a public lookup index that cannot be tampered with
- Deployed on Netlify

## Getting started

```bash
git clone https://github.com/mudimurtala/verirx.git
cd verirx
npm install
```

This project needs a Firebase project of your own if you are forking it. Create one, enable Firestore, and drop your config into `src/lib/firebase.ts` in place of mine. You will also want to publish the Firestore security rules from this repo before going live, so existing batch records stay immutable.

```bash
npm run dev       # local development
npm run build     # production build
npm run preview   # preview the production build locally
```

You will need a Solana wallet (Phantom or Solflare) set to Devnet, and some Devnet SOL from https://faucet.solana.com/ to pay transaction fees when registering a batch.

## Honest limitations

- This currently runs on Solana Devnet, not Mainnet. It is a working proof of concept, not a live production deployment yet.
- Firestore security rules stop existing records from being tampered with, but they do not yet cryptographically check a write against the real blockchain transaction before accepting it. Closing that gap fully needs a small verification step on the server, a planned next step for that.
- There is no custom program running on Solana yet. Batch data is just written through Solana's own Memo program.

## Acknowledgments

Growing out of what I learned in the 100 Days of Solana challenge. Thanks to MLH for consistently pushing builders like me past what feels comfortable.
