"use client"

import { useMemo} from "react";
import { useAccount } from "wagmi";
import {base, baseSepolia} from "viem/chains";
import { useCapabilities } from "wagmi/experimental";
import { Transact } from "./SendTransaction";
import { QuizliteABI, QuizliteAddress } from '@/abi/Quizlite';

//TO DO:
//Submit funtion should take in parameters like: 
// smart contract parameters
// dynamic inputs of the component: Transact
const Submit = () => {
  const account = useAccount();
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
        if(account.chain === base) {
            return {
                paymasterService: {
                    url:
                        process.env.CDP_BASE_PAYMASTER_RPC_HOST! ||
                        `${document.location.origin}/api/(paymaster)`,
                },
            }
        } else if(account.chain === baseSepolia) {
            return {
                paymasterService: {
                    url:    
                        process.env.CDP_BASESEPOLIA_PAYMASTER_RPC_HOST! || 
                        `${document.location.origin}/api/(paymaster)`,
                }, 
            }
      };
    }
  }, [availableCapabilities, account.chainId]);

  //where to assign smart contract function params
  const params = [1, 2, 3, 4, 5]; 
  
  
  return (
    <>
      <Transact
        text = "Submit" //tx title 
        contracts={[  //contracts params
          {
            address: QuizliteAddress,
            abi: QuizliteABI,
            functionName: "create",
            args: params,
          },
        ]}
        capabilities={capabilities}
      />
    </>
    )
}

export default Submit