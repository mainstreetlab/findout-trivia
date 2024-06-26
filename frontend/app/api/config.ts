import { createClient, createPublicClient, http } from "viem";
import { base, baseSepolia } from "viem/chains";
import { ENTRYPOINT_ADDRESS_V06 } from "permissionless";
import { paymasterActionsEip7677 } from "permissionless/experimental";

export const baseClient = createPublicClient({
  chain: base,
  transport: http(),
});

export const baseSepoliaClient = createPublicClient({
  chain: baseSepolia,
  transport: http(),
});

const basePaymasterService = process.env.NEXT_PUBLIC_CDP_BASE_PAYMASTER_RPC_HOST!;
const baseSepoliaPaymasterService = process.env.NEXT_PUBLIC_CDP_BASESEPOLIA_PAYMASTER_RPC_HOST!;

export const basePaymasterClient = createClient({
  chain: base,
  transport: http(basePaymasterService),
}).extend(paymasterActionsEip7677({ entryPoint: ENTRYPOINT_ADDRESS_V06 }));

export const baseSepoliaPaymasterClient = createClient({
  chain: baseSepolia,
  transport: http(baseSepoliaPaymasterService),
}).extend(paymasterActionsEip7677({ entryPoint: ENTRYPOINT_ADDRESS_V06 }));