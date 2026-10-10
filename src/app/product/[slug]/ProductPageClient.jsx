
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { getProductBySlug } from "@/lib/api";
import Navbar from "@/components/Navbar";
import ProductDetails from "@/components/ProductDetails";

export default function ProductPageClient({ slug }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadProduct() {
      try {
        setLoading(true);
        setNotFound(false);

        const data = await getProductBySlug(slug);

        if (!cancelled) {
          setProduct(data);
        }
      } catch (error) {
        console.error("Failed to load product:", error);

        if (!cancelled) {
          setProduct(null);
          setNotFound(true);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadProduct();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (loading) {
    return (
      <>
        <Navbar />

        <main className="min-h-screen bg-[#eff7f0] px-4 py-10">
          <div className="mx-auto max-w-6xl animate-pulse rounded-2xl bg-white p-7">
            <div className="h-16 w-16 rounded-2xl bg-gray-200" />
            <div className="mt-5 h-8 w-64 rounded bg-gray-200" />
            <div className="mt-3 h-4 w-80 max-w-full rounded bg-gray-200" />
          </div>
        </main>
      </>
    );
  }

  if (notFound || !product) {
    return (
      <>
        <Navbar />

        <main className="flex min-h-[70vh] items-center justify-center bg-[#eff7f0] px-4">
          <div className="max-w-md rounded-2xl bg-white p-8 text-center shadow-sm">
            <div className="text-5xl">🔎</div>

            <h1 className="mt-4 text-2xl font-extrabold text-gray-900">
              পণ্য পাওয়া যায়নি
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              আপনি যে পণ্যটি খুঁজছেন সেটি পাওয়া যাচ্ছে না।
            </p>

            <Link
              href="/"
              className="mt-5 inline-flex rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white hover:bg-green-700"
            >
              হোম পেজে ফিরে যান
            </Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <ProductDetails product={product} />
    </>
  );
}
