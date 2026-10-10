
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

          {/* Brand */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2"
            >
              <span className="text-2xl" aria-hidden="true">
                🛒
              </span>

              <span className="text-xl font-extrabold text-gray-900">
                বাজার দর
              </span>
            </Link>

            <p className="mt-2 text-sm text-gray-500">
              প্রয়োজনীয় পণ্যের দাম এক নজরে।
            </p>
          </div>

          {/* Disclaimer */}
          <div className="max-w-md md:text-right">
            <p className="text-xs font-semibold text-gray-700">
              মূল্য সংক্রান্ত নোটিশ
            </p>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর
              নির্ভর করে পরিবর্তিত হয়।
            </p>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-7 flex flex-col gap-2 border-t border-gray-100 pt-5 text-xs text-gray-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} বাজার দর। সর্বস্বত্ব সংরক্ষিত।
          </p>

          <Link
            href="/"
            className="font-medium transition hover:text-green-600"
          >
            হোম পেজ
          </Link>
        </div>
      </div>
    </footer>
  );
}
