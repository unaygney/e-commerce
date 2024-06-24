"use client";
import React from "react";
import { ProductThumbnail } from "./product-thumbnail";
import { ProductDetailInfo } from "./product-detail-info";
import { Product } from "@/lib/definitions";

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  return (
    <section className="container mx-auto flex flex-col gap-12 rounded-md bg-white px-4 py-12 shadow-sm lg:flex-row lg:gap-8 lg:p-24">
      <ProductThumbnail product={product} />
      <ProductDetailInfo product={product} />
    </section>
  );
}
