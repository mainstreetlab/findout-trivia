"use client";
import * as SliderPrimitive from "@radix-ui/react-slider";
import clsx from "clsx";
import { useState } from "react";

const valueMapping = {
  0: 2,
  1: 5,
  2: 10,
  3: 15,
  4: 30,
  5: 50,
};

const SliderDemo = (props) => {
  const [mappedValues, setMappedValues] = useState(() =>
    props.defaultValue !== undefined
      ? [valueMapping[Math.round(props.defaultValue[0] ?? 0)]]
      : [0],
  );

  return (
    <SliderPrimitive.Root
      className="relative flex items-center select-none touch-none w-[100%] h-1.5 bg-accent/15 rounded-full my-2 mb- mx-2.5"
      onValueChange={(newValues) => {
        const roundedValue = Math.round(newValues[0]);

        const newMappingValue = [valueMapping[roundedValue]];
        setMappedValues(newMappingValue);
      }}
      {...props}
    >
      <SliderPrimitive.Track className="bg-transparent relative grow rounded-full h-[5px]">
        <SliderPrimitive.Range className="absolute bg-accent rounded-full h-full" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb
        className="block w-5 h-5 bg-accent shadow-[0_2px_10px] rounded-full hover:bg-accent-hover focus:outline-none hover:shadow-[0_0_0_4px] hover:shadow-accent-hover/60"
        aria-label="Amount"
      >
        <div className="text-accent-hover absolute left-1/2 bottom-8 h-4 w-fit -translate-x-1/2 text-center text-lg font-semibold">
          ${mappedValues[0]}
        </div>
      </SliderPrimitive.Thumb>
      {/* <div className="flex flex-row justify-between items-center w-full text-primary/70 ml-2"> */}
      <div className="flex items-center justify-between w-full text-primary/70">
        {Array.from({ length: props.max + 1 }).map((_, i) => (
          <span
            key={i}
            className={clsx(
              "text-base font-normal flex items-center justify-center mt-12",
              {
                "ml-4": i > 0,
              },
            )}
            role="presentation"
          >
            ${valueMapping[i]}
          </span>
        ))}
      </div>
    </SliderPrimitive.Root>
  );
};

export default SliderDemo;
