"use client";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Button } from "./ui/button";
import { authClient } from "@/lib/auth-client";
import SigninButton from "./ui/signin-button";
import UserButton from "./user-button";
import LogOutButton from "./logout-button";
import { ModeToggle } from "./mode-toggle";

const MobileNav = () => {
  const pathname = usePathname();
  const {
    data: session,
    isPending, // or isLoading in older versions
    error,
  } = authClient.useSession();
  const isLoggedIn = !isPending && !!session?.user;
  return (
    <header className="flex justify-between items-center fixed h-16 w-full border-b border-purple-100  p-5 lg:hidden">
      <Link href="/" className="flex items-center gap-2 md:py-2">
        <Image
          src="/assets/images/logo-text.svg"
          alt="logo"
          width={180}
          height={28}
        />
      </Link>

      <nav className="flex gap-2">
        <ModeToggle/>
        {isLoggedIn ? (
          <>
            <Sheet>
              <SheetTrigger>
                <Image
                  src="/assets/icons/menu.svg"
                  alt="menu"
                  width={32}
                  height={32}
                  className="cursor-pointer"
                />
              </SheetTrigger>
              <SheetContent className=" border-none shadow-none w-64 p-0 overflow-hidden focus:ring-0 focus:outline-none">
                <SheetTitle>
                  <VisuallyHidden>Sheet Title</VisuallyHidden>
                </SheetTitle>
                <div className="flex flex-col h-full">
                  <Image
                    src="/assets/images/logo-text.svg"
                    alt="logo"
                    width={152}
                    height={23}
                    className="mb-4 pl-4"
                  />

                  <ul className="mt-8 flex w-full flex-col items-start gap-1">
                    <li className="pl-2 pb-4 flex items-center">
                        <UserButton url={session?.user?.image} /> <span>{session?.user.name}</span>
                    </li>
                    {navLinks.map((link) => {
                      const isActive = link.route === pathname;

                      return (
                        <li
                          className={`${
                            isActive &&
                            "bg-purple-gradient bg-cover bg-clip-text text-transparent"
                          } pb-6 pl-4 flex whitespace-nowrap text-dark-700`}
                          key={link.route}
                        >
                          <Link
                            className={`font-semibold text-[16px] leading-[140%] flex size-full gap-4 py-3 w-full cursor-pointer ${
                              isActive ? "purple-100" : ""
                            }`}
                            href={link.route}
                          >
                            <Image
                              src={link.icon}
                              alt="logo"
                              width={24}
                              height={24}
                            />
                            {link.label}
                          </Link>
                        </li>
                      );
                    })}
                    <li className="pl-2">
                        <LogOutButton/>
                    </li>
                  </ul>
                </div>
              </SheetContent>
            </Sheet>
          </>
        ) : (
          <Link href={"/auth/signin"} className="bg-purple-gradient py-2 px-4 rounded-full">
            Sign In
          </Link>
        )}
      </nav>
    </header>
  );
};

export default MobileNav;
