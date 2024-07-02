import React from "react";
import ProductListing from "@/components/product-listing";

export default async function Home() {
  const getProducs = async () => {
    const response = await fetch(
      "https://www.greatfrontend.com/api/projects/challenges/e-commerce/products?collection=latest",
    );
    const data = await response.json();
    return data;
  };
  const products = await getProducs();
  return (
    <main className="min-h-screen w-full bg-gray-300 p-4">
      <ProductListing products={products} />
    </main>
  );
}
