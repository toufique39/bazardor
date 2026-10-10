
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";


import { authClient } from "@/lib/auth-client";

export default function ProfileUpdateForm({ currentName }) {
  const router = useRouter();

  const [name, setName] = useState(currentName);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      toast.error("আপনার নাম লিখুন");
      return;
    }

    if (trimmedName === currentName) {
      toast.error("নামে কোনো পরিবর্তন করা হয়নি");
      return;
    }

    try {
      setLoading(true);

      const { error } = await authClient.updateUser({
        name: trimmedName,
      });

      if (error) {
        toast.error(
          error.message || "তথ্য আপডেট করা যায়নি"
        );
        return;
      }

      toast.success("আপনার নাম সফলভাবে আপডেট হয়েছে");

      router.replace("/profile");
      router.refresh();
    } catch (error) {
      console.error("Profile update error:", error);

      toast.error("তথ্য আপডেট করতে সমস্যা হয়েছে");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#eff7f0]">

      <main className="min-h-[65vh] py-10">
        <div className="mx-auto max-w-xl px-4">

          <Link
            href="/profile"
            className="text-sm text-gray-500 transition hover:text-green-600"
          >
            ← প্রোফাইলে ফিরে যান
          </Link>

          <div className="mt-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">

            <p className="text-sm font-semibold text-green-600">
              অ্যাকাউন্ট সেটিংস
            </p>

            <h1 className="mt-2 text-2xl font-extrabold text-gray-900">
              তথ্য আপডেট করুন
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              আপনার প্রোফাইলের নাম পরিবর্তন করুন।
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-6 space-y-5"
            >

              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  নাম
                </label>

                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(event) =>
                    setName(event.target.value)
                  }
                  placeholder="আপনার নাম লিখুন"
                  autoComplete="name"
                  maxLength={100}
                  required
                  disabled={loading}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100 disabled:bg-gray-50"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-green-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "আপডেট হচ্ছে..."
                  : "তথ্য আপডেট করুন"}
              </button>

            </form>

          </div>
        </div>
      </main>

    </div>
  );
}
