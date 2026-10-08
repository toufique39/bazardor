"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import {
  getCategoryBySlug,
  getProductsByCategory,
} from "@/lib/api";

import ProductCard from "@/components/ProductCard";

export default function CategoryPage() {
  const params = useParams();

  const slug = params.slug;


  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [sortBy, setSortBy] = useState("default");

  
  useEffect(() => {
    async function loadCategory() {
      try {
        setLoading(true);
        setError(false);

        const [categoryData, productData] =
          await Promise.all([
            getCategoryBySlug(slug),
            getProductsByCategory(slug),
          ]);

        setCategory(categoryData);
        setProducts(productData);
      } catch (error) {
        console.error(
          "Failed to load category:",
          error
        );

        setError(true);
        setCategory(null);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      loadCategory();
    }
  }, [slug]);

  

  const sortedProducts = [...products].sort(
    (a, b) => {
      if (sortBy === "low-to-high") {
        return a.today - b.today;
      }

      if (sortBy === "high-to-low") {
        return b.today - a.today;
      }

      return 0;
    }
  );



  if (loading) {
    return (
      <main className="min-h-screen bg-[#eff7f0]">
        <div className="mx-auto max-w-6xl px-4 py-10">

          <div className="mb-6 h-24 animate-pulse rounded-2xl bg-white" />

          <div className="mb-5 flex justify-end">
            <div className="h-10 w-40 animate-pulse rounded-lg bg-white" />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map(
              (_, index) => (
                <div
                  key={index}
                  className="h-40 animate-pulse rounded-2xl bg-white"
                />
              )
            )}
          </div>

        </div>
      </main>
    );
  }



  if (error || !category) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#eff7f0] px-4">
        <div className="max-w-md rounded-2xl bg-white p-8 text-center shadow-sm">

          <div className="text-5xl">
            🔎
          </div>

          <h1 className="mt-4 text-2xl font-extrabold text-gray-900">
            ক্যাটাগরি পাওয়া যায়নি
          </h1>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            আপনি যে ক্যাটাগরিটি খুঁজছেন সেটি
            বর্তমানে পাওয়া যাচ্ছে না।
          </p>

          <Link
            href="/"
            className="mt-5 inline-flex rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
          >
            হোম পেজে ফিরে যান
          </Link>

        </div>
      </main>
    );
  }


  return (
    <main className="min-h-screen bg-[#eff7f0] py-8 md:py-10">

      <div className="mx-auto max-w-6xl px-4">

        <section className="mb-6 rounded-2xl bg-white p-6 shadow-sm">

          <div className="flex items-center gap-4">

            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#edf5ed] text-3xl">
              {category.icon}
            </div>

            <div>
              <p className="text-xs font-medium text-green-600">
                বাজারের পণ্যের ক্যাটাগরি
              </p>

              <h1 className="mt-1 text-3xl font-extrabold text-gray-900">
                {category.nameBn}
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                {products.length}টি পণ্যের আজকের বাজারদাম
              </p>
            </div>

          </div>

        </section>

       
        <div className="mb-5 flex items-center justify-end gap-2">

          <span className="text-sm text-gray-500">
            সাজান
          </span>

          <select
            value={sortBy}
            onChange={(event) =>
              setSortBy(event.target.value)
            }
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:border-green-500"
          >
            <option value="default">
              ডিফল্ট
            </option>

            <option value="low-to-high">
              দাম: কম থেকে বেশি
            </option>

            <option value="high-to-low">
              দাম: বেশি থেকে কম
            </option>
          </select>

        </div>

      
        {sortedProducts.length === 0 ? (
          <div className="rounded-2xl bg-white p-10 text-center">

            <div className="text-5xl">
              📦
            </div>

            <h2 className="mt-4 text-xl font-bold text-gray-900">
              এই ক্যাটাগরিতে কোনো পণ্য নেই
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              অন্য কোনো ক্যাটাগরি দেখুন।
            </p>

            <Link
              href="/"
              className="mt-5 inline-flex rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white"
            >
              হোম পেজে ফিরে যান
            </Link>

          </div>
        ) : (

         
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {sortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}

          </div>

        )}

      </div>

    </main>
  );
}