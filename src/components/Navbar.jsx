
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import { getCategories } from "@/lib/api";
import { authClient } from "@/lib/auth-client";
import PriceTicker from "@/components/PriceTicker";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const { data: session, isPending: sessionPending } =
    authClient.useSession();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [today, setToday] = useState("");

 
  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Failed to load categories:", error);
      } finally {
        setLoading(false);
      }
    }

    loadCategories();
  }, []);

 
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setToday(
      new Date().toLocaleDateString("bn-BD", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    );
  }, []);

 
  async function handleSignOut() {
    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message || "সাইন আউট করা যায়নি");
        return;
      }

      toast.success("সফলভাবে সাইন আউট হয়েছে");
      router.replace("/");
      router.refresh();
    } catch (error) {
      console.error("Sign out error:", error);
      toast.error("সাইন আউট করতে সমস্যা হয়েছে");
    }
  }

  return (
    <header className="border-b border-gray-200 bg-white">
      {/* Top navbar */}
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex min-h-20 flex-wrap items-center justify-between gap-4 py-3">
          <Link href="/" className="shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🛒</span>
              <span className="text-xl font-extrabold text-gray-900">
                বাজার দর
              </span>
            </div>

            <p className="mt-1 text-xs text-gray-500">
              {today}
            </p>
          </Link>

          
          <div className="flex items-center gap-2">
            {sessionPending ? (
              <div className="h-9 w-24 animate-pulse rounded-lg bg-gray-100" />
            ) : session?.user ? (
              <>
                <div className="hidden text-right sm:block">
                  <p className="text-sm font-semibold text-gray-800">
                    {session.user.name}
                  </p>
                  <p className="max-w-40 truncate text-xs text-gray-500">
                    {session.user.email}
                  </p>
                </div>

                <Link
                  href="/profile"
                  className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  প্রোফাইল
                </Link>

                <button
                  type="button"
                  onClick={handleSignOut}
                  className="rounded-lg border border-red-200 px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                >
                  সাইন আউট
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                >
                  সাইন ইন
                </Link>

                <Link
                  href="/signup"
                  className="rounded-lg bg-green-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-green-700"
                >
                  সাইন আপ
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Category navigation */}
      <div className="border-t border-gray-100">
        <div className="mx-auto max-w-6xl px-4">
          <nav
            aria-label="পণ্যের ক্যাটাগরি"
            className="flex gap-2 overflow-x-auto py-3"
          >
            {loading ? (
              <p className="px-2 text-sm text-gray-400">
                ক্যাটাগরি লোড হচ্ছে...
              </p>
            ) : (
              categories.map((category) => {
                const isActive =
                  pathname === `/category/${category.slug}`;

                return (
                  <Link
                    key={category.id}
                    href={`/category/${category.slug}`}
                    aria-current={isActive ? "page" : undefined}
                    className={`flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition ${
                      isActive
                        ? "bg-green-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <span>{category.icon}</span>
                    <span>{category.nameBn}</span>
                  </Link>
                );
              })
            )}
          </nav>
        </div>
      </div>

      {/* Scrolling price ticker */}
      <PriceTicker />
    </header>
  );
}
