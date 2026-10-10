"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function GoogleSignInButton() {
  const [loading, setLoading] = useState(false);

  async function handleGoogleSignIn() {
    try {
      setLoading(true);

      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (error) {
        toast.error(
          error.message || "Google দিয়ে লগইন করা যায়নি"
        );
        setLoading(false);
      }
    } catch (error) {
      console.error("Google sign-in error:", error);

      toast.error("Google login-এ সমস্যা হয়েছে");
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleGoogleSignIn}
      disabled={loading}
      className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
    >
      <span className="font-bold text-base">G</span>

      {loading
        ? "Google খুলছে..."
        : "Google দিয়ে চালিয়ে যান"}
    </button>
  );
}