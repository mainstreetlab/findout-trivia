'use client';

import Link from 'next/link';
import MobileNav from './MobileNav';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

import AvatarContainer from '@/components/AvatarContainer';
import SettingsIcon from "@/app/svg/SettingsIcon";
import NotificationIcon from "@/app/svg/NotificationIcon";
import SettingsModal from "@/components/SettingsModal";
import NotificationSheet from "@/components/NotificationSheet";
import { useNotificationStore } from "@/lib/hooks/useNotificationStore";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";

import FindoutLogo from "@/public/Findout-Logo-v1.png";
import FindoutMonogram from "@/public/Findout-Monogram-v1.png";
import Image from "next/image";

const Header = () => {
  const [top, setTop] = useState(true);
  const pathName = usePathname();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const { unreadCount } = useNotificationStore();

  const scrollHandler = () => {
    window.scrollY >= 15 ? setTop(false) : setTop(true);
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 py-8 xl:py-10 bg-white text-primary z-10 transition-shadow duration-400 ${top ? "border-b border-accent/15" : "shadow-md"}`}
    >
      {/* Position the icons and avatar in the top right corner */}
      <div className="absolute top-2 right-2 flex gap-2 items-center justify-between px-2 py-2">
        {/* Settings Icon */}
        <button
          className="text-gray-600 hover:text-primary transition-colors"
          onClick={() => setSettingsOpen(true)}
        >
          <SettingsIcon />
        </button>

        {/* Notification Icon with Sheet */}
        <Sheet open={notificationsOpen} onOpenChange={setNotificationsOpen}>
          <SheetTrigger asChild>
            <button className="text-gray-600 hover:text-primary transition-colors relative">
              <NotificationIcon />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </button>
          </SheetTrigger>
          <NotificationSheet
            open={notificationsOpen}
            onOpenChange={setNotificationsOpen}
          />
        </Sheet>

        <AvatarContainer />
      </div>

      {/* Settings Modal */}
      <SettingsModal open={settingsOpen} onOpenChange={setSettingsOpen} />

      {pathName.includes("/create") ? (
        <div
          className={`container mx-auto flex flex-col gap-4 items-center justify-center ${!top && "pt-8"} transition-all duration-500 ease-in-out`}
        >
          {/* logo */}
          <Link href="/">
            <h1 className="text-5xl font-extrabold">
              <Image
                src={FindoutLogo}
                alt="Findout Logo"
                height={48}
                width={48}
              />
            </h1>
          </Link>

          <h2 className="text-xl font-medium">Ask Anything</h2>
        </div>
      ) : (
        <div className="container mx-auto flex justify-between items-center">
          {/* logo */}
          <Link href="/">
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
