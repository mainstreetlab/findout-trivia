export const coinbaseSmartWalletProxyBytecode =
  "0x363d3d373d3d363d7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc545af43d6000803e6038573d6000fd5b3d6000f3";
export const coinbaseSmartWalletFactoryAddress = "0x0BA5ED0c6AA8c49038F819E587E2633c4A9F428a";
export const coinbaseSmartWalletV1Implementation =
  "0x000100abaad02f1cfC8Bbe32bD5a564817339E72";
export const magicSpendAddress = "0x011A61C07DbF256A68256B1cB51A5e246730aB92";
export const erc1967ProxyImplementationSlot =
  "0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc";
export const usdcBaseAddress =  "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";
export const usdcBaseSepoliaAddress = "0x036CbD53842c5426634e7929541eC2318f3dCF7e";
export const permit2Address = "0x000000000022D473030F116dDEE9F6B43aC78BA3";

export const coinbaseSmartWalletABI = [
  {
    type: "function",
    name: "executeBatch",
    inputs: [
      {
        name: "calls",
        type: "tuple[]",
        internalType: "struct CoinbaseSmartWallet.Call[]",
        components: [
          {
            name: "target",
            type: "address",
            internalType: "address",
          },
          {
            name: "value",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "data",
            type: "bytes",
            internalType: "bytes",
          },
        ],
      },
    ],
    outputs: [],
    stateMutability: "payable",
  },
];