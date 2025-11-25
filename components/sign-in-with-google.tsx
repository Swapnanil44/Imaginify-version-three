"use client";
import { authClient } from "@/lib/auth-client";
import React from "react";
import { Button } from "./ui/button";
import { FaGoogle } from "react-icons/fa";

function SignInWithGoogle() {
  const handleSignInWithGoogle = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button 
      onClick={handleSignInWithGoogle} 
      className="w-full h-11 bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-800 rounded-md transition-all font-medium flex items-center justify-center gap-2"
    >
      <FaGoogle className="text-base" /> 
      <span>SignIn with Google</span>
    </Button>
  );
}

export default SignInWithGoogle;