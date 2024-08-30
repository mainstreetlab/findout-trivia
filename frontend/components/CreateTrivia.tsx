'use client';

import { useEffect, useMemo } from 'react';

// import useAccount from wagmi not privy
import { useAccount} from 'wagmi';
import { base, baseSepolia } from 'viem/chains';
import { useCapabilities } from 'wagmi/experimental';
import { TransactButton } from './TransactButton';
//import { QuizABI, QuizAddress } from '@/abi/Quiz'; 
import { QuizliteABI, QuizliteAddress } from '@/abi/Quizlite';
import { useWallets } from '@privy-io/react-auth';
import { useSetActiveWallet } from '@privy-io/wagmi';

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

  const { data: availableCapabilities } = useCapabilities({
    account: account.address,
  });

  const smartWallet = useMemo(
    () => wallets.find(wallet => wallet.walletClientType === 'coinbase_wallet'),
    [wallets],
  );

  useEffect(() => {
    if (smartWallet) setActiveWallet(smartWallet);
  }, [smartWallet, setActiveWallet]);

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

  const { parsedSignature } = usePermit2(account.chainId!);

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

export default CreateTrivia;