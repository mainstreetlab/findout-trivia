import { createConfig, http } from 'wagmi';
import { base, baseSepolia } from 'wagmi/chains';
import { coinbaseWallet } from 'wagmi/connectors';

export const wagmiConfig = createConfig({
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
    [base.id]: http(process.env.BASE_RPC_URL!),
    [baseSepolia.id]: http(process.env.BASE_SEPOLIA_RPC_URL!),
  },
});

declare module 'wagmi' {
  interface Register {
    wagmiConfig: typeof wagmiConfig;
  }
}
