import React, { Suspense } from "react";
import ProductDetail from "@/components/product-detail";
import { getProductById } from "@/lib/services";
import { Product } from "@/lib/definitions";
import ProductSpecifications from "@/components/product-specifications";
import ProductsGrid from "@/components/products-grid";
import Footer from "@/components/footer";
export default async function Home() {
  const product: Product | undefined = await getProductById("voyager-hoodie");

  if (!product) {
    return <div>Product not found or an error occurred.</div>;
  }

  return (
    <main className="min-h-screen w-full bg-gray-300 p-10">
      {/* <Suspense fallback={<div>Loading...</div>}>
        <ProductDetail product={product} />
      </Suspense> */}

      {/* <ProductSpecifications /> */}
      {/* <ProductsGrid /> */}
      <Footer />
    </main>
  );
}
