import React from "react";
import Hero from "@/components/hero";
import Container from "@/components/container";
import ProductsGrid from "@/components/products-grid";
import Link from "next/link";
import CollectionsGridSection from "@/components/collections-grid-section";
import Features from "@/components/features";
import { buttonVariants } from "@/components/button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "StyleNest | Home",
  description: "StyleNest is a fashion e-commerce website.",
};

export default async function Home() {
  const products = await getProducs();
  const collections = await getCollections();

  return (
    <Container>
      <Hero />
      <div className="px-3 py-12 md:px-4 md:py-16 xl:p-24">
        <ProductsGrid
          leftComponent={
            <h3 className="text-2xl font-semibold leading-8 text-neutral-900 md:text-3xl">
              Latest Arrivals
            </h3>
          }
          rightComponent={
            <Link
              className={buttonVariants({
                variant: "secondary",
                size: "medium",
              })}
              href="/shop-all"
            >
              View All
            </Link>
          }
          products={products?.data.slice(0, 8)}
        />
      </div>
      <CollectionsGridSection collections={collections} />
      <Features />
    </Container>
  );
}

const getProducs = async () => {
  const response = await fetch(
    "https://www.greatfrontend.com/api/projects/challenges/e-commerce/products",
  );
  const data = await response.json();
  return data;
};

const getCollections = async () => {
  let url =
    "https://www.greatfrontend.com/api/projects/challenges/e-commerce/collections";

  const response = await fetch(url);
  const data = await response.json();
  return data.data;
};
