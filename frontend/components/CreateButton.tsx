"use client"

import { useEffect, useMemo, useState } from "react";
import { useAccount, useWalletClient } from "wagmi";
import { usePrivyWagmi } from "@privy-io/wagmi-connector";
import { usePrivy, useWallets } from '@privy-io/react-auth';
import { useCapabilities } from "wagmi/experimental";
import { Button } from './ui/button';
import { Transact } from "./SendTransaction";
import { QuizliteABI, QuizliteAddress } from "@/abi/Quizlite";

const Submit = () => {
  const account = useAccount();
  const {stat, displayText};

  const { data: availableCapabilities } = useCapabilities({
    account: account.address,
  });
  const capabilities = useMemo(() => {
    if (!availableCapabilities || !account.chainId) return;
    const capabilitiesForChain = availableCapabilities[account.chainId];
    if (
      capabilitiesForChain["paymasterService"] &&
      capabilitiesForChain["paymasterService"].supported
    ) {
      return {
        paymasterService: {
          url:
            process.env.CDP_BASESEPOLIA_PAYMASTER_RPC_HOST ||
            `${document.location.origin}/api/paymaster`,
        },
      };
    }
  }, [availableCapabilities, account.chainId]);

  const params = [1, 2, 3, 4, 5]; 

  return (
    <>
      <Transact
        text = "Submit" 
        contracts={[
              {
                address: QuizliteAddress,
                abi: QuizliteABI,
                functionName: "create",
                args: params,
              },
            ]}
            capabilities={capabilities}
      />
      {stat; displayText}
    </>
  )
}

const CreateButton = () => {
  const { authenticated, login, user, connectWallet } = usePrivy();
  const { ready, wallets } = useWallets();
//  const { data: walletClient } = useWalletClient();
  const { setActiveWallet } = usePrivyWagmi();
  //const wallet = wallets[0];

  const smartWallet = useMemo(
    () => wallets.find((wallet) => wallet.walletClientType === "coinbase_wallet"),
    [wallets]
  );

  useEffect(() => setActiveWallet(smartWallet), [smartWallet]);
          //{displayText}
        //disabled={stat == "pending"}
  

  return (
    <>
      {authenticated || user ? (
        <Button type="submit" className="w-3/4 md:w-3/5 px-8" onClick={() => {connectWallet; {(stat; displayedText) = Submit()}}} disabled={stat == "pending"}>  
          Submit
        </Button>
        ) : (
        <Button type='button' className="w-3/4 md:w-3/5 px-8" onClick={() => {login; wallets[0].loginOrLink()}}>
            Login
        </Button>
        )}
    </>
  )
}

export default CreateButton