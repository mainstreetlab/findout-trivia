"use client"

import { useEffect, useMemo, useState } from "react"
import { useAccount, useWalletClient } from "wagmi"
import { usePrivyWagmi } from "@privy-io/wagmi-connector"
import { usePrivy, useWallets } from '@privy-io/react-auth';
import { useCapabilities } from "wagmi/experimental";
import { Button } from './ui/button';
import { useTransact } from "./TransactOnchain";
import { QuizliteABI } from "@/abi/QuizliteABI";

const CreateButton = () => {
  const { authenticated, login, user } = usePrivy();
  const { ready, wallets } = useWallets();
  const { data: walletClient } = useWalletClient();
  const { setActiveWallet } = usePrivyWagmi();
  const wallet = wallets[0];
  
  const embeddedWallet = useMemo(
      () => wallets.find((wallet) => wallet.walletClientType === "privy"),
      [wallets]
  );

  const smartWallet = useMemo(
    () => wallets.find((wallet) => wallet.walletClientType === "coinbase_wallet"),
    [wallets]
  );

  useEffect(() => setActiveWallet(smartWallet), [smartWallet]);

  //const account = useAccount();
  const { data: availableCapabilities } = useCapabilities({
    account: smartWallet.address,
  });
  const capabilities = useMemo(() => {
    if (!availableCapabilities || !smartWallet.chainId) return;
    const capabilitiesForChain = availableCapabilities[smartWallet.chainId];
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
  }, [availableCapabilities, smartWallet.chainId]);

  const { callContract, status, displayText} = useTransact({
    text: "Create Trivia"
    contracts={[
      {
        address: QuizliteAddress,
        abi: QuizliteABI,
        functionName: "create",
        args: [account.address] [{ name: "answers", type: "uint256[5]", internalType: "uint256[5]" }],
      },
    ]}
    capabilities={capabilities}
  });

  return (
    <>
      {authenticated || user ? (
            <Button type="submit" className="w-3/4 md:w-3/5 px-8" onClick={callContract} disabled={status == "pending"} >
            {displayText}
            </Button>
          ) : (
            <Button type='button' className="w-3/4 md:w-3/5 px-8" onClick={login}>
              Login
            </Button>
          )}
    </>
  )
}

export default CreateButton