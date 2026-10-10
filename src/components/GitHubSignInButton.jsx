
"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function GitHubSignInButton() {
  const [loading, setLoading] = useState(false);

  async function handleGitHubSignIn() {
    try {
      setLoading(true);

      const { error } = await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
      });

      if (error) {
        toast.error(
          error.message || "GitHub দিয়ে লগইন করা যায়নি"
        );
        setLoading(false);
      }
    } catch (error) {
      console.error("GitHub sign-in error:", error);
      toast.error("GitHub login-এ সমস্যা হয়েছে");
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleGitHubSignIn}
      disabled={loading}
      className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
    >
      <span aria-hidden="true">◉</span>
      {loading
        ? "GitHub খুলছে..."
        : "GitHub দিয়ে চালিয়ে যান"}
    </button>
  );
}
