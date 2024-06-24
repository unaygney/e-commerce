import React, { Suspense } from "react";
import ProductDetail from "@/components/product-detail";
import { getProductById } from "@/lib/services";

export default async function Home() {
  const product = await getProductById("urban-drift-bucket-hat");

  return (
    <main className="min-h-screen w-full bg-gray-300 p-4">
      <Suspense fallback={<div>Loading...</div>}>
        <ProductDetail product={product} />
      </Suspense>
    </main>
  );
}
