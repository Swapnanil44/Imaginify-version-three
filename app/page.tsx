import LogOutButton from "@/components/logout-button";
import { ModeToggle } from "@/components/mode-toggle";
import { auth } from "@/lib/auth";
import { LogOut } from "lucide-react";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  if (session?.user) {
    console.log(session.user);
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <ModeToggle />
      {session?.user ? (
        <div className="flex gap-4 p-5 items-center justify-center">
          <LogOutButton />
          <Image src={session.user.image!} alt="User Profile" height={50} width={50} className="rounded-full"/>
        </div>
      ) : (
        <>
          <Link
            href="/auth/signin"
            className="bg-blue-500 text-white px-4 py-2 rounded" // Example Tailwind classes
          >
            Sign In
          </Link>
        </>
      )}
    </div>
  );
}
