"use client";
"use client";
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { PrivyProvider } from "@privy-io/react-auth";
import { base, baseSepolia } from 'viem/chains';
import { WagmiProvider } from '@privy-io/wagmi';
import { NEXT_PUBLIC_CDP_API_KEY, NEXT_PUBLIC_PRIVY_APP_ID } from '../config';
import { useWagmiConfig } from '../wagmi';

type Props = { children: ReactNode };

const queryClient = new QueryClient();

function Providers({ children }: Props) {
  const wagmiConfig = useWagmiConfig();

  return (
    <PrivyProvider
      appId={NEXT_PUBLIC_PRIVY_APP_ID!}
      config={{
        // Customize Privy's appearance in your app
        appearance: {
          theme: 'light',
          accentColor: '#676FFF',
          logo: '',
          walletList: ['coinbase_wallet'],
        },

        defaultChain: base,
        supportedChains: [base, baseSepolia],

        loginMethods: ['email', 'wallet', 'google', 'apple'],

        // Create embedded wallets for users who don't have a wallet - we might have to delay the use of embedded wallet to concentrate our calls through coinbase smart wallet at the moment
        // embeddedWallets: {
        //   createOnLogin: 'users-without-wallets',
        // },

        externalWallets: {
          coinbaseWallet: {
            //Connection options should integrate coinbase smart wallet only
            connectionOptions: 'smartWalletOnly',
          },
        },
      }}
    >
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <OnchainKitProvider apiKey={NEXT_PUBLIC_CDP_API_KEY} chain={base}>
            <RainbowKitProvider modalSize="compact">
              {children}
            </RainbowKitProvider>
          </OnchainKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </PrivyProvider>
  );
};

export default Providers;