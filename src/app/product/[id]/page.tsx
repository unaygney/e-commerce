import Container from "@/components/container";
import { getProductById } from "./actions";
import React from "react";
import ProductDetail from "@/components/product-detail";

export default async function Product({ params }: { params: { id: string } }) {
  const { id } = params;

  const product = await getProductById(id);

  if (!product) return <div>product not found</div>;

  return (
    <Container>
      <ProductDetail product={product} />
    </Container>
  );
}
