import { http, createConfig, configureChains } from "wagmi";
import { base, baseSepolia } from "wagmi/chains";
import { coinbaseWallet } from "wagmi/connectors";
import { alchemyProvider } from "wagmi/providers/alchemy";

export const configureChainsConfig = configureChains(
  [base, baseSepolia],
  [ alchemyProvider({ apiKey: process.env.ALCHEMY_API_KEY! })],
)

export const wagmiConfig = createConfig({
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
    [base.id]: process.env.BASE_RPC_URL!,
    [baseSepolia.id]: process.env.BASE_SEPOLIA_RPC_URL!,
  },
});

declare module "wagmi" {
  interface Register {
    wagmiConfig: typeof wagmiConfig;
    configureChainsConfig: typeof configureChainsConfig;
  }
}