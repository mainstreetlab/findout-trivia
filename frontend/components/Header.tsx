"use client";

import Link from "next/link";
import MobileNav from "./MobileNav";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import AvatarContainer from "@/components/AvatarContainer";

import FindoutLogo from '@/public/Findout-Logo-v1.png';
import FindoutMonogram from '@/public/Findout-Monogram-v1.png';
import Image from 'next/image';

const Header = () => {
  const [top, setTop] = useState(true);
  const pathName = usePathname();

  const scrollHandler = () => {
    window.scrollY >= 15 ? setTop(false) : setTop(true);
  };

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, [top]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 py-8 xl:py-12 bg-white text-primary z-10 transition-shadow duration-400 ${top ? 'border-b border-accent/15' : 'shadow-md'}`}
    >
      {pathName.includes('/create') ? (
        <div
          className={`container mx-auto flex flex-col gap-4 items-center justify-center ${!top && 'pt-8'} transition-all duration-500 ease-in-out`}
        >
          {/* logo */}
          <Link href="/">
            <h1 className="text-5xl font-extrabold">
              {/* {!top ? (
                <Image
                  src={FindoutMonogram}
                  alt="Findout Logo"
                  height={96}
                  width={96}
                />
              ) : (
                <Image
                  src={FindoutLogo}
                  alt="Findout Logo"
                  height={48}
                  width={48}
                />
              )} */}
              <Image
                src={FindoutLogo}
                alt="Findout Logo"
                height={48}
                width={48}
              />
            </h1>
          </Link>

          <h2 className="text-xl font-medium">Ask Anything, Set a Prize</h2>

          <AvatarContainer />
        </div>
      ) : (
        <div className="container mx-auto flex justify-between items-center ">
          {/* logo */}
          <Link href="/">
            {/* <h1 className="text-5xl font-extrabold">
              F<span className="text-accent -ml-2.5 inline-flex">.</span>
            </h1> */}
            <Image
              src={FindoutLogo}
              alt="Findout Logo"
              height={48}
              width={48}
            />
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
