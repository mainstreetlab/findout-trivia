'use client';

import {PrivyProvider} from '@privy-io/react-auth';

  //TO DO
  //Should create embedded wallets for users who don't have a wallet
  //Should Sign in users who have privy accounts using google
  //Should authenthicate every transactions



export default function Providers({children}: {children: React.ReactNode}) {
  return (
    <PrivyProvider
      appId="your-privy-app-id"
      config={{
        // Customize Privy's appearance in your app
        appearance: {
          theme: 'light',
          accentColor: '#676FFF',
          logo: 'https://your-logo-url',
        },

        // Create embedded wallets for users who don't have a wallet
        embeddedWallets: {
          createOnLogin: 'users-without-wallets',
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
}