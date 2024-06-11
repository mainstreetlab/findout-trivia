"use client";

import Link from "next/link";
import MobileNav from "./MobileNav";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const Header = () => {
  const [top, setTop] = useState(true);
  const pathName = usePathname();

  useEffect(() => {
    const scrollHandler = () => {
      window.scrollY > 10 ? setTop(false) : setTop(true);
    };
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);

  return (
    <header
      className={`py-8 xl:py-12 bg-white text-primary sticky top-0 left-0 right-0 z-10 transition-shadow duration-400 ${top ? "border-b border-accent/15" : `shadow-md`}`}
    >
      {pathName.includes("/create") ? (
        <div
          className={`container mx-auto flex flex-col gap-4 items-center justify-center ${!top && "mt-8"} transition-all duration-500 ease-in-out`}
        >
          {/* logo */}
          <Link href="/">
            <h1 className="text-5xl font-extrabold">
              {top ? "Findout" : "F"}
              <span
                className={`text-accent  inline-flex ${!top ? "-ml-2.5" : "ml-0"}`}
              >
                .
              </span>
            </h1>
          </Link>

          <h2 className="text-xl font-medium">
            Ask 5 Questions, Share Rewards
          </h2>

          <div className="absolute top-0 right-0 flex gap-2 items-center justify-between px-5 py-2.5">
            <p className="text-xl">$0</p>
            <div className="bg-yellow-300 w-10 h-10 rounded-full"></div>
          </div>
        </div>
      ) : (
        <div className="container mx-auto flex justify-between items-center ">
          {/* logo */}
          <Link href="/">
            <h1 className="text-5xl font-extrabold">
              F<span className="text-accent -ml-2.5 inline-flex">.</span>
            </h1>
          </Link>

          {/* mobile nav */}
          <div className="xl:hidden">
            <MobileNav />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
