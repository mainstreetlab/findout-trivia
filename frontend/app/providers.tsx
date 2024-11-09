'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { base } from 'wagmi/chains';
import { http, cookieStorage, createConfig, createStorage } from 'wagmi';
import { coinbaseWallet } from 'wagmi/connectors';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { type ReactNode, useState } from 'react';
import { PrivyProvider } from "@privy-io/react-auth";
import { type State, WagmiProvider } from 'wagmi';
import { 
  NEXT_PUBLIC_ONCHAINKIT_CDP_KEY, NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME,
  NEXT_PUBLIC_ONCHAINKIT_WALLET_CONFIG, 
  NEXT_PUBLIC_PRIVY_APP_ID } from '../config';

const config = createConfig({
  chains: [base],
  connectors: [
    coinbaseWallet({
      appName: NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME,
      preference: NEXT_PUBLIC_ONCHAINKIT_WALLET_CONFIG as
        | 'smartWalletOnly'
        | 'all',
    }),
  ],
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  transports: {
    [base.id]: http(),
  },
});

export default function Providers(props: {
  children: ReactNode;
  initialState?: State;
}) {
  const [queryClient] = useState(() => new QueryClient());

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
      <WagmiProvider config={config} initialState={props.initialState}>
        <QueryClientProvider client={queryClient}>
          <OnchainKitProvider
            apiKey={NEXT_PUBLIC_ONCHAINKIT_CDP_KEY}
            chain={base}
            config={{ appearance: { 
              mode: 'auto',
              theme: 'base',
            } }}
          >
            {props.children}
          </OnchainKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </PrivyProvider>
  );
}
