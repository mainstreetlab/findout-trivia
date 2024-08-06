import { useAccount, ResolvedRegister, type Config } from 'wagmi';
import {
  UseSendCallsParameters,
  UseSendCallsReturnType,
  useWriteContracts,
  useCallsStatus,
} from 'wagmi/experimental';
import { useMemo, useState, useEffect } from 'react';
import { WriteContractsErrorType } from 'viem/experimental';
import { TransactionExecutionError } from 'viem';
import { CallStatus } from './CallStatus';
//import { Permit2 } from "./Permit2";
import { usePrivy, useWallets } from '@privy-io/react-auth';
import { Button } from './ui/button';
//import { config } from '@/config';
import { useSetActiveWallet } from '@privy-io/wagmi';
import { usePermit2 } from '@/hooks/usePermit2';

export type TransactButtonProps<
  config extends Config = Config,
  context = unknown,
> = UseSendCallsReturnType<config, context>['sendCalls']['arguments'] & {
  mutation?: UseSendCallsParameters<config, context>['mutation'];
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

  const { authenticated, login, user, connectWallet } = usePrivy();
  const { wallets } = useWallets();
  const account = useAccount();
  const { signature, signTypedData, permitData } = usePermit2(account.chainId!);
  const { setActiveWallet } = useSetActiveWallet();

  const smartWallet = useMemo(
    () => wallets.find(wallet => wallet.walletClientType === 'coinbase_wallet'),
    [wallets],
  );

  useEffect(() => {
    if (smartWallet) setActiveWallet(smartWallet);
  }, [smartWallet, setActiveWallet]);

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

    /*
      const result = await writeContracts({
        contracts: [
          {
            address: "0x000000000022D473030F116dDEE9F6B43aC78BA3",
            abi,
            functionName: "permit",
            args: [account.address, permitData.values, parsedSignature],
          },
        ],
      });
      setResult(result);
    }*/
  }, [permitData, signTypedData, signature, account.address, parsedSignature]);


  const displayText = useMemo(() => {
    if (status == 'pending') {
      setError(undefined);
      setId(undefined);
      return 'Confirm in popup';
    } else if (!wallets[0]) {
      return 'Verify Account';
    }
    return text;
  }, [text, status]);

  const handleClick = () => {
    if (!user) {
      login();
    }

    if (user) {
      if (!wallets[0]) {
        console.log('wallets', wallets);
        connectWallet();
        if(!signature) {
          handleSignAndSubmit();
        }
      }
      if(!signature) {
        handleSignAndSubmit();
      }
      //if (!wallets[0] === smartWallet) {
      //     wallets[0].loginOrLink();
      //}
    }
    console.log('wallets', wallets);
    writeContracts(rest);
  };

  return (
    <>
      {authenticated || user ? ( 
        <Button
          type="submit"
          className="w-3/5 md:w-4/5"
          onClick={handleClick}
          disabled={status == 'pending'}
        >
          {displayText}
        </Button>
      ) : (
        <Button type="button" className="w-3/5 md:w-4/5" onClick={handleClick}>
          Login
        </Button>
      )}

      {!id && error && <p>error: {error}</p>}
      {id && <CallStatus id={id} />}
    </>
  );
}
