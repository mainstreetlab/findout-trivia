import { http } from "viem";
import { entryPoint07Address } from "viem/account-abstraction";
import { createPimlicoClient } from "permissionless/clients/pimlico";

const basePaymasterService = process.env.CDP_BASE_PAYMASTER_RPC_HOST!;
const baseSepoliaPaymasterService = process.env.CDP_BASESEPOLIA_PAYMASTER_RPC_HOST!;

export const basePaymasterClient = createPimlicoClient({
  transport: http(basePaymasterService),
  entryPoint: { // Optional, defaults to 0.7
		address: entryPoint07Address, 
		version: "0.7", 
	} 
});

export const baseSepoliaPaymasterClient = createPimlicoClient({
  transport: http(baseSepoliaPaymasterService),
  entryPoint: { // Optional, defaults to 0.7
		address: entryPoint07Address, 
		version: "0.7", 
	} 
});