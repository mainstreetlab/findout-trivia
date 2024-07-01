"use client"

import { useEffect, useMemo } from "react";
import { useAccount, useWalletClient } from "wagmi";
// wagmi connector is deprecated, update all the deps
// import { usePrivyWagmi } from "@privy-io/wagmi-connector";
import { usePrivy, useWallets } from '@privy-io/react-auth';
import { Button } from './ui/button';
import Submit from './Submit';

const CreateButton = () => {
  const { authenticated, login, user, connectWallet } = usePrivy();
  const { ready, wallets } = useWallets();
  //  const { data: walletClient } = useWalletClient();
  // const { setActiveWallet } = usePrivyWagmi();
  //const wallet = wallets[0];

  connectWallet();

  const smartWallet = useMemo(
    () => wallets.find(wallet => wallet.walletClientType === 'coinbase_wallet'),
    [wallets],
  );

  // useEffect(() => setActiveWallet(smartWallet), [smartWallet]);

  return (
    <>
      {authenticated || user ? (
        <Button
          type="submit"
          className="w-3/4 md:w-3/5 px-8"
          // onClick={}
          // leaving this out till logic is clear
        >
          Submit
        </Button>
      ) : (
        <Button
          type="button"
          className="w-3/4 md:w-3/5 px-8"
          onClick={() => {
            login();
            wallets[0].loginOrLink();
          }}
        >
          Login
        </Button>
      )}
    </>
  );
};

export default CreateButton