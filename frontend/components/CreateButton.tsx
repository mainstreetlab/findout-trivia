'use client';

import { useEffect, useMemo } from 'react';
//import { useAccount, useWalletClient } from "privy-io/wagmi";
// wagmi connector is deprecated, update all the deps
import { usePrivyWagmi } from '@privy-io/wagmi';
import { useWallets } from '@privy-io/react-auth';
import Submit from './Submit';

const CreateButton = () => {
  const setActiveWallet = usePrivyWagmi();
  const wallets = useWallets();
  const smartWallet = useMemo(
    () => wallets.find(wallet => wallet.walletClientType === 'coinbase_wallet'),
    [wallets],
  );

  // useEffect(() => setActiveWallet(smartWallet), [smartWallet]);

  //TO DO:
  // Submit funtion in return should take in parameters like:
  // smart contract parameters
  // dynamic inputs of the component: Transact
  return (
    <>
      <Submit />
    </>
  );
};

export default CreateButton;
