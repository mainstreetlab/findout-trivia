import { ENTRYPOINT_ADDRESS_V06, UserOperation } from 'permissionless';
import {
  Address,
  BlockTag,
  Hex,
  decodeAbiParameters,
  decodeFunctionData,
} from 'viem';
import { base, baseSepolia } from 'viem/chains';
import { baseClient, baseSepoliaClient } from './config';
import {
  coinbaseSmartWalletABI,
  coinbaseSmartWalletProxyBytecode,
  coinbaseSmartWalletV1Implementation,
  erc1967ProxyImplementationSlot,
  magicSpendAddress,
  usdcBaseAddress,
  usdcBaseSepoliaAddress
} from './constants';
import { myNFTABI, myNFTAddress } from '@/abi/myNFT';
import {QuizliteABI, QuizliteAddress} from '@/abi/Quizlite';
//import {QuizABI, QuizAddress} from '@/abi/Quiz';

export async function willSponsorBase({
  chainId,
  entrypoint,
  userOp,
}: {
  chainId: number;
  entrypoint: string;
  userOp: UserOperation<'v0.6'>;
}) {
  // check chain id
  if (chainId !== base.id) return false;
  // check entrypoint
  // not strictly needed given below check on implementation address, but leaving as example
  if (entrypoint.toLowerCase() !== ENTRYPOINT_ADDRESS_V06.toLowerCase())
    return false;

  try {
    // check the userOp.sender is a proxy with the expected bytecode
    const code = await baseClient.getBytecode({ address: userOp.sender });
    if (code != coinbaseSmartWalletProxyBytecode) return false;

    // check that userOp.sender proxies to expected implementation
    const implementation = await baseClient.request<{
      Parameters: [Address, Hex, BlockTag];
      ReturnType: Hex;
    }>({
      method: 'eth_getStorageAt',
      params: [userOp.sender, erc1967ProxyImplementationSlot, 'latest'],
    });
    const implementationAddress = decodeAbiParameters(
      [{ type: 'address' }],
      implementation,
    )[0];
    if (implementationAddress != coinbaseSmartWalletV1Implementation)
      return false;

    // check that userOp.callData is making a call we want to sponsor
    const calldata = decodeFunctionData({
      abi: coinbaseSmartWalletABI,
      data: userOp.callData,
    });

    // keys.coinbase.com always uses executeBatch
    if (calldata.functionName !== 'executeBatch') return false;
    if (!calldata.args || calldata.args.length == 0) return false;

    const calls = calldata.args[0] as {
      target: Address;
      value: bigint;
      data: Hex;
    }[];
    // modify if want to allow batch calls to your contract
    if (calls.length > 3) return false;

    let callToCheckIndex = 0;
    if (calls.length > 1) {
      // if there is more than one call, check if the first is a magic spend call
      if (calls[0].target.toLowerCase() !== magicSpendAddress.toLowerCase())
        return false;
      callToCheckIndex = 1;

      //check if the second call is a call to the Quiz contract
      if (calls[1].target.toLowerCase() !== QuizliteAddress.toLowerCase())
        return false;
      callToCheckIndex = 2;
    }


    if (
      calls[callToCheckIndex].target.toLowerCase() !==
      usdcBaseAddress.toLowerCase()
    )
      return false;

    const innerCalldata = decodeFunctionData({
      abi: QuizliteABI,
      data: calls[1].data,
    });

    if (innerCalldata.functionName !== 'create' || innerCalldata.functionName !== 'play') return false;

    return true;
  } catch (e) {
    console.error(`willSponsor check failed: ${e}`);
    return false;
  }
}

export async function willSponsorBaseSepolia({
  chainId,
  entrypoint,
  userOp,
}: {
  chainId: number;
  entrypoint: string;
  userOp: UserOperation<'v0.6'>;
}) {
  // check chain id
  if (chainId !== baseSepolia.id) return false;
  // check entrypoint
  // not strictly needed given below check on implementation address, but leaving as example
  if (entrypoint.toLowerCase() !== ENTRYPOINT_ADDRESS_V06.toLowerCase())
    return false;

  try {
    // check the userOp.sender is a proxy with the expected bytecode
    const code = await baseSepoliaClient.getBytecode({
      address: userOp.sender,
    });
    if (code != coinbaseSmartWalletProxyBytecode) return false;

    // check that userOp.sender proxies to expected implementation
    const implementation = await baseSepoliaClient.request<{
      Parameters: [Address, Hex, BlockTag];
      ReturnType: Hex;
    }>({
      method: 'eth_getStorageAt',
      params: [userOp.sender, erc1967ProxyImplementationSlot, 'latest'],
    });
    const implementationAddress = decodeAbiParameters(
      [{ type: 'address' }],
      implementation,
    )[0];
    if (implementationAddress != coinbaseSmartWalletV1Implementation)
      return false;

    // check that userOp.callData is making a call we want to sponsor
    const calldata = decodeFunctionData({
      abi: coinbaseSmartWalletABI,
      data: userOp.callData,
    });

    // keys.coinbase.com always uses executeBatch
    if (calldata.functionName !== 'executeBatch') return false;
    if (!calldata.args || calldata.args.length == 0) return false;

    const calls = calldata.args[0] as {
      target: Address;
      value: bigint;
      data: Hex;
    }[];
    // modify if want to allow batch calls to your contract
    if (calls.length > 2) return false;

    let callToCheckIndex = 0;
    if (calls.length > 1) {
      // if there is more than one call, check if the first is a magic spend call
      if (calls[0].target.toLowerCase() !== magicSpendAddress.toLowerCase())
        return false;
      callToCheckIndex = 1;
    }

    if (
      calls[callToCheckIndex].target.toLowerCase() !==
      QuizliteAddress.toLowerCase()
    )
      return false;

    const innerCalldata = decodeFunctionData({
      abi: QuizliteABI,
      data: calls[callToCheckIndex].data,
    });
    if (innerCalldata.functionName !== 'create' || innerCalldata.functionName !== 'play') return false;

    return true;
  } catch (e) {
    console.error(`willSponsor check failed: ${e}`);
    return false;
  }
}
