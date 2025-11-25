"use client";
import React from "react";
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
function LogOutButton() {
  const router = useRouter();
  const handleLogOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/auth/signin"); // redirect to login page
        },
      },
    });
  };
  return <Button onClick={handleLogOut}>LogOut</Button>;
}

export default LogOutButton;
