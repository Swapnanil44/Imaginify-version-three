import LogOutButton from "@/components/logout-button";
import { ModeToggle } from "@/components/mode-toggle";
import { navLinks } from "@/constants";
import { auth } from "@/lib/auth";
import { LogOut } from "lucide-react";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  if (session?.user) {
    console.log(session.user);
  }
  return (
    <Suspense>
      <section className="sm:flex justify-center items-center hidden h-72 flex-col gap-4 rounded-[20px] border bg-banner bg-cover bg-no-repeat p-10 shadow-inner">
        <h1 className="text-[36px] font-semibold sm:text-[44px] leading-[120%] sm:leading-[56px] max-w-[500px] flex-wrap text-center text-white shadow-sm">
          Unleash Your Creative Vision with Imaginify
        </h1>
        <ul className="flex justify-center items-center w-full gap-20">
          {navLinks.slice(1, 5).map((link) => (
            <Link
              key={link.route}
              href={link.route}
              className="flex justify-center items-center flex-col gap-2"
            >
              <li className="flex justify-center items-center w-fit rounded-full bg-white p-4">
                <Image src={link.icon} alt="image" width={24} height={24} />
              </li>
              <p className="font-medium text-[14px] leading-[120%] text-center text-white">{link.label}</p>
            </Link>
          ))}
        </ul>
      </section>
    </Suspense>
  );
}
