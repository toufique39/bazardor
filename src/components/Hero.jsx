export default function Hero() {
  return (
    <section className="bg-[#eff7f0] py-8 md:py-12">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid items-center gap-8 overflow-hidden rounded-3xl bg-white p-6 shadow-sm md:grid-cols-2 md:p-10">

          {/* Left Content */}
          <div>
            <p className="mb-3 text-sm font-semibold text-green-600">
              আজকের বাজার, এক নজরে
            </p>

            <h1 className="text-4xl font-extrabold leading-tight text-gray-900 md:text-5xl">
              আজকের বাজারের দাম
              <br />
              এক নজরে
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-6 text-gray-600 md:text-base">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস ও নিত্যপ্রয়োজনীয়
              পণ্যের সর্বশেষ বাজারদাম এক জায়গায় দেখুন।
            </p>

            <a
              href="#সব-পণ্য"
              className="mt-6 inline-flex items-center rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
            >
              সব দাম দেখুন →
            </a>
          </div>

          {/* Right Image */}
          <div className="flex min-h-[240px] items-center justify-center rounded-2xl bg-[#edf5ed] p-6">
            <div className="text-center">
              <div className="text-8xl md:text-9xl">
                🧺
              </div>

              <p className="mt-3 text-sm font-medium text-gray-500">
                প্রতিদিনের বাজারের দাম
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}