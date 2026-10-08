import Link from "next/link";

import {
  getUnitText,
  toBengaliNumber,
} from "@/lib/utils";

export default function ProductDetails({
  product,
}) {


  const minimumPrice = Math.min(
    ...product.markets.map((market) => market.min)
  );

  const maximumPrice = Math.max(
    ...product.markets.map((market) => market.max)
  );

  const allPrices = product.markets.flatMap(
    (market) => [market.min, market.max]
  );

  const averagePrice =
    allPrices.reduce(
      (total, price) => total + price,
      0
    ) / allPrices.length;

  const roundedAveragePrice =
    Math.round(averagePrice);

  // --------------------------------------------------
  // Price change
  // --------------------------------------------------

  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  return (
    <main className="min-h-screen bg-[#eff7f0] py-8 md:py-10">

      <div className="mx-auto max-w-6xl px-4">

        {/* ==================================================
            BACK LINK
        ================================================== */}

        <Link
          href="/"
          className="mb-5 inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-green-600"
        >
          ← হোম পেজে ফিরে যান
        </Link>

        {/* ==================================================
            SUMMARY
        ================================================== */}

        <section className="mb-6 rounded-2xl bg-white p-5 shadow-sm md:p-7">

          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

            {/* Product Info */}
            <div className="flex items-start gap-4">

              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#edf5ed] text-4xl">
                {product.image}
              </div>

              <div>
                <p className="text-xs font-medium text-green-600">
                  {product.categoryNameBn}
                </p>

                <h1 className="mt-1 text-3xl font-extrabold text-gray-900 md:text-4xl">
                  {product.nameBn}
                </h1>

                <p className="mt-2 text-sm text-gray-500">
                  আজকের বাজারদাম ও বাজারভিত্তিক মূল্য
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-2">

                  {/* Category */}
                  <span className="rounded-full bg-[#edf5ed] px-3 py-1 text-xs font-medium text-green-700">
                    {product.categoryIcon}{" "}
                    {product.categoryNameBn}
                  </span>

                  {/* Unit */}
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                    {getUnitText(product.unit)}
                  </span>

                </div>
              </div>

            </div>

            {/* Current Price */}
            <div className="rounded-2xl bg-[#edf5ed] px-6 py-4 md:min-w-[180px]">

              <p className="text-xs text-gray-500">
                আজকের দাম
              </p>

              <p className="mt-1 text-3xl font-extrabold text-gray-900">
                {toBengaliNumber(product.today)}
                <span className="ml-1 text-sm font-medium text-gray-500">
                  টাকা
                </span>
              </p>

              <p
                className={`mt-1 text-xs font-semibold ${
                  isUp
                    ? "text-red-500"
                    : isDown
                    ? "text-green-600"
                    : "text-gray-500"
                }`}
              >
                {isUp
                  ? "▲"
                  : isDown
                  ? "▼"
                  : "—"}{" "}
                {toBengaliNumber(product.change.pct)}%
              </p>

            </div>

          </div>

        </section>

        {/* ==================================================
            PRICE SUMMARY
        ================================================== */}

        <section className="mb-6 rounded-2xl bg-white p-5 shadow-sm md:p-7">

          <h2 className="text-xl font-extrabold text-gray-900">
            দামের সারসংক্ষেপ
          </h2>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">

            {/* Minimum */}
            <div className="rounded-xl border border-gray-200 p-4">

              <p className="text-xs text-gray-500">
                সর্বনিম্ন দাম
              </p>

              <p className="mt-2 text-2xl font-extrabold text-green-600">
                {toBengaliNumber(minimumPrice)}
                <span className="ml-1 text-sm font-medium text-gray-500">
                  টাকা
                </span>
              </p>

              <p className="mt-1 text-xs text-gray-400">
                বাজারভেদে সর্বনিম্ন
              </p>

            </div>

            {/* Maximum */}
            <div className="rounded-xl border border-gray-200 p-4">

              <p className="text-xs text-gray-500">
                সর্বোচ্চ দাম
              </p>

              <p className="mt-2 text-2xl font-extrabold text-red-500">
                {toBengaliNumber(maximumPrice)}
                <span className="ml-1 text-sm font-medium text-gray-500">
                  টাকা
                </span>
              </p>

              <p className="mt-1 text-xs text-gray-400">
                বাজারভেদে সর্বোচ্চ
              </p>

            </div>

            {/* Average */}
            <div className="rounded-xl border border-gray-200 p-4">

              <p className="text-xs text-gray-500">
                গড় দাম
              </p>

              <p className="mt-2 text-2xl font-extrabold text-gray-900">
                {toBengaliNumber(roundedAveragePrice)}
                <span className="ml-1 text-sm font-medium text-gray-500">
                  টাকা
                </span>
              </p>

              <p className="mt-1 text-xs text-gray-400">
                সব বাজারের গড়
              </p>

            </div>

          </div>

        </section>

        {/* ==================================================
            MARKET PRICES
        ================================================== */}

        <section className="rounded-2xl bg-white p-5 shadow-sm md:p-7">

          <h2 className="text-xl font-extrabold text-gray-900">
            বাজারভিত্তিক আজকের দাম
          </h2>

          <div className="mt-4 overflow-x-auto">

            <table className="w-full min-w-[650px] border-collapse text-sm">

              <thead>
                <tr className="border-b border-gray-200 bg-[#f7faf7] text-left">

                  <th className="px-4 py-3 font-semibold text-gray-700">
                    বাজার
                  </th>

                  <th className="px-4 py-3 font-semibold text-gray-700">
                    বিভাগ
                  </th>

                  <th className="px-4 py-3 text-right font-semibold text-gray-700">
                    সর্বনিম্ন
                  </th>

                  <th className="px-4 py-3 text-right font-semibold text-gray-700">
                    সর্বোচ্চ
                  </th>

                  <th className="px-4 py-3 text-right font-semibold text-gray-700">
                    গড়
                  </th>

                </tr>
              </thead>

              <tbody>
                {product.markets.map(
                  (market, index) => {

                    const marketAverage =
                      Math.round(
                        (market.min +
                          market.max) /
                          2
                      );

                    return (
                      <tr
                        key={`${market.market}-${index}`}
                        className="border-b border-gray-100 last:border-b-0"
                      >

                        <td className="px-4 py-3 font-medium text-gray-900">
                          {market.market}
                        </td>

                        <td className="px-4 py-3 text-gray-500">
                          {market.division}
                        </td>

                        <td className="px-4 py-3 text-right text-gray-700">
                          {toBengaliNumber(
                            market.min
                          )}{" "}
                          টাকা
                        </td>

                        <td className="px-4 py-3 text-right text-gray-700">
                          {toBengaliNumber(
                            market.max
                          )}{" "}
                          টাকা
                        </td>

                        <td className="px-4 py-3 text-right font-semibold text-gray-900">
                          {toBengaliNumber(
                            marketAverage
                          )}{" "}
                          টাকা
                        </td>

                      </tr>
                    );
                  }
                )}
              </tbody>

            </table>

          </div>

        </section>

      </div>

    </main>
  );
}