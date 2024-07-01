import React from "react";
import { getProductById } from "@/lib/services";
import { Collections, Product } from "@/lib/definitions";
import Footer from "@/components/footer";
import CollectionsGridSection from "@/components/collections-grid-section";

export default async function Home() {
  const product: Product | undefined = await getProductById("voyager-hoodie");

  if (!product) {
    return <div>Product not found or an error occurred.</div>;
  }

  return (
    <main className="min-h-screen w-full bg-gray-300 p-10">
      <Footer />
    </main>
  );
}
