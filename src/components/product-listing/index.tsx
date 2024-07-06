"use client";

import React from "react";
import ProductsGrid from "../products-grid";
import { Button } from "../button";
import { Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { cn } from "@/lib/utils";
import { SORT_OPTIONS } from "./constant";

import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useSearchParams } from "next/navigation";
import FilterCard from "./filter-card";

export default function ProductListing({ products }: { products: any }) {
  const [isActive, setActive] = React.useState<boolean>(false);

  return (
    <section className="relative mx-auto flex h-full w-full bg-white py-12 md:py-16 xl:flex-row xl:gap-16 xl:p-24">
      <FilterCard isActive={isActive} setActive={setActive} />
      <ProductsGrid
        className="xl:grid-cols-3"
        leftComponent={
          <FilterButton
            className="xl:hidden"
            isActive={isActive}
            setActive={setActive}
          />
        }
        rightComponent={<SortButton />}
        products={products}
      />
      {isActive && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50"
          aria-hidden="true"
        />
      )}
    </section>
  );
}

function SortButton() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleSortChange = (value: string) => {
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set("sort", value);

    router.replace(`${pathname}?${currentParams.toString()}`);
  };

  return (
    <Select onValueChange={handleSortChange}>
      <SelectTrigger
        className={
          "ml-auto h-10 w-[103px] text-sm font-medium leading-5 text-neutral-900 shadow"
        }
      >
        <SelectValue placeholder="Sort By" />
      </SelectTrigger>
      <SelectContent>
        {SORT_OPTIONS.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            className={cn("hover:bg-red-800-100 hover:text-red-500")}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function FilterButton({
  isActive,
  setActive,
  className,
}: {
  className?: string;
  isActive: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Button
      variant="secondary"
      size="medium"
      className={cn("w-[91px]", className)}
      onClick={() => setActive(!isActive)}
    >
      <Filter width={16} height={16} />
      Filter
    </Button>
  );
}
