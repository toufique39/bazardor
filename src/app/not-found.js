import Link from "next/link";


export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#eff7f0]">
   

      <main className="flex min-h-[65vh] items-center justify-center px-4 py-12">
        <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <div className="text-6xl">🔎</div>

          <p className="mt-5 text-sm font-semibold text-green-600">
            বাজার দর
          </p>

          <h1 className="mt-2 text-4xl font-extrabold text-gray-900">
            404
          </h1>

          <h2 className="mt-3 text-xl font-bold text-gray-800">
            পেজটি পাওয়া যায়নি
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            আপনি যে পেজটি খুঁজছেন সেটি নেই অথবা
            সরিয়ে ফেলা হয়েছে।
          </p>

          <Link
            href="/"
            className="mt-6 inline-flex rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
          >
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </main>

    
    </div>
  );
}