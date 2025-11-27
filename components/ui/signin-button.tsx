import Link from "next/link";
import React from "react";

function SigninButton() {
  return (
    <Link
      href={"/auth/signin"}
      // 1. Added 'flex items-center justify-center' to ensure w-full takes effect
      // 2. Matches the exact padding (p-4) and shape (rounded-full) of your nav items
      className="flex items-center justify-center w-full gap-3 rounded-full bg-purple-gradient bg-cover p-4 text-white shadow-md transition-all hover:shadow-inner focus-visible:ring-offset-0 focus-visible:ring-transparent"
    >
      {/* Optional: Add an icon here if you want it to look exactly like other items */}
      Sign In
    </Link>
  );
}

export default SigninButton;