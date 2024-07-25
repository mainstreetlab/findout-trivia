import { useState, useMemo, useCallback } from 'react';
import { createPermit, createPermitData, parseSignature, abi, allowanceTransferContract } from '@/utils/permit2Utils';
import { useAccount, useReadContract, useSignTypedData } from 'wagmi';
import { useWriteContracts } from 'wagmi/experimental';
import type { Hex } from 'viem';
import { base, baseSepolia } from 'viem/chains';
import { useCapabilities } from 'wagmi/experimental';


export const usePermit2 = (chainId: number) => {
  const account = useAccount();
  const [signature, setSignature] = useState<Hex | undefined>(undefined);
  const [result, setResult] = useState<any>(null);

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

  const { writeContracts } = useWriteContracts();

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
    const result = await writeContracts({
      contracts: [
        {
          address: "0x000000000022D473030F116dDEE9F6B43aC78BA3",
          abi,
          functionName: "permit",
          args: [account.address, permitData.values, parsedSignature],
        },
      ],
      capabilities: [capabilities]
    });
    setResult(result);
  }, [permitData, signTypedData, signature, writeContracts, account.address, parsedSignature]);

  return { handleSignAndSubmit, result };
};
