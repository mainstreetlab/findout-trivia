'use client';

import { http } from 'wagmi';
import { base, baseSepolia } from 'wagmi/chains';
import { coinbaseWallet } from 'wagmi/connectors';
import { createConfig } from '@privy-io/wagmi';

export const config = createConfig({
  chains: [base, baseSepolia],
  // turn off injected provider discovery
  multiInjectedProviderDiscovery: false,
  connectors: [
    coinbaseWallet({
      appName: 'Wagmi Smart Wallet',
      preference: 'smartWalletOnly',
    }),
  ],
  ssr: true,
  transports: {
    // [base.id]: http(process.env.BASE_RPC_URL!),
    // [baseSepolia.id]: http(process.env.BASE_SEPOLIA_RPC_URL!),
    [base.id]: http(),
    [baseSepolia.id]: http(),
  },
});

export const hostnameConfig =
  process.env.NODE_ENV === 'development'
    ? 'localhost:3000'
    : window.location.hostname;

declare module 'wagmi' {
  interface Register {
    config: typeof config;
  }
}
