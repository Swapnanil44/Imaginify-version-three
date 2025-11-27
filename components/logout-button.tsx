"use client";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { LogOut } from "lucide-react"; // Import the icon

function LogOutButton() {
  const router = useRouter();

  const handleLogOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/auth/signin");
        },
      },
    });
  };

  return (
    <Button
      onClick={handleLogOut}
      variant="ghost"
      className="flex w-full items-center justify-start gap-4 rounded-full p-4 transition-all 
                 text-gray-700 hover:bg-purple-100 hover:shadow-inner 
                 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white 
                 h-auto"
    >
      <LogOut className="w-6 h-6" />
      <span className="p-16-semibold">Log Out</span>
    </Button>
  );
}

export default LogOutButton;