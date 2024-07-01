import ProductDetailLoading from "@/components/product-detail/loading";
import ProductSpecificationsLoading from "@/components/product-specifications/loading";
import ProductGridLoading from "@/components/products-grid/loading";
import React from "react";

export default function Loading() {
  return (
    <div>
      <ProductDetailLoading />
      <ProductSpecificationsLoading />
      <ProductGridLoading />
    </div>
  );
}
