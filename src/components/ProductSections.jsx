"use client";

import { useEffect, useState } from "react";

import { getProducts } from "@/lib/api";
import ProductCard from "./ProductCard";

export default function ProductSections() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();

        setProducts(data);
      } catch (error) {
        console.error(
          "Failed to load products:",
          error
        );

        setError(
          "পণ্যের তথ্য লোড করা যায়নি।"
        );
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  // --------------------------------------------------
  // Top 6 risers
  // --------------------------------------------------

  const risers = [...products]
    .filter(
      (product) =>
        product.change.dir === "up"
    )
    .sort(
      (a, b) =>
        b.change.pct - a.change.pct
    )
    .slice(0, 6);

  // --------------------------------------------------
  // Top 6 fallers
  // --------------------------------------------------

  const fallers = [...products]
    .filter(
      (product) =>
        product.change.dir === "down"
    )
    .sort(
      (a, b) =>
        b.change.pct - a.change.pct
    )
    .slice(0, 6);

  // --------------------------------------------------
  // Loading
  // --------------------------------------------------

  if (loading) {
    return (
      <section className="bg-[#eff7f0] py-10">
        <div className="mx-auto max-w-6xl px-4">

          <div className="mb-8">
            <div className="h-7 w-48 animate-pulse rounded bg-white" />
            <div className="mt-2 h-4 w-72 animate-pulse rounded bg-white" />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 12 }).map(
              (_, index) => (
                <div
                  key={index}
                  className="h-40 animate-pulse rounded-2xl bg-white"
                />
              )
            )}
          </div>

        </div>
      </section>
    );
  }

  // --------------------------------------------------
  // Error
  // --------------------------------------------------

  if (error) {
    return (
      <section className="bg-[#eff7f0] py-10">
        <div className="mx-auto max-w-6xl px-4">

          <div className="rounded-2xl bg-white p-8 text-center">
            <p className="text-sm text-red-500">
              {error}
            </p>
          </div>

        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#eff7f0] py-10">
      <div className="mx-auto max-w-6xl px-4">

        {/* ==================================================
            RISERS
        ================================================== */}

        <section className="mb-12">

          <div className="mb-5">
            <h2 className="text-2xl font-extrabold text-gray-900 md:text-3xl">
              <span className="text-red-500">
                ▲
              </span>{" "}
              আজ দাম বেড়েছে
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              আজ সবচেয়ে বেশি দাম বেড়েছে যেসব পণ্যের
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {risers.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>

        </section>

        {/* ==================================================
            FALLERS
        ================================================== */}

        <section className="mb-12">

          <div className="mb-5">
            <h2 className="text-2xl font-extrabold text-gray-900 md:text-3xl">
              <span className="text-green-600">
                ▼
              </span>{" "}
              আজ দাম কমেছে
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              আজ সবচেয়ে বেশি দাম কমেছে যেসব পণ্যের
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {fallers.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>

        </section>

        {/* ==================================================
            ALL PRODUCTS
        ================================================== */}

        <section id="সব-পণ্য">

          <div className="mb-5">
            <p className="text-sm font-semibold text-green-600">
              আমাদের সম্পূর্ণ তালিকা
            </p>

            <h2 className="mt-1 text-2xl font-extrabold text-gray-900 md:text-3xl">
              সব পণ্য
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              প্রতিদিনের প্রয়োজনীয় সব পণ্যের বর্তমান বাজারদাম
            </p>
          </div>

          {/* All Products Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>

        </section>

      </div>
    </section>
  );
}