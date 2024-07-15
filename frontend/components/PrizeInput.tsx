"use client";
import React from "react";

import CustomSlider from "@/components/CustomSlider";
import { Input } from "@/components/ui/input";

import useCreateQuizStore, {
  CreateQuizStore,
} from '@/hooks/useCreateQuizStore';

const PrizeInput = () => {
  const { prize, setPrize, isValidatePrize, validatePrize } =
    useCreateQuizStore((state: CreateQuizStore) => {
      return {
        prize: state.prize,
        setPrize: state.setPrize,
        isValidatePrize: state.isValidatePrize,
        validatePrize: state.validatePrize,
      };
    });

  const handleSetPrize = (strAmount: string) => {
    const parsedAmt = Math.max(Number(strAmount), 0);
-(
  // TODO a wagmi/viem hook here, to parse prize in USDC decimals(1e6)

  setPrize(parsedAmt)
);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2 py-4">
      <h2 className="my-2 text-2xl font-bold">Set Your Prize</h2>
      {/* <CustomSlider
        defaultValue={[0]}
        step={1}
        min={0}
        max={5}
        onSetPrize={() => handleSetPrize()}
      /> */}
      {/* <div className="flex items-center mt-8 text-sm w-[75%]">
        <hr className="flex-grow border-t border-accent/30" />
        <span className="px-4 text-accent-hover">OR</span>
        <hr className="flex-grow border-t border-accent/30" />
      </div> */}
      <div className="w-full my-2">
        <Input
          type="number"
          autoComplete="off"
          placeholder="Enter prize amount..."
          value={prize === 0 ? '' : prize}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleSetPrize(e.target.value)
          }
          onBlur={validatePrize}
          onKeyDown={e =>
            ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault()
          }
        />
        <p className="text-sm font-normal text-red-600 mt-1 select-none">
          {isValidatePrize === false && 'Prize must be between $2 and $1000'}
        </p>
      </div>
    </div>
  );
};

export default PrizeInput;
