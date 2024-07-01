import React from "react";
import { Button } from "../button";
import { notFound } from "next/navigation";
import Image from "next/image";
import { toBase64 } from "@/lib/helper";
import { Shimmer } from "../icons";
import Link from "next/link";

const getProducs = async () => {
  const response = await fetch(
    "https://www.greatfrontend.com/api/projects/challenges/e-commerce/products?collection=latest",
  );
  const data = await response.json();
  return data;
};

export default async function ProductsGrid({
  title = "",
  viewAll = false,
}: {
  title: string;
  viewAll: boolean;
}) {
  const products = await getProducs();

  if (!products) notFound();

  return (
    <section className="container mx-auto flex w-full flex-col gap-8 bg-white px-3 py-12 shadow-sm md:px-4 md:py-16 xl:p-24">
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold leading-8 text-neutral-900">
          {title}
        </h2>
        {viewAll && (
          <Button variant="secondary" size="medium">
            View all
          </Button>
        )}
      </div>
      <ProductCard products={products.data} />
    </section>
  );
}

function ProductCard({ products }: { products: any[] }) {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
      {products.map((product) => (
        <Link
          href={product.product_id}
          key={product.id}
          className="group flex flex-col"
        >
          <div className="relative h-[300px] w-full overflow-hidden rounded-lg">
            <Image
              src={product.images[0].image_url}
              alt={product.name}
              fill
              className="object-cover"
              placeholder={`data:image/svg+xml;base64,${toBase64(Shimmer(700, 475))}`}
            />
          </div>
          <div className="py flex flex-col">
            <div className="flex flex-col gap-0.5 py-4">
              <p className="text-xs font-normal capitalize leading-4 text-neutral-600">
                {product.colors[0]}
              </p>
              <h4 className="text-lg font-medium leading-7 text-neutral-900 transition-colors group-hover:text-indigo-700">
                {product.name}
              </h4>
              <p className="text-lg font-normal leading-7 text-neutral-500">
                ${product.priceRange.lowest}
              </p>
              <div className="flex gap-1">
                {product.colors.map((color: string) => (
                  <div
                    key={color}
                    className="inline-flex items-center justify-center p-1"
                  >
                    <span
                      className="h-4 w-4 rounded-full border border-neutral-300"
                      style={{ backgroundColor: color }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
