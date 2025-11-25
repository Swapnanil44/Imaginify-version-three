"use client";
import { authClient } from "@/lib/auth-client";
import React from "react";
import { Button } from "./ui/button";
import { FaGithub } from "react-icons/fa";

function SignInWithGitHub() {
  const handleSignInWithGithub = async () => {
    try {
      await authClient.signIn.social({
        provider: "github",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button 
      onClick={handleSignInWithGithub} 
      className="w-full h-11 bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-800 rounded-md transition-all font-medium flex items-center justify-center gap-2"
    >
      <FaGithub className="text-base" /> 
      <span>SignIn with GitHub</span>
    </Button>
  );
}

export default SignInWithGitHub;