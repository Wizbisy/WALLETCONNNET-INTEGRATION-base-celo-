// walletConfig.ts
// ---------------------------------------------------------------------------
// EDUCATIONAL DEMO: Wallet configuration for Base & Celo
// using walletconnect v3 (Reown) + wagmi
//
// WHY BOTH NAMES? 
// "WalletConnect" is the original protocol name.
// In v3, the team rebranded to "Reown".
// So you might see both terms in docs. They mean the same thing here.
//
// ---------------------------------------------------------------------------

import { createConfig, http } from 'wagmi'
import { base, celo } from 'wagmi/chains'
import { injected, walletConnect } from '@reown/wagmi/connectors'

// ---------------------------------------------------------------------------
// STEP 1: Choose the chains you want your dApp to support.
//
// In this demo, we’re adding:
// Base (Ethereum L2 by Coinbase)
// Celo (mobile-first EVM chain)
//
// wagmi provides ready-made settings for many chains.
// ---------------------------------------------------------------------------
export const chains = [base, celo]

// ---------------------------------------------------------------------------
// STEP 2: Create the wagmi config.
//
// - chains: supported blockchains
// - transports: how wagmi talks to each chain (http RPC)
// - connectors: wallet options for users
//    • injected() = MetaMask, Coinbase Wallet extension, Brave, etc
//    • walletConnect() = QR code / Mobile wallet connection
//      (this uses walletconnect v3 (Reown))
//
// IMPORTANT: You need a Project ID from Reown dashboard:
//   https://dashboard.reown.com/sign-in
//
// This one Project ID works for all chains.
// ---------------------------------------------------------------------------
export const config = createConfig({
  chains,
  transports: {
    [base.id]: http(), // Public RPC
    [celo.id]: http(),
  },
  connectors: [
    injected(),
    walletConnect({
      projectId: 'YOUR_REOWN_PROJECT_ID', // Replace with your Project ID
    }),
  ],
  ssr: true, // Needed if using Next.js SSR
})
