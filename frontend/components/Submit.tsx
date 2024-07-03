"use client"

import { useEffect, useMemo } from 'react';
import { useWallets } from '@privy-io/react-auth';
import { useSetActiveWallet } from '@privy-io/wagmi';

// import useAccount from wagmi not privy
import { useAccount } from "wagmi";
import { base, baseSepolia} from "viem/chains";
import { useCapabilities } from "wagmi/experimental";
import { TransactButton } from "./SendTransaction";
import { QuizliteABI, QuizliteAddress } from '@/abi/Quizlite';

//TO DO:
//Submit funtion should take in parameters like: 
// smart contract parameters
// dynamic inputs of the component: Transact

interface SubmitProps {
  answers: number[];
}

const Submit = ({ answers }: SubmitProps) => {
  const account = useAccount();
  const { data: availableCapabilities } = useCapabilities({
    account: account.address,
  });

  const capabilities = useMemo(() => {
    if (!availableCapabilities || !account.chainId) return;
    const capabilitiesForChain = availableCapabilities[account.chainId];
    if (
      capabilitiesForChain['paymasterService'] &&
      capabilitiesForChain['paymasterService'].supported
    ) {
      if (account.chain === base) {
        return {
          paymasterService: {
            url:
              process.env.CDP_BASE_PAYMASTER_RPC_HOST! ||
              `${document.location.origin}/api/(paymaster)`,
          },
        };
      } else if (account.chain === baseSepolia) {
        return {
          paymasterService: {
            url:
              process.env.CDP_BASESEPOLIA_PAYMASTER_RPC_HOST! ||
              `${document.location.origin}/api/(paymaster)`,
          },
        };
      }
    }
  }, [account.chain, availableCapabilities, account.chainId]);

  return (
    <>
      <TransactButton
        text="Submit" //tx title
        contracts={[
          //contracts params
          {
            address: QuizliteAddress,
            abi: QuizliteABI,
            functionName: 'create',
            args: answers,
          },
        ]}
        capabilities={capabilities}
      />
    </>
  );
};

export default Submit