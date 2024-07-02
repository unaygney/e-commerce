import React from "react";
import { getProductById } from "@/lib/services";
import { Product } from "@/lib/definitions";

import ProductListing from "@/components/product-listing";

export default async function Home() {
  const product: Product | undefined = await getProductById("voyager-hoodie");

  if (!product) {
    return <div>Product not found or an error occurred.</div>;
  }

  return (
    <main className="min-h-screen w-full bg-gray-300 p-4">
      <ProductListing />
    </main>
  );
}
