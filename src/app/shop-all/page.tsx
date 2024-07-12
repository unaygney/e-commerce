import Container from "@/components/container";
import ProductListing from "@/components/product-listing";
import { GetAllProductsParams } from "@/lib/definitions";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "StyleNest | Shop All",
  description: "StyleNest is a fashion e-commerce website.",
};

export default async function ShopAll({ searchParams }: { searchParams: any }) {
  const products = await getAllProducts(searchParams);
  return (
    <Container>
      <ProductListing products={products} />
    </Container>
  );
}

async function getAllProducts(params: GetAllProductsParams = {}): Promise<any> {
  let url = new URL(
    "https://www.greatfrontend.com/api/projects/challenges/e-commerce/products",
  );

  Object.keys(params).forEach((key) => {
    const value = params[key as keyof GetAllProductsParams];
    if (value != null) {
      if (Array.isArray(value)) {
        value.forEach((val) => url.searchParams.append(key, val.toString()));
      } else {
        url.searchParams.append(key, value.toString());
      }
    }
  });

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
}
