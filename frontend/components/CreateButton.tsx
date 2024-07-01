'use client';

import { useEffect, useMemo } from 'react';

import { useWallets } from '@privy-io/react-auth';
import { useSetActiveWallet } from '@privy-io/wagmi';

import Submit from './Submit';

const CreateButton = () => {
  // destructure the hook's returned object
  const { wallets } = useWallets();
  const { setActiveWallet } = useSetActiveWallet();

  const smartWallet = useMemo(
    () => wallets.find(wallet => wallet.walletClientType === 'coinbase_wallet'),
    [wallets],
  );

  useEffect(() => {
    if (smartWallet) setActiveWallet(smartWallet);
  }, [smartWallet?.address]);

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
