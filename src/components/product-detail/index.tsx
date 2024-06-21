"use client";
import { IProduct } from "@/lib/definitions";
import Image from "next/image";
import React from "react";
import { Rating } from "@mui/material";
import { Badge } from "../badge";
import { Button } from "../button";
import { StarIcon, CheckIcon } from "lucide-react";
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

export default function ProductDetail({ product }: any) {
  return (
    <section className="container mx-auto flex flex-col gap-12 rounded-md bg-white px-4 py-12 shadow-sm lg:flex-row lg:gap-8 lg:p-24">
      <ProductThumbnail product={product} />
      <ProductDetailInfo product={product} />
    </section>
  );
}

function ProductThumbnail({ product }: any) {
  const [selectedImage, setSelectedImage] = React.useState("/image.png");
  const { images } = product;
  const searchParams = useSearchParams();
  const color = searchParams.get("color") ?? "green";

  const filteredImages = images.filter((image: any) => image?.color === color);
  console.log(filteredImages);

  const thumbnails = [
    { src: "/image.png", alt: "image thumbnail" },
    { src: "/image-1.png", alt: "image thumbnail 1" },
    { src: "/image-2.png", alt: "image thumbnail 2" },
    { src: "/image-3.png", alt: "image thumbnail 3" },
  ];

  return (
    <div className="flex w-full flex-1 flex-col gap-6 lg:min-w-[48%]">
      <div className="flex flex-col gap-6">
        <div className="relative h-[400px] w-full overflow-hidden rounded-lg md:h-[800px]">
          <Image src={selectedImage} alt="selected image" fill />
        </div>
        <div className="no-scrollbar flex h-[120px] gap-4 overflow-scroll md:h-[190px]">
          {thumbnails.map((thumbnail, index) => (
            <div
              key={index}
              className="relative h-full w-full min-w-[80px] flex-1 cursor-pointer overflow-hidden rounded-lg md:min-w-[188px] lg:min-w-[160px]"
              onClick={() => setSelectedImage(thumbnail.src)}
            >
              <Image src={thumbnail.src} alt={thumbnail.alt} fill />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProductDetailInfo({ product }: any) {
  const { name, description, reviews, rating, info, inventory } = product;

  const router = useRouter();
  const searchParams = useSearchParams();
  let plans: Plans[] = [
    { color: "#10B981", label: "Green", value: "green" },
    { color: "#CA8A04", label: "Brown", value: "Brown" },
  ];

  let SIZES: SIZES[] = [
    {
      label: "XS",
      value: "xs",
    },
    {
      label: "S",
      value: "s",
    },
    {
      label: "M",
      value: "m",
    },
    {
      label: "L",
      value: "l",
    },
    {
      label: "XL",
      value: "xl",
    },
  ];
  const [selected, setSelected] = React.useState<string>(plans[0].color);
  const [sizes, setSizes] = React.useState<string>(SIZES[0].value);

  const handleSelect = (color: string) => {
    setSelected(color);
    let paramName = plans.find((plan) => plan.color === color)?.value ?? "";
    const params = new URLSearchParams(searchParams);
    params.set("color", paramName);
    router.replace(`/?${params.toString().toLowerCase()}`);
  };

  const handleSize = (selectedSize: string) => {
    setSizes(selectedSize);
    let paramName =
      SIZES.find((size) => size.value === selectedSize)?.value ?? "";
    const params = new URLSearchParams(searchParams);
    params.set("size", paramName);
    router.replace(`/?${params.toString()}`);
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
            <span className="text-lg font-medium leading-7 text-neutral-400">
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
          <RadioGroup value={selected} onChange={handleSelect} className="mt-2">
            <div className="flex gap-4">
              {plans.map((plan) => (
                <RadioGroup.Option
                  key={plan.color}
                  value={plan.color}
                  className={({ active, checked }) =>
                    cn(
                      "relative flex h-[38px] w-[38px] cursor-pointer items-center justify-center rounded-full shadow-md focus:outline-none",
                      checked && "ring-2 ring-indigo-500 ring-offset-2",
                      active && `ring-2 ring-indigo-500 ring-offset-2`,
                    )
                  }
                  style={{ backgroundColor: plan.color }}
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
          <RadioGroup value={sizes} onChange={handleSize} className="">
            <div className="flex flex-wrap gap-4">
              {SIZES.map((size) => (
                <RadioGroup.Option
                  key={size.value}
                  value={size.value}
                  className={({ active, checked }) =>
                    cn(
                      "relative flex h-[48px] w-[64px] cursor-pointer items-center justify-center rounded border border-neutral-200 bg-white focus:outline-none",
                      checked && "ring-2 ring-indigo-500 ring-offset-2",
                      active && `ring-2 ring-indigo-500 ring-offset-2`,
                    )
                  }
                >
                  <RadioGroup.Label className="text-base font-medium leading-6 text-neutral-900">
                    {size.label}
                  </RadioGroup.Label>
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
        </div>
      </div>
      {/* Price Button */}
      <div>price buttons</div>
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
            <AccordionItem value={`item-${index + 1}`}>
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
