import {
    AllowanceTransfer,
    MaxAllowanceTransferAmount,
    PERMIT2_ADDRESS,
    type PermitSingle,
  } from "@uniswap/permit2-sdk";
  import ms from "ms";
  import type { Hex } from "viem";
  import { parseErc6492Signature } from "viem";
  
  const PERMIT_EXPIRATION = ms(`30d`);
  const PERMIT_SIG_EXPIRATION = ms(`30m`);
  
  function toDeadline(expiration: number): number {
    return Math.floor((Date.now() + expiration) / 1000);
  }
  
  interface Permit extends PermitSingle {
    sigDeadline: number;
  }
  
  export interface PermitSignature extends Permit {
    signature: string;
  }
  
  export const abi = [
    {
      type: "function",
      inputs: [
        { name: "owner", internalType: "address", type: "address" },
        {
          name: "permitSingle",
          internalType: "struct IAllowanceTransfer.PermitSingle",
          type: "tuple",
          components: [
            {
              name: "details",
              internalType: "struct IAllowanceTransfer.PermitDetails",
              type: "tuple",
              components: [
                { name: "token", internalType: "address", type: "address" },
                { name: "amount", internalType: "uint160", type: "uint160" },
                { name: "expiration", internalType: "uint48", type: "uint48" },
                { name: "nonce", internalType: "uint48", type: "uint48" }, 
              ],
            },
            { name: "spender", internalType: "address", type: "address" },
            { name: "sigDeadline", internalType: "uint256", type: "uint256" },
          ],
        },
        { name: "signature", internalType: "bytes", type: "bytes" },
      ],
      name: "permit",
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      inputs: [
        { name: "", internalType: "address", type: "address" },
        { name: "", internalType: "address", type: "address" },
        { name: "", internalType: "address", type: "address" },
      ],
      name: "allowance",
      outputs: [
        { name: "amount", internalType: "uint160", type: "uint160" },
        { name: "expiration", internalType: "uint48", type: "uint48" },
        { name: "nonce", internalType: "uint48", type: "uint48" },
      ],
      stateMutability: "view",
    },
  ] as const;
  
  export const allowanceTransferContract = "0x000000000022D473030F116dDEE9F6B43aC78BA3";
  
  export function createPermit(allowance: any): Permit | undefined {
    const dummyToken = "0x0000000000000000000000000000000000000B0b";
    const dummySpender = "0x0000000000000000000000000000000000000B0b";
  
    if (!allowance) return;
  
    return {
      details: {
        token: dummyToken,
        amount: BigInt(MaxAllowanceTransferAmount.toString()),
        expiration: toDeadline(PERMIT_EXPIRATION),
        nonce: allowance[2],
      },
      spender: dummySpender,
      sigDeadline: toDeadline(PERMIT_SIG_EXPIRATION),
    };
  }
  
  export function createPermitData(permit: Permit | undefined, chainId: number) {
    if (!permit) return;
    return AllowanceTransfer.getPermitData(permit, PERMIT2_ADDRESS, chainId);
  }
  
  export function parseSignature(signature: Hex | undefined) {
    if (!signature) return;
    return parseErc6492Signature(signature).signature;
  }