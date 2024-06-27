import { http, createConfig } from "wagmi";
import { base, baseSepolia } from "wagmi/chains";
import { coinbaseWallet } from "wagmi/connectors";

export const config = createConfig({
  chains: [base, baseSepolia],
  // turn off injected provider discovery
  multiInjectedProviderDiscovery: false,
  connectors: [
    coinbaseWallet({
      appName: "Wagmi Smart Wallet",
      preference: "smartWalletOnly",
    }),
  ],
  ssr: true,
  transports: {
    [base.id]: http(),
    [baseSepolia.id]: http(),
  },
});

declare module "wagmi" {
  interface Register {
    wagmiConfig: typeof config;
  }
}