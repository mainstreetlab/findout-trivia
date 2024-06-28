"use client";

import { usePrivy } from "@privy-io/react-auth";
import { Button } from "./ui/button";
import { MdOutlineLogin } from "react-icons/md";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

const AvatarContainer = () => {
  const { ready, authenticated, login, user } = usePrivy();

  // Disable login when Privy is not ready or the user is already authenticated
  const disableLogin = !ready || (ready && authenticated);

  return (
    <div className="absolute top-0 right-0 flex gap-2 items-center justify-between px-4 py-3">
      {ready && authenticated ? (
        <>
          <p className="text-sm font-semibold text-primary/80">0 OUT</p>
          <div className="bg-gradient-to-bl from-purple-700 via-blue-700 to-purple-500 w-10 h-10 rounded-full text-lg font-semibold flex items-center justify-center text-white">
            {user!.email?.address.slice(0, 2).toUpperCase()}
          </div>
        </>
      ) : (
        <TooltipProvider delayDuration={275}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" disabled={disableLogin} onClick={login}>
                <MdOutlineLogin className="w-6 h-6" />
              </Button>
            </TooltipTrigger>

            <TooltipContent className="mt-2" side="bottom">
              <p className="text-primary">Login</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
};

export default AvatarContainer;
