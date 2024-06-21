"use client";

import { PrivyProvider } from "@privy-io/react-auth";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <PrivyProvider
      appId="clxkjt5d203bnppdob8nsgamf"
      config={{
        // Customize Privy's appearance in your app
        appearance: {
          theme: "light",
          accentColor: "#676FFF",
          logo: "",
        },
        // Create embedded wallets for users who don't have a wallet
        embeddedWallets: {
          createOnLogin: "users-without-wallets",
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
};

export default Providers;
