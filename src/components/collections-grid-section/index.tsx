import { Collections } from "@/lib/definitions";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import Link from "next/link";
export default async function CollectionsGridSection({
  collections,
}: {
  collections: Collections[];
}) {
  return (
    <section className="container mx-auto flex flex-col gap-8 bg-white px-3 py-12 md:px-4 md:py-16 xl:p-24">
      <h2 className="text-3xl font-semibold leading-9 text-neutral-900">
        Our Collections
      </h2>
      <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
        <PrimaryCard
          data={collections[0]}
          className="md:col-span-1 md:row-span-2"
        />
        <SecondaryCard data={collections[1]} />
        <SecondaryCard data={collections[2]} />
      </div>
    </section>
  );
}

function PrimaryCard({
  data,
  props,
  className,
}: {
  data: Collections;
  className?: string;
  props?: React.HTMLProps<HTMLDivElement>;
}) {
  const { image_url, description, name, collection_id } = data;
  return (
    <Link
      href={`/shop-all?collection=${collection_id}`}
      className={cn(
        "group relative h-[580px] w-full overflow-hidden rounded-lg border-gray-800",
        className,
      )}
    >
      <Image src={image_url} fill alt={description} className="object-cover" />
      <div
        aria-hidden="true"
        className="absolute inset-0 z-10 bg-gradient-to-t from-black/40 to-black/0"
      />
      <div className="absolute bottom-4 left-4 z-10 flex flex-col text-white">
        <h5 className="text-sm font-normal leading-5">{name}</h5>
        <p className="text-lg font-medium leading-7 group-hover:text-indigo-50">
          {description}
        </p>
      </div>
    </Link>
  );
}

function SecondaryCard({
  data,
  props,
  className,
}: {
  data: Collections;
  className?: string;
  props?: React.HTMLProps<HTMLDivElement>;
}) {
  const { image_url, description, name, collection_id } = data;
  return (
    <Link
      href={`/shop-all?collection=${collection_id}`}
      className={cn(
        "group relative h-[380px] w-full overflow-hidden rounded-lg border-gray-800 md:h-[276px]",
        className,
      )}
    >
      <Image src={image_url} fill alt={description} className="object-cover" />
      <div
        aria-hidden="true"
        className="absolute inset-0 z-10 bg-gradient-to-t from-black/40 to-black/0"
      />
      <div className="absolute bottom-4 left-4 z-10 flex flex-col text-white">
        <h5 className="text-sm font-normal leading-5">{name}</h5>
        <p className="text-lg font-medium leading-7 group-hover:text-indigo-50">
          {description}
        </p>
      </div>
    </Link>
  );
}
