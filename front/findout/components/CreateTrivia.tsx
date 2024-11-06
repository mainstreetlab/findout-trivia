'use client';

import { useEffect, useMemo } from 'react';
import {
  Transaction,
  TransactionButton,
  TransactionStatus,
  TransactionStatusAction,
  TransactionStatusLabel,
} from '@coinbase/onchainkit/transaction';
import type {
  TransactionError,
  TransactionResponse,
} from '@coinbase/onchainkit/transaction';
// import useAccount from wagmi not privy
import { useAccount} from 'wagmi';
//import { base, baseSepolia } from 'viem/chains';
//import { useCapabilities } from 'wagmi/experimental';
//import { TransactButton } from './TransactButton';
//import { QuizABI, QuizAddress } from '@/abi/Quiz'; 
import { QuizliteABI, QuizliteAddress } from '@/abi/Quizlite';
import { usePrivy, useWallets } from '@privy-io/react-auth';
import { useSetActiveWallet } from '@privy-io/wagmi';
import { usePermit2 } from '@/hooks/usePermit2';
import { Button } from './ui/button';

//TO DO:
//Submit funtion should take in parameters like:
// smart contract parameters
// dynamic inputs of the component: Transact

interface CreateTriviaProps {
  prize?: number | null;
  answers: number[];
}

const CreateTrivia = ({ prize, answers }: CreateTriviaProps) => {
  const { wallets } = useWallets();
  const account = useAccount();
  const { setActiveWallet } = useSetActiveWallet();
  const { authenticated, login, user, connectWallet } = usePrivy(); 
  //const { wallets } = useWallets();
  //const account = useAccount();
  const { handleSignAndSubmit, signature } = usePermit2(account.chainId!);

/*
  const { data: availableCapabilities } = useCapabilities({
    account: account.address,
  });
*/
  const smartWallet = useMemo(
    () => wallets.find(wallet => wallet.walletClientType === 'coinbase_wallet'),
    [wallets],
  );

  /*
  useEffect(() => {
    if (smartWallet) setActiveWallet(smartWallet);
  }, [smartWallet, setActiveWallet]);

  /*
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
*/

  //const { setActiveWallet } = useSetActiveWallet();
/*
  const smartWallet = useMemo(
    () => wallets.find(wallet => wallet.walletClientType === 'coinbase_wallet'),
    [wallets],
  );
*/
  useEffect(() => {
    if (smartWallet) setActiveWallet(smartWallet);
  }, [smartWallet, setActiveWallet]);

    /*
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
  */
 
  const chainId = useMemo(() => {
    if (prize === null) {
      return 84532;
    } else {
      return 8453;
    }
  }, [prize]);

  const handleError = (err: TransactionError) => {
    console.error('Transaction error:', err);
  };

  const handleSuccess = (response: TransactionResponse) => {
    console.log('Transaction successful', response);
  };

  const handleClick = () => {
    if (!user) {
      login();
    }

    if (user) {
      if (!wallets[0]) {
        console.log('wallets', wallets);
        connectWallet();
        if (!signature) {
        handleSignAndSubmit();
        }
      }
      //handleSignAndSubmit();
      //if (!wallets[0] === smartWallet) {
      //     wallets[0].loginOrLink();
      //}
     // writeContracts(rest);
    }
    //console.log('wallets', wallets);
    //writeContracts(rest);
  };

  return (
    <>
      {authenticated || user ? (
        <Transaction
          contracts={[
            //contracts params
            {
              address: QuizliteAddress,
              abi: QuizliteABI,
              functionName: 'create',
              args: answers,
            },
          ]}
          className="w-[450px]"
         // capabilities={capabilities}
          chainId={chainId}
          onError={handleError}
          onSuccess={handleSuccess} 

        >
          <TransactionButton
            className="w-3/5 md:w-4/5"
            disabled={'pending'}
            text="Submit"
           // onClick={handleClick}
           />
          <TransactionStatus>
            <TransactionStatusLabel />
            <TransactionStatusAction />
          </TransactionStatus>
      </Transaction>
      ) : (
        <Button type="button" className="w-3/5 md:w-4/5" onClick={handleClick}>
          Login
        </Button>
      )}
    </>
  );
};
/*
  //where to assign smart contract function params

  const chainId = useMemo(() => {
    if (prize === null) {
      return 84532;
    } else {
      return 8453;
    }
  }, [prize]);

  // const params = useMemo(()=> {
  //   if (prize === null) {
  //     return {
  //       address: QuizliteAddress,
  //       abi: QuizliteABI,
  //       functionName: 'create',
  //       args: answers,
  //     }
  //   } else {
  //     // no price is set, won't trigger during test
  //     return null
  //     // {
  //     //   address: QuizAddress,
  //     //   abi: QuizABI,
  //     //   functionName: 'create',
  //     //   args: [answers, amount],
  //     // }
  //   }
  // }, [prize])

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
          chainId={chainId}
        />
    </>
  );
};
*/
export default CreateTrivia;