import React from "react";
import ProductListing from "@/components/product-listing";

export default function Home() {
  // const product: Product | undefined = await getProductById("voyager-hoodie");

  // if (!product) {
  //   return <div>Product not found..</div>;
  // }

  return (
    <main className="min-h-screen w-full bg-gray-300 p-4">
      <ProductListing />
    </main>
  );
}
