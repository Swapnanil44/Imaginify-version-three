import SignInWithGitHub from "@/components/sign-in-with-github";
import SignInWithGoogle from "@/components/sign-in-with-google";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

function SignInPage() {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-black p-4">
      <Card className="w-full max-w-sm bg-black border border-zinc-800 shadow-none">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl font-bold tracking-tighter text-white">
            Imaginify
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-4 pt-4">
          <SignInWithGoogle />
          <SignInWithGitHub />
        </CardContent>
      </Card>
      
      <div className="mt-8 text-center text-xs text-zinc-600">
        <p>&copy; 2024 Imaginify. All rights reserved.</p>
      </div>
    </div>
  );
}

export default SignInPage;