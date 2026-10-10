
import Link from "next/link";

import Navbar from "@/components/Navbar";


export default function ProfileClient({ user }) {
  const initial = (
    user.name || user.email || "U"
  )
    .trim()
    .charAt(0)
    .toUpperCase();

  return (
    <div className="min-h-screen bg-[#eff7f0]">
      <Navbar />

      <main className="min-h-[65vh] py-10">
        <div className="mx-auto max-w-3xl px-4">

          <div className="mb-6">
            <p className="text-sm font-semibold text-green-600">
              আপনার অ্যাকাউন্ট
            </p>

            <h1 className="mt-2 text-3xl font-extrabold text-gray-900">
              আমার প্রোফাইল
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              আপনার অ্যাকাউন্টের তথ্য দেখুন ও আপডেট করুন।
            </p>
          </div>

          {/* User summary */}
          <section className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center">

            {user.image ? (
              <img
                src={user.image}
                alt={user.name || "Profile"}
                className="h-16 w-16 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-green-100 text-2xl font-bold text-green-700">
                {initial}
              </div>
            )}

            <div className="min-w-0 flex-1">
              <h2 className="text-xl font-bold text-gray-900">
                {user.name || "ব্যবহারকারী"}
              </h2>

              <p className="mt-1 break-all text-sm text-gray-500">
                {user.email}
              </p>

              <p className="mt-2 text-xs text-green-700">
                ✓ আপনার অ্যাকাউন্টে লগইন করা আছে
              </p>
            </div>

          </section>

          {/* Account information */}
          <section className="mt-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

            <h2 className="text-lg font-bold text-gray-900">
              অ্যাকাউন্টের তথ্য
            </h2>

            <div className="mt-5 space-y-4">

              <div>
                <p className="text-xs text-gray-500">
                  নাম
                </p>

                <p className="mt-1 font-medium text-gray-900">
                  {user.name || "নাম দেওয়া হয়নি"}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">
                  ইমেইল
                </p>

                <p className="mt-1 break-all font-medium text-gray-900">
                  {user.email}
                </p>
              </div>

            </div>

            <Link
              href="/profile/update"
              className="mt-6 inline-flex rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
            >
              তথ্য আপডেট করুন →
            </Link>

          </section>

        </div>
      </main>

    </div>
  );
}
