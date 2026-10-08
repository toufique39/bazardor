"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { getCategories } from "@/lib/api";
import PriceTicker from "./PriceTicker";

export default function Navbar() {
  const pathname = usePathname();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [mounted, setMounted] = useState(false);
  const [today, setToday] = useState("");

  
  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error(
          "Failed to load categories:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    loadCategories();
  }, []);


  useEffect(() => {
    setMounted(true);

    const date = new Date();

    const formattedDate = date.toLocaleDateString(
      "bn-BD",
      {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );

    setToday(formattedDate);
  }, []);

  return (
    <header className="border-b border-gray-200 bg-white">

    
      <div className="mx-auto max-w-6xl px-4">

        <div className="flex min-h-20 items-center justify-between gap-4">

          {/* Logo */}
          <Link
            href="/"
            className="shrink-0"
          >
            <div className="flex items-center gap-2">
              <span className="text-2xl">
                🛒
              </span>

              <span className="text-xl font-extrabold text-gray-900">
                বাজার দর
              </span>
            </div>

            <p className="mt-1 text-xs text-gray-500">
              {mounted ? today : ""}
            </p>
          </Link>

          {/* Auth Buttons */}
          <div className="flex items-center gap-2">

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

          </div>

        </div>

      </div>

    
      <div className="border-t border-gray-100">

        <div className="mx-auto max-w-6xl px-4">

          <nav className="flex gap-2 overflow-x-auto py-3">

            {loading ? (
              <p className="px-2 text-sm text-gray-400">
                ক্যাটাগরি লোড হচ্ছে...
              </p>
            ) : (
              categories.map((category) => {

                const isActive =
                  pathname ===
                  `/category/${category.slug}`;

                return (
                  <Link
                    key={category.id}
                    href={`/category/${category.slug}`}
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
 <PriceTicker />
    </header>
  );
}