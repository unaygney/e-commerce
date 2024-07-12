import { buttonVariants } from "@/components/button";
import { FileCopy, Visa } from "@/components/icons";
import { cn } from "@/lib/utils";
import { ChevronRight, Copy } from "lucide-react";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Badge } from "@/components/badge";
import CopyToClipboard from "./copy-to-clipboard";
export default function SuccessContent({ order }: { order: any }) {
  const { cart, shippingAddress, id } = order;
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-col gap-4">
        <h1 className="max-w-[15ch] text-3xl font-semibold leading-9 text-neutral-900 md:max-w-full md:text-4xl">
          Your order is confirmed.
        </h1>
        <p className="text-base font-normal leading-6 text-neutral-600">
          Your order is now in the queue and being processed. We&apos;ll let you
          know when we ship it out!
        </p>
      </div>

      <CopyToClipboard id={id} />

      <div className="mt-12 flex flex-col gap-8">
        {cart.items.map((item: any) => (
          <OrderCard key={item.id} product={item} />
        ))}
      </div>

      <div className="flex flex-col gap-8 border-y border-dashed border-neutral-300 py-8">
        <div className="flex items-center justify-between">
          <h6 className="text-base font-normal leading-6 text-neutral-600">
            Subtotal
          </h6>
          <span className="text-right text-lg font-semibold leading-7 text-neutral-900">
            162.60
          </span>
        </div>

        <div className="flex items-center justify-between">
          <h6 className="text-base font-normal leading-6 text-neutral-600">
            Shipping
          </h6>
          <span className="text-right text-lg font-semibold leading-7 text-neutral-900">
            FREE
          </span>
        </div>

        {cart?.summary.discount_code !== null && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h6 className="text-base font-normal leading-6 text-neutral-600">
                Coupon discound
              </h6>
              <span className="text-right text-lg font-semibold leading-7 text-neutral-900">
                {cart.summary.discount_code}
              </span>
            </div>
            <Badge
              variant="brand"
              size="medium"
              className="inline-flex self-start"
            >
              {cart.summary.discount_code}
            </Badge>
          </div>
        )}
      </div>

      <div className="mt-12 flex items-center justify-between">
        <h6 className="text-base font-normal leading-6 text-neutral-900">
          Total
        </h6>
        <span className="text-right text-2xl font-semibold leading-8 text-neutral-900">
          ${cart.summary.total}
        </span>
      </div>

      <div className="my-12 flex flex-col gap-8 md:flex-row">
        <div className="flex flex-col md:flex-1">
          <h6 className="mb-4 text-base font-normal leading-6 text-neutral-600">
            Shipping Address
          </h6>
          <p className="text-sm font-normal leading-5 text-neutral-600">
            John Doe
          </p>
          <p className="text-sm font-normal leading-5 text-neutral-600">
            {shippingAddress?.line1}
          </p>
          {shippingAddress?.line2 && (
            <p className="text-sm font-normal leading-5 text-neutral-600">
              {shippingAddress?.line2}
            </p>
          )}
          <p className="text-sm font-normal leading-5 text-neutral-600">
            {shippingAddress?.city}
          </p>
        </div>

        <div className="flex flex-row md:flex-1">
          <div className="flex flex-col gap-4">
            <h6 className="text-base font-normal leading-6 text-neutral-600">
              Payment Method
            </h6>
            <div className="flex gap-4">
              <Visa width={78} height={48} />
              <div className="flex flex-col">
                <p className="text-sm font-normal leading-5 text-neutral-600">
                  Ending with 4242
                </p>
                <p className="text-sm font-normal leading-5 text-neutral-600">
                  Expires 12 / 28
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Link
        className={cn(
          buttonVariants({ variant: "secondary", size: "medium" }),
          "mt-auto inline-flex w-full items-center",
        )}
        href={"/shop-all"}
      >
        Continue Shopping <ChevronRight width={16} height={16} />
      </Link>
    </div>
  );
}

function OrderCard({ product }: { product: any }) {
  const { unit, product: prod } = product;

  return (
    <div className="flex gap-6 border-b border-dashed border-neutral-300 py-8">
      <div className="relative size-20 overflow-hidden rounded">
        <Image
          src={unit.image_url}
          alt="product image"
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col gap-1">
        <h3 className="text-xl font-medium leading-7 text-neutral-900">
          {prod.name}
        </h3>
        <div className="flex items-center gap-0.5">
          <span className="text-base font-medium capitalize leading-6 text-neutral-600">
            {unit?.color}
          </span>
          <span className="text-base font-medium leading-6 text-neutral-600">
            •
          </span>
          <span className="text-base font-medium uppercase leading-6 text-neutral-600">
            {unit?.size}
          </span>
        </div>
        <span className="text-base font-medium leading-6 text-neutral-600">
          Quantity: {product?.quantity}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-lg font-semibold leading-7 text-neutral-900">
          ${unit.sale_price}
        </span>
        {unit.sale_price !== unit.list_price && (
          <span className="text-lg font-normal leading-7 text-neutral-600 line-through">
            ${unit.list_price}
          </span>
        )}
      </div>
    </div>
  );
}
