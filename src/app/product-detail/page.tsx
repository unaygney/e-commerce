import ProductDetail from "@/components/product-detail";
import React from "react";
import { Product } from "@/lib/definitions";
import { getProductById } from "@/lib/services";
import ProductSpecifications from "@/components/product-specifications";
import ProductsGrid from "@/components/products-grid";

export default async function ProductDetailPage() {
  const product: Product | undefined = await getProductById("voyager-hoodie");

  if (!product) {
    return <div>Product not found or an error occurred.</div>;
  }
  return (
    <main className="">
      <ProductDetail product={product} />
      <ProductSpecifications />
      <ProductsGrid title="" />
    </main>
  );
}
