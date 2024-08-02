'use client';

import { useEffect, useMemo } from 'react';

// import useAccount from wagmi not privy
import { useAccount,  useReadContract } from 'wagmi';
import { base, baseSepolia } from 'viem/chains';
import { useCapabilities } from 'wagmi/experimental';
import { TransactButton } from './TransactButton';
//import { QuizABI, QuizAddress } from '@/abi/Quiz'; 
import { QuizliteABI, QuizliteAddress } from '@/abi/Quizlite';
import { useWallets } from '@privy-io/react-auth';
import { useSetActiveWallet } from '@privy-io/wagmi';
import { createPermit, createPermitData, abi, allowanceTransferContract } from '@/utils/permit2Utils';
import { usePermit2 } from '@/hooks/usePermit2';
import { Permit2 } from './Permit2';

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


  const { data: allowance } = useReadContract({
    abi,
    address: allowanceTransferContract,
    functionName: "allowance",
    args: [account.address!, "0x0000000000000000000000000000000000000B0b", "0x0000000000000000000000000000000000000B0b"],
  });

  const permit = useMemo(() => createPermit(allowance), [allowance]);
  const permitData = useMemo(() => createPermitData(permit, account.chainId!), [permit, account.chainId]);
  //if (!permitData) return;


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
      {/* TODO Define logic to check if permit is signed and set TransactButtton disabled state based on that */}

      {/* ignore the two-button design for now, we'llmerge once we figure out the TODO above */}

      <TransactButton
        text="Create Trivia" //tx title
        contracts={[
          //contracts params
          {
            address: "0x000000000022D473030F116dDEE9F6B43aC78BA3",
            abi: abi,
            functionName: 'permit',
            args: [account.address, permitData!.values, parsedSignature],
          },
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