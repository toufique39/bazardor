"use client";

import { useEffect, useState } from "react";

import { getProducts } from "@/lib/api";
import {
  getUnitText,
  toBengaliNumber,
} from "@/lib/utils";

export default function PriceTicker() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error(
          "Failed to load ticker products:",
          error
        );
      }
    }

    loadProducts();
  }, []);

  if (products.length === 0) {
    return (
      <div className="border-t border-gray-100 bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 py-2">
          <p className="text-xs text-gray-400">
            বাজারের দাম লোড হচ্ছে...
          </p>
        </div>
      </div>
    );
  }

  // Duplicate the products so the ticker can
  // continue moving without an empty gap.
  const tickerProducts = [
    ...products,
    ...products,
  ];

  return (
    <div className="overflow-hidden border-t border-gray-100 bg-white">
      <div className="ticker-track flex w-max">

        {tickerProducts.map((product, index) => (
          <div
            key={`${product.id}-${index}`}
            className="flex shrink-0 items-center gap-2 border-r border-gray-100 px-5 py-3 text-xs"
          >
            {/* Product emoji */}
            <span className="text-sm">
              {product.image}
            </span>

            {/* Product name */}
            <span className="font-medium text-gray-700">
              {product.nameBn}
            </span>

            {/* Price */}
            <span className="font-semibold text-gray-900">
              {toBengaliNumber(product.today)} টাকা/
              {getUnitText(product.unit).replace(
                "প্রতি ",
                ""
              )}
            </span>

            {/* Change */}
            <span
              className={
                product.change.dir === "up"
                  ? "font-semibold text-red-500"
                  : "font-semibold text-green-600"
              }
            >
              {product.change.dir === "up"
                ? "▲"
                : "▼"}{" "}
              {toBengaliNumber(product.change.pct)}%
            </span>
          </div>
        ))}

      </div>
    </div>
  );
}