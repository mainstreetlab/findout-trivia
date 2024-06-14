"use client";

import SliderDemo from "@/components/CustomSlider";
import { Input } from "@/components/ui/input";

import useQuizStore from "@/hooks/useQuizStore";

const PrizeInput = () => {
  const { prize, setPrize } = useQuizStore((state) => {
    return {
      prize: state.prize,
      setPrize: state.setPrize,
    };
  });

  const handleSetPrize = (amount) => {
    setPrize(amount);
  };

  return (
    <div className="flex flex-col items-center justify-center px-2 gap-2 py-4">
      <h2 className="mb-6 text-2xl font-bold">Set Your Prize</h2>
      <SliderDemo defaultValue={[0]} step={1} min={0} max={5} />
      <div className="flex items-center mt-8 text-sm w-[75%]">
        <hr className="flex-grow border-t border-accent/30" />
        <span className="px-4 text-accent-hover">OR</span>
        <hr className="flex-grow border-t border-accent/30" />
      </div>
      <div className="w-full my-2">
        <Input
          type="number"
          placeholder="Enter prize amount..."
          value={prize === 0 ? "" : prize}
          onChange={(e) => handleSetPrize(parseInt(e.target.value))}
        />
      </div>
    </div>
  );
};

export default PrizeInput;
