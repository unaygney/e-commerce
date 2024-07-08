import Container from "@/components/container";
import { getCollectionById, getProductById } from "./actions";
import React from "react";
import ProductDetail from "@/components/product-detail";
import ProductSpecifications from "@/components/product-specifications";
import ProductsGrid from "@/components/products-grid";
import { notFound } from "next/navigation";

export default async function Product({ params }: { params: { id: string } }) {
  const { id } = params;

  const product = await getProductById(id);

  if (!product) return notFound();

  let {
    collection: { collection_id },
  } = product;

  let collections = await getCollectionById(collection_id);

  return (
    <Container>
      <ProductDetail product={product} />
      <ProductSpecifications />
      <div className="px-3 py-12 md:px-4 md:py-16 xl:p-24">
        <ProductsGrid products={collections?.data.slice(1, 5)} />
      </div>
    </Container>
  );
}
