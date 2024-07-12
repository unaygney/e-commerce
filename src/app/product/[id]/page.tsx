import Container from "@/components/container";
import { getCollectionById, getProductById } from "./actions";
import React from "react";
import ProductDetail from "@/components/product-detail";
import ProductSpecifications from "@/components/product-specifications";
import ProductsGrid from "@/components/products-grid";
import { notFound } from "next/navigation";
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const id = params.id;

  const product = await getProductById(id);

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `${product?.name}'s detail page` || "StyleNest Product Page",
    openGraph: {
      images: [product?.collection.image_url || "", ...previousImages],
    },
  };
}

export async function generateStaticParams() {
  const products = await fetch(
    "https://www.greatfrontend.com/api/projects/challenges/e-commerce/products",
  )
    .then((res) => res.json())
    .then((data) => data.data);

  return products.map((product: any) => ({
    id: product.product_id,
  }));
}

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
