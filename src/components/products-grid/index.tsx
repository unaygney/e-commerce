"use client";
import React from "react";
import Image from "next/image";
import { toBase64 } from "@/lib/helper";
import { Shimmer } from "../icons";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Shirt } from "lucide-react";
import { Button } from "../button";
import { useRouter } from "next/navigation";

export default function ProductsGrid({
  products,
  leftComponent = null,
  rightComponent = null,
  className,
}: {
  products: any;
  leftComponent?: string | React.ReactNode | null;
  rightComponent?: string | React.ReactNode | null;
  className?: string;
}) {
  return (
    <section className="flex w-full flex-col gap-8 bg-transparent">
      <div className="flex items-center justify-between">
        {leftComponent && leftComponent}
        {rightComponent && rightComponent}
      </div>
      <ProductCard className={className} products={products} />
    </section>
  );
}

function ProductCard({
  products,
  className,
}: {
  products: any[];
  className?: string;
}) {
  const router = useRouter();

  const resetFilters = () => {
    router.replace("/shop-all");
  };

  if (products.length === 0)
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-5 bg-transparent p-6">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-indigo-700 shadow">
          <Shirt width={24} height={24} />
        </span>
        <h1 className="text-xl font-semibold leading-6 text-neutral-900">
          No products found
        </h1>
        <p className="text-base font-normal leading-6 text-neutral-900">
          Adjust your filters a bit, and let&apos;s see what we can find!
        </p>
        <Button variant="primary" size="medium" onClick={resetFilters}>
          Reset filters
        </Button>
      </div>
    );

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4",
        className,
      )}
    >
      {products?.map((product, i) => (
        <Link
          href={`/product/${product.product_id}`}
          key={i}
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
