import { useState, useMemo, useCallback } from 'react';
import { createPermit, createPermitData, parseSignature, abi, allowanceTransferContract } from '@/utils/permit2Utils';
import { useAccount, useReadContract, useSignTypedData } from 'wagmi';
//import { useWriteContracts } from 'wagmi/experimental';
import type { Hex } from 'viem';
//import { base, baseSepolia } from 'viem/chains';
//import { useCapabilities } from 'wagmi/experimental';


export const usePermit2 = (chainId: number) => {
  const account = useAccount();
  const [signature, setSignature] = useState<Hex | undefined>(undefined);

  const { data: allowance } = useReadContract({
    abi,
    address: allowanceTransferContract,
    functionName: "allowance",
    args: [account.address!, "0x0000000000000000000000000000000000000B0b", "0x0000000000000000000000000000000000000B0b"],
  });

  const permit = useMemo(() => createPermit(allowance), [allowance]);
  const permitData = useMemo(() => createPermitData(permit, chainId), [permit, chainId]);

  const { signTypedData } = useSignTypedData({
    mutation: { onSuccess: (sig) => setSignature(sig) },
  });

  const parsedSignature = useMemo(() => parseSignature(signature), [signature]);

  const handleSignAndSubmit = useCallback(async () => {
    if (!permitData) return;
    
    if (!signature) {
      await signTypedData({
        domain: permitData.domain as Record<string, unknown>,
        types: permitData.types,
        message: permitData.values as any,
        primaryType: "PermitSingle",
      });
    }
  }, [permitData, signTypedData, signature]);
  //const value!= permitData.values as any;
  return { handleSignAndSubmit, abi, permitData, parsedSignature };
};
