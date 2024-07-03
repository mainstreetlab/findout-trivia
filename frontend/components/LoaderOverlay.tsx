"use client";

import { cn } from "@/lib/utils";
import { usePrivy } from "@privy-io/react-auth"; 
import { CgSpinnerAlt } from "react-icons/cg";

interface LoaderProps  { 
  children: React.ReactNode
}

const LoaderOverlay = ({ children }:LoaderProps) => {
  const { ready } = usePrivy();

  return (
    <div
      className={cn({
        'h-screen w-screen fixed bg-white top-0 pointer-events-none flex flex-col items-center justify-center':
          !ready,
      })}
    >
      {/* {!ready ? <CgSpinnerAlt className="animate-spin w-8 h-8" /> : children} */}
      {children}
    </div>
  );
};

export default LoaderOverlay;