# Walletconnnet (Reown) Integration – Base & Celo

This repository provides a professional guide to integrating **[Reown](https://reown.com/)** (formerly WalletConnect) into your dApp.  
With this setup, users can seamlessly connect wallets on **Base** and **Celo**, including their testnets.

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Supported Chains](#-supported-chains)
- [Configuration](#-configuration)
- [Application Setup](#-application-setup)
- [Connect Button Component](#-connect-button-component)
- [Forcing a Specific Chain](#-forcing-a-specific-chain)
- [Best Practices](#-best-practices)
- [License](#-license)

---

## Overview

**Reown** (formerly WalletConnect) is the industry standard protocol for wallet connections.  
By following this guide, your dApp will support connections across desktop and mobile wallets for both **Base** and **Celo** ecosystems.

---

## Prerequisites

- Node.js v18+ and npm (or Yarn/PNPM)
- A dApp scaffold (React, Next.js, or similar)
- A [Walletconnnet Project ID](https://dashboard.reown.com/sign-in)

---

## Installation

Install required dependencies:

```bash
npm install wagmi viem @wagmi/core @reown/walletkit
```

or with Yarn:
```bash
yarn add wagmi viem @wagmi/core @reown/walletkit
```

---

## Supported Chains

Base

Network	Chain ID	Currency	RPC URL	Explorer

Mainnet	8453	ETH	https://mainnet.base.org	BaseScan
Sepolia	84532	ETH	https://sepolia.base.org	BaseScan Sepolia


Celo

Network	Chain ID	Currency	RPC URL	Explorer

Mainnet	42220	CELO	https://forno.celo.org	CeloScan
Alfajores	44787	CELO	https://alfajores-forno.celo-testnet.org	CeloScan Alfajores



---

## Configuration

Create walletConfig.ts:
```ts
import { createConfig, http } from "wagmi";
import { base, baseSepolia, celo, celoAlfajores } from "wagmi/chains";
import { walletConnect } from "wagmi/connectors";

// 1. Get a Project ID from Reown Cloud → https://cloud.walletconnect.com
const projectId = "YOUR_REOWN_PROJECT_ID";

export const config = createConfig({
  chains: [base, baseSepolia, celo, celoAlfajores],
  connectors: [
    walletConnect({
      projectId,
      showQrModal: true, // opens QR modal for mobile wallets
    }),
  ],
  transports: {
    [base.id]: http(),
    [baseSepolia.id]: http(),
    [celo.id]: http(),
    [celoAlfajores.id]: http(),
  },
});
```

---

## Application Setup

In your root app file (app.tsx or main.tsx):
```tsx
import { WagmiProvider } from "wagmi";
import { config } from "./walletConfig";

export default function App() {
  return (
    <WagmiProvider config={config}>
      <MyDapp />
    </WagmiProvider>
  );
}
```

---

## Connect Button Component

Create ConnectButton.tsx:
```tsx
"use client";
import { useConnect, useAccount, useDisconnect } from "wagmi";

export default function ConnectButton() {
  const { connect, connectors } = useConnect();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  if (isConnected) {
    return (
      <div>
        <p>✅ Connected: {address}</p>
        <button onClick={() => disconnect()}>Disconnect</button>
      </div>
    );
  }

  return (
    <div>
      {connectors.map((connector) => (
        <button key={connector.uid} onClick={() => connect({ connector })}>
          Connect with {connector.name}
        </button>
      ))}
    </div>
  );
}
```

---

### Forcing a Specific Chain

Connect directly to Base Mainnet:

```tsx
connect({ connector, chainId: 8453 });
```
Connect directly to Celo Mainnet:

```tsx
connect({ connector, chainId: 42220 });
```

---

#### Best Practices:

Always keep your Reown Project ID private.

Test integrations on testnets before deploying to mainnet.

Confirm that both desktop and mobile wallets connect smoothly.

Consider adding network-switching logic for better UX.



---

## 📜 License

This guide is provided under the MIT License.
You are free to use and adapt it for your own projects.


---
