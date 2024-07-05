"use client";

import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./ui/sheet";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { CgMenuRightAlt } from "react-icons/cg";

const MobileNav = () => {
  // const isLoggedIn = true;

  return (
    <Sheet>
      <SheetTrigger className="flex justify-center items-center">
        <CgMenuRightAlt
          fontWeight="bold"
          className="text-[48px] text-violet-600"
        />
      </SheetTrigger>

      <SheetContent className="flex flex-col">
        {/* logo */}
        <SheetClose asChild className="mt-32 mb-40 text-center text-2xl">
          {/* logo */}
          <Link href="/">
            <h1 className="text-5xl font-extrabold">
              Findout
              <span className="text-accent">.</span>
            </h1>
          </Link>
        </SheetClose>

        {/* nav */}
        <nav className="flex flex-col items-center justify-center gap-8"></nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
