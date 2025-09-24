// ConnectButton.tsx
// -------------------------------------------------------------
// DEMO: Simple Wallet Connect button using Reown (WalletConnect v3)
// Chain examples: Base & Celo
//
// GUIDE:
// 1. Install dependencies in your project
//    npm install @reown/wagmi wagmi viem
//
// 2. Wrap your app with <WagmiProvider> in _app.tsx (Next.js)
//    Example is in README.md of this repo
//
// 3. Import and use <ConnectButton /> anywhere in your UI
//
// NOTE: This is a DEMO for educational purposes only
// -------------------------------------------------------------

"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";
import { Button } from "@/components/ui/button"; // <- optional: replace with your own button
import { injected } from "@reown/wagmi/connectors"; // Reown connector

export default function ConnectButton() {
  // Wallet state hooks
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({ connector: injected() });
  const { disconnect } = useDisconnect();

  // UI logic
  if (isConnected) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">
          Connected: {address?.slice(0, 6)}...{address?.slice(-4)}
        </span>
        <Button
          onClick={() => disconnect()}
          className="rounded-xl px-4 py-2 bg-red-500 text-white hover:bg-red-600"
        >
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <Button
      onClick={() => connect()}
      className="rounded-xl px-4 py-2 bg-blue-600 text-white hover:bg-blue-700"
    >
      Connect Wallet
    </Button>
  );
}
