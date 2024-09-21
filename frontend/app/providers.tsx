"use client";
import { useState } from "react";
import { base, baseSepolia} from "viem/chains";
import { PrivyProvider } from '@privy-io/react-auth';
import { WagmiProvider } from '@privy-io/wagmi';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { config } from '@/config';

const Providers = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
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
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={config}>
        <OnchainKitProvider apiKey={process.env.NEXT_PUBLIC_CDP_API_KEY} chain={base}>
          {children} 
        </OnchainKitProvider>
        </WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  );
};

export default Providers;