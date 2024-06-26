"use client";
import {base, baseSepolia} from "viem/chains"
import { PrivyProvider } from "@privy-io/react-auth";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import {wagmiConfig} from "@/config"

const queryClient = new QueryClient()

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <PrivyProvider
        appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
        config={{
          // Customize Privy's appearance in your app
          appearance: {
            theme: "light",
            accentColor: "#676FFF",
            logo: "",
            walletList: ["coinbase_wallet"],
          },

          defaultChain: base,
          supportedChains: [base, baseSepolia],

          loginMethods: ["email", "wallet", "google", "apple"],
          // Create embedded wallets for users who don't have a wallet - we might have to delay the use of embedded wallet to concentrate our calls through coinbase smart wallet at the moment
          //embeddedWallets: {
          //  createOnLogin: "users-without-wallets",
          // },
          
          externalWallets: {
              coinbaseWallet: {
                  //Connection options should integrate coinbase smart wallet only
                  connectionOptions: "smartWalletOnly",
              },
          },
          }}
        >
          {children}
        </PrivyProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default Providers;
