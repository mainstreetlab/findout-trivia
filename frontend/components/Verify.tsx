import { useEffect, useMemo } from 'react';
import { Permit2 } from './Permit2';

//TO DO:
//Submit funtion should take in parameters like:
// smart contract parameters
// dynamic inputs of the component: Transact

interface CreateTriviaProps {
  prize?: number | null;
  answers: number[];
}

const Verify = ({ permit }: CreateTriviaProps) => {
  const { wallets } = useWallets();
  const account = useAccount();
  const { setActiveWallet } = useSetActiveWallet();


  const permitData = useMemo(() => createPermitData(permit, chainId), [permit, chainId]);

  const { signTypedData } = useSignTypedData({
    mutation: { onSuccess: (sig) => setSignature(sig) },
  });

  const parsedSignature = useMemo(() => parseSignature(signature), [signature]);

  const handleSignAndSubmit = useCallback(async () => {
    /*if (!permitData) return;
    
    if (!signature) {
      await signTypedData({
        domain: permitData.domain as Record<string, unknown>,
        types: permitData.types,
        message: permitData.values as any,
        primaryType: "PermitSingle",
      });
    } */

  return(
    <>
    <div className="w-full flex justify-center items-center mb-4">
      {
      <Button
        type="button"
        className="w-3/5 md:w-4/5"
        onClick={() => {
          if (!permitData) return;
          if (!signature) return;
          signTypedData({
            domain: permitData.domain as Record<string, unknown>,
            types: permitData?.types,
            message: permitData.values as any,
            primaryType: 'PermitSingle',
          });
        }}
      >
        Verify
      </Button>
      <>
    }
    );
}