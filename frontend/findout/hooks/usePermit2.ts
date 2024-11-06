import { useState, useMemo, useCallback } from 'react';
import { createPermit, createPermitData, parseSignature, abi, allowanceTransferContract } from '@/utils/permit2Utils';
/*import {
  UseSendCallsParameters,
  UseSendCallsReturnType,
  useWriteContracts,
  useCallsStatus,
} from 'wagmi/experimental';
import { useMemo, useState, useEffect } from 'react';
import { WriteContractsErrorType } from 'viem/experimental';
import { TransactionExecutionError } from 'viem';
import { CallStatus } from './CallStatus'; */
import { useAccount, useReadContract, useSignTypedData } from 'wagmi';
import { useWriteContracts } from 'wagmi/experimental';
import type { Hex } from 'viem';

export const usePermit2 = (chainId: number) => {
  const account = useAccount();
  const [signature, setSignature] = useState<Hex | undefined>(undefined);
  //const [result, setResult] = useState<any>(null);

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
  //const {sendcall} = useSendCalls();

  /*
  export type TransactButtonProps = {
  config extends Config : Config,
  context : unknown,
   } = 

UseSendCallsReturnType<config, context> ['sendCalls'] ['arguments'] & {

  mutation?: UseSendCallsParameters<config, context> ['mutation']; // export type useSendCallsParams = {setLifeCycleStatus: (state:LifeCycleStatus) => void; setTransactionId: (id: string) => void; };

} & { text: string };

export function TransactButton<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>({
  mutation,
  text,
  //contracts,
  ...rest
}: TransactButtonProps<config, context>) {
  
  
  const [error, setError] = useState<string | undefined>(undefined);
  const [id, setId] = useState<string | undefined>(undefined);

  const { writeContracts, status } = useWriteContracts({
    mutation: {
      ...mutation,
      onError: e => {
        if (
          (e as TransactionExecutionError).cause.name ==
          'UserRejectedRequestError'
        ) {
          setError('User rejected request');
        } else {
          setError(e.message);
        }
        mutation.onError(error);
      },
      onSuccess: id => {
        setId(id);
        mutation.onSuccess(id);
      },
    },
  });
  */

  const handleSignAndSubmit = useCallback(async () => {


    if (!permitData) return;

    if (!signature) {
    signTypedData({
      domain: permitData.domain as Record<string, unknown>,
      types: permitData.types,
      message: permitData.values as any,
      primaryType: "PermitSingle",
    });
    }

    //const result = 
    await writeContracts({
      contracts: [
        {
          address: "0x000000000022D473030F116dDEE9F6B43aC78BA3",
          abi,
          functionName: "permit",
          args: [account.address, permitData.values, parsedSignature],
        },
      ],
    });
    /*setResult(result);
    <Transaction
      chainId={BASE_CHAIN_ID} 
      capabilities={{
        paymasterService: {
          url: process.env.CDP_BASESEPOLIA_PAYMASTER_RPC_HOST! ||
          `${document.location.origin}/api/(paymaster)`,
        },
      }} 
      contracts={
          address: "0x000000000022D473030F116dDEE9F6B43aC78BA3",
          abi,
          functionName: "permit",
          args: [account.address, permitData.values, parsedSignature],
      }
    > 
    </Transaction>
    */
    
  }, [permitData, signTypedData, signature, writeContracts, account.address, parsedSignature]);

  return { handleSignAndSubmit, signature};
};