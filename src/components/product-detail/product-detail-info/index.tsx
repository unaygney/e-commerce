"use client";
import React from "react";
import { Rating } from "@mui/material";
import { Badge } from "@/components/badge";
import { Button } from "@/components/button";
import { StarIcon, CheckIcon, Minus, Plus } from "lucide-react";
import { RadioGroup } from "@headlessui/react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { adjustSize } from "@/lib/helper";

export function ProductDetailInfo({ product }: any) {
  const {
    name,
    description,
    reviews = 0,
    rating,
    info,
    inventory,
    colors,
    sizes,
  } = product;

  const router = useRouter();
  const searchParams = useSearchParams();

  const sizeParam = searchParams.get("size") ?? "xs";
  const colorParam = searchParams.get("color") ?? "green";

  const [selected, setSelected] = React.useState<string>(colorParam);
  const [curSize, setCurSize] = React.useState<string>(sizeParam);
  const [quantity, setQuantity] = React.useState<number>(1);

  const filterItemBySize = inventory.filter(
    (item: any) => item.size === sizeParam,
  );
  const itemStock = filterItemBySize.find(
    (item: any) => item.color === colorParam,
  );

  const handleSelect = (color: string) => {
    setSelected(color);
    router.replace(`/?color=${color}&size=${curSize}`);
  };

  const handleSize = (size: string) => {
    setCurSize(size);
    router.replace(`/?color=${selected}&size=${size}`);
  };

  const handleIncrease = () => {
    if (itemStock && itemStock.stock > quantity) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="flex w-full flex-1 flex-col lg:min-w-[48%]">
      <div className="flex flex-col">
        <h1 className="text-3xl font-semibold leading-9 text-neutral-900 md:text-5xl md:leading-[48px]">
          {name}
        </h1>
        <div className="mt-5 flex flex-col">
          <div className="flex items-end gap-2">
            <span className="text-3xl font-medium leading-9 text-neutral-600">
              ${inventory[0].sale_price}
            </span>
            <span className="text-lg font-medium leading-7 text-neutral-400 line-through">
              ${inventory[0].list_price}
            </span>
          </div>
          {inventory[0].discount && (
            <Badge variant="warning" size="medium" className="mt-2 self-start">
              %{inventory[0].discount_percentage} OFF
            </Badge>
          )}
        </div>
        <div className="mt-3 flex items-center gap-2">
          <h6 className="text-xl font-normal leading-7 text-neutral-900">
            {rating}
          </h6>
          <Rating
            name="text-feedback"
            readOnly
            precision={0.5}
            value={rating}
            emptyIcon={
              <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
            }
          />
          <p className="text-sm font-medium leading-5 text-indigo-700">
            {reviews === 0 && (
              <>
                <span className="text-sm font-medium leading-5 text-neutral-500">
                  No reviews yet.
                </span>
                Be the first.
              </>
            )}
            {reviews === 1 && `See ${reviews} review`}
            {reviews > 1 && `See all ${reviews} reviews`}
          </p>
        </div>
      </div>
      <p className="my-8 text-base font-normal leading-6 text-neutral-600">
        {description}
      </p>
      {/* Product buttons */}
      <div className="mb-8 flex flex-col">
        <div>
          <h6 className="mb-2 text-sm font-normal leading-5 text-neutral-500">
            Available Colors
          </h6>
          <RadioGroup onChange={handleSelect} value={selected} className="mt-2">
            <div className="flex gap-4">
              {colors.map((col: string, idx: number) => (
                <RadioGroup.Option
                  key={idx}
                  value={col}
                  className={({ active, checked }) =>
                    cn(
                      "relative flex h-[38px] w-[38px] cursor-pointer items-center justify-center rounded-full shadow-md focus:outline-none",
                      checked && "ring-2 ring-indigo-500 ring-offset-2",
                      active && `ring-2 ring-indigo-500 ring-offset-2`,
                    )
                  }
                  style={{ backgroundColor: col }}
                >
                  {({ checked }) => (
                    <>
                      <div className="flex w-full items-center justify-center">
                        {checked && (
                          <div className="flex-shrink-0 text-white">
                            <CheckIcon className="h-6 w-6" />
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
        </div>
        <div className="mt-8">
          <h6 className="mb-2 text-sm font-normal leading-5 text-neutral-500">
            Available Sizes
          </h6>
          <RadioGroup value={curSize} onChange={handleSize} className="">
            <div className="flex flex-wrap gap-4">
              {sizes.map((s: string, i: number): any => (
                <RadioGroup.Option
                  key={i}
                  value={s}
                  className={({ active, checked }) =>
                    cn(
                      "relative flex h-[48px] w-[64px] cursor-pointer items-center justify-center rounded border border-neutral-200 bg-white focus:outline-none",
                      checked && "ring-2 ring-indigo-500 ring-offset-2",
                      active && `ring-2 ring-indigo-500 ring-offset-2`,
                    )
                  }
                >
                  <RadioGroup.Label className="text-base font-medium uppercase leading-6 text-neutral-900">
                    {adjustSize(s)}
                  </RadioGroup.Label>
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
        </div>
      </div>
      {/* Price Button */}
      <div className="mb-8 flex flex-col gap-4">
        <h6 className="text-sm font-normal leading-5 text-neutral-500">
          Quantity
        </h6>
        <div className="flex h-9 w-[125px] items-center justify-between gap-3 rounded-[6px] border border-neutral-200 bg-neutral-50 px-1.5">
          <button
            onClick={handleDecrement}
            className={cn(
              "inline-flex h-5 w-5 items-center justify-center text-neutral-600 transition-colors",
              {
                "cursor-not-allowed text-neutral-400": quantity < 2,
              },
            )}
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="text-sm font-medium leading-5 text-neutral-600">
            {quantity}
          </span>
          <button
            disabled={itemStock?.stock === quantity}
            className={cn(
              "inline-flex h-5 w-5 items-center justify-center text-neutral-600 transition-colors",
              {
                "cursor-not-allowed text-neutral-400":
                  itemStock?.stock === quantity,
              },
            )}
            onClick={handleIncrease}
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
      <Button variant="primary" size="large">
        Add to Cart
      </Button>
      {/* Accordion Section */}
      <Accordion type="multiple" className="mt-6 marker:text-neutral-600">
        {info.map(
          (
            {
              title,
              description,
            }: {
              title: string;
              description: String[];
            },
            index: number,
          ) => (
            <AccordionItem key={index} value={`item-${index + 1}`}>
              <AccordionTrigger className="text-lg font-medium leading-7 text-neutral-900">
                {title}
              </AccordionTrigger>
              <AccordionContent className="mt-2 text-base font-normal leading-6 text-neutral-600">
                <ul className="list-inside list-disc">
                  {description.map((desc, index) => (
                    <li key={index}>{desc}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ),
        )}
      </Accordion>
    </div>
  );
}

interface Plans {
  color: string;
  label: string;
  value: string;
}
interface SIZES {
  label: string;
  value: string;
}
