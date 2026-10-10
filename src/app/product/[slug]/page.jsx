
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import ProductPageClient from "./ProductPageClient";

export default async function ProductPage({ params }) {
  const { slug } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    const callbackURL = `/product/${slug}`;

    redirect(
      `/signin?reason=auth-required&callbackURL=${encodeURIComponent(callbackURL)}`
    );
  }

  return <ProductPageClient slug={slug} />;
}
