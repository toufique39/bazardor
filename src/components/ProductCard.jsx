import Link from "next/link";

import {
  getUnitText,
  toBengaliNumber,
} from "@/lib/utils";

export default function ProductCard({ product }) {
  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block"
    >
      <article className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md">

        {/* Top */}
        <div className="flex items-start justify-between gap-3">

          <div className="flex items-center gap-3">

            {/* Emoji */}
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#edf5ed] text-2xl">
              {product.image}
            </div>

            {/* Name */}
            <div>
              <h3 className="font-bold text-gray-900">
                {product.nameBn}
              </h3>

              <p className="mt-1 text-xs text-gray-500">
                {getUnitText(product.unit)}
              </p>
            </div>

          </div>

          {/* Change */}
          <span
            className={`shrink-0 rounded-full px-2 py-1 text-[11px] font-semibold ${
              isUp
                ? "bg-red-50 text-red-500"
                : isDown
                ? "bg-green-50 text-green-600"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
            {toBengaliNumber(product.change.pct)}%
          </span>

        </div>

        {/* Price */}
        <div className="mt-4 border-t border-gray-100 pt-3">

          <p className="text-xs text-gray-500">
            আজকের দাম
          </p>

          <p className="mt-1 text-xl font-extrabold text-gray-900">
            {toBengaliNumber(product.today)} টাকা
          </p>

        </div>

      </article>
    </Link>
  );
}