"use client";
import { navLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import LogOutButton from "./logout-button";
import { authClient } from "@/lib/auth-client";
import SigninButton from "./ui/signin-button";
import { ModeToggle } from "./mode-toggle";

function SideBar() {
  const {
    data: session,
    isPending, // or isLoading in older versions
    error,
  } = authClient.useSession();

  console.log(session?.user);
  const pathname = usePathname();

  const isLoggedIn = !isPending && !!session?.user;
  return (
    <aside className="hidden h-screen w-72 p-5 shadow-md shadow-purple-200/50 lg:flex">
      <div className="flex size-full flex-col gap-4">
        <div className="flex items-center justify-between w-full md:py-2 mb-6 pl-2">
          <Link href={"/"} className="flex items-center gap-2">
            <Image 
               src="/assets/images/logo-icon.svg" 
               alt="logo" 
               width={28} 
               height={28} 
            />
             {/* Fixed 'bg-linear' to 'bg-gradient' */}
            <h1 className="text-3xl font-bold bg-linear-to-r from-violet-500 to-fuchsia-500 text-transparent bg-clip-text">
              Imaginify
            </h1>
          </Link>
          <ModeToggle />
        </div>

        <nav className="h-full flex-col justify-between md:flex md:gap-4">
          {isLoggedIn ? (
            <>
              <ul className="hidden w-full flex-col items-start gap-2 md:flex">
                {navLinks.slice(0, 6).map((link) => {
                  const isActive = link.route === pathname;
                  return (
                    <li
                      key={link.route}
                      className={`flex-center p-16-semibold w-full whitespace-nowrap rounded-full bg-cover  transition-all hover:bg-purple-100 hover:shadow-inner group ${
                        isActive
                          ? "bg-purple-gradient text-white shadow-md"
                          : "text-gray-700 hover:bg-purple-100 hover:shadow-inner dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
                      }`}
                    >
                      <Link
                        className="p-16-semibold flex size-full gap-4 p-4"
                        href={link.route}
                      >
                        <Image
                          src={link.icon}
                          alt="logo"
                          width={24}
                          height={24}
                          className={`${isActive && "brightness-200"}`}
                        />
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <ul className="hidden w-full flex-col items-start gap-2 md:flex">
                {navLinks.slice(6).map((link) => {
                  const isActive = link.route === pathname;

                  return (
                    <li
                      key={link.route}
                      className={`flex-center p-16-semibold w-full whitespace-nowrap rounded-full bg-cover  transition-all hover:bg-purple-100 hover:shadow-inner group ${
                        isActive
                          ? "bg-purple-gradient text-white shadow-md"
                          : "text-gray-700 hover:bg-purple-100 hover:shadow-inner dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
                      }`}
                    >
                      <Link
                        className="p-16-semibold flex size-full gap-4 p-4"
                        href={link.route}
                      >
                        <Image
                          src={link.icon}
                          alt="logo"
                          width={24}
                          height={24}
                          className={`${isActive && "brightness-200"}`}
                        />
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
                <li className="flex-center w-full cursor-pointer gap-2">
                  <LogOutButton />
                </li>
              </ul>
            </> 
          ) : (
            
            <ul className="hidden w-full flex-col items-start gap-2 md:flex">
              <li className="flex-center w-full cursor-pointer gap-2">
                <SigninButton />
              </li>
            </ul>
          )}
        </nav>
      </div>
    </aside>
  );
}

export default SideBar;
