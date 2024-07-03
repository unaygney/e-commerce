import React from "react";
import { ShoppingCart, ArrowRight, Plus, Minus } from "lucide-react";
import { Button, buttonVariants } from "../button";
import Link from "next/link";
import Image from "next/image";
import { toBase64 } from "@/lib/helper";
import { Bill, Shimmer } from "../icons";
export default function ShoppingCard({ basket }: { basket: any }) {
  const { summary } = basket;
  if (basket.length < 1) return <EmptyCard />;

  return (
    <section
      id="shopping-card"
      className="flex flex-col gap-16 px-3 py-12 md:px-4 md:py-16 xl:p-24"
    >
      <h1 className="text-3xl font-semibold leading-9 text-neutral-900 md:text-5xl md:leading-[48px]">
        Shopping Cart
      </h1>
      <div className="flex flex-col gap-8 xl:flex-row xl:items-start">
        <ProductList basket={basket} />
        <OrderSummary summary={summary} />
      </div>
    </section>
  );
}

function EmptyCard() {
  return (
    <section
      id="shopping-card"
      className="flex flex-col gap-16 px-3 py-12 md:px-4 md:py-16 xl:p-24"
    >
      <h1 className="text-3xl font-semibold leading-9 text-neutral-900 md:text-5xl md:leading-[48px]">
        Shopping Cart
      </h1>
      <div className="flex flex-col gap-8 xl:flex-row">
        <div className="flex w-full flex-col items-center justify-center gap-6 p-6 xl:w-[488px]">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-indigo-700 shadow-md">
            <ShoppingCart width={24} height={24} />
          </span>
          <div className="flex flex-col gap-2 text-center">
            <h2 className="text-xl font-medium leading-7 text-neutral-900">
              Your cart is empty
            </h2>
            <p className="text-base font-normal leading-6 text-neutral-900">
              Let's go explore some products
            </p>
          </div>
          <Link
            className={buttonVariants({ variant: "primary", size: "medium" })}
            href={"/shop-all"}
          >
            Explore products
            <ArrowRight />
          </Link>
        </div>
        <div className="relative h-[180px] w-full overflow-hidden md:h-[320px] xl:h-[432px]">
          <Image
            src="/empty-card-mobile.png"
            alt="empty card image"
            fill
            placeholder={`data:image/svg+xml;base64,${toBase64(Shimmer(700, 475))}`}
            className="md:hidden"
          />
          <Image
            src="/empty-card-tablet.png"
            alt="empty card image"
            fill
            placeholder={`data:image/svg+xml;base64,${toBase64(Shimmer(700, 475))}`}
            className="hidden md:block xl:hidden"
          />
          <Image
            src="/empty-card-desktop.png"
            alt="empty card image"
            fill
            placeholder={`data:image/svg+xml;base64,${toBase64(Shimmer(700, 475))}`}
            className="hidden xl:block"
          />
        </div>
      </div>
    </section>
  );
}

function OrderSummary({
  summary,
}: {
  summary: {
    subtotal: number;
    discound: number | null;
    discount_code: number | null;
    shipping: number;
    total: number;
  };
}) {
  return (
    <div className="flex w-full flex-col gap-8 rounded-lg border border-neutral-200 bg-transparent p-4 md:p-8 xl:max-w-[384px]">
      <h3 className="text-2xl font-semibold leading-8 text-neutral-900">
        Order Summary
      </h3>
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <p className="text-base font-normal leading-6 text-neutral-600">
            Subtotal
          </p>
          <span className="text-lg font-semibold leading-7 text-neutral-900">
            ${summary.subtotal}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-base font-normal leading-6 text-neutral-600">
            Shipping
          </p>
          <span className="text-lg font-semibold leading-7 text-neutral-900">
            ${summary.shipping === 0 ? "FREE" : summary.shipping}
          </span>
        </div>
        <Button variant="linkColor" className="ml-auto w-[163px] gap-2">
          <Bill className="flex-shrink-0" />
          Add coupon code
        </Button>
      </div>

      <hr aria-hidden="true" className="border-dashed" />

      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <p className="text-2xl font-medium leading-8 text-neutral-900">
            Total
          </p>
          <span className="text-right text-4xl font-semibold leading-10 text-neutral-900">
            ${summary.total}
          </span>
        </div>
        <Button size="medium" variant="primary" className="w-full font-medium">
          Checkout
        </Button>
      </div>
    </div>
  );
}

function ProductList({ basket }: { basket: any }) {
  console.log(basket);
  return (
    <div className="flex w-full flex-col gap-8 xl:flex-1">
      {basket.items.map((item: any) => (
        <ProductItem key={item.product.product_id} item={item} />
      ))}
    </div>
  );
}

function ProductItem({ item }: { item: any }) {
  const { product, unit, total_list_price, total_sale_price, quantity } = item;
  return (
    <div className="flex flex-col gap-4 border-dashed border-neutral-200 pb-8 md:flex-row [&:not(:last-child)]:border-b">
      <div className="relative h-[200px] w-full overflow-hidden rounded-lg md:w-[280px]">
        <Image
          alt={`${product.name}' image`}
          src={unit.image_url}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-4 md:flex-1">
        <h3 className="text-2xl font-medium leading-8 text-neutral-900">
          {product.name}
        </h3>
        <div className="flex items-center gap-1">
          <span className="text-base font-medium capitalize leading-6 text-neutral-600">
            {unit.color}
          </span>
          <span className="text-base font-medium leading-6 text-neutral-600">
            •
          </span>
          <span className="text-base font-medium capitalize leading-6 text-neutral-600">
            {unit.size}
          </span>
        </div>
        <p className="text-sm font-normal leading-5 text-neutral-600">
          {product.description}
        </p>

        <div className="flex items-center gap-2 xl:mt-auto">
          <div className="flex h-9 w-[125px] items-center justify-between gap-3 rounded-md border border-neutral-200 bg-neutral-50 p-0.5">
            <button className="inline-flex h-5 w-5 items-center justify-center p-0.5">
              <Minus width={16} height={16} />
            </button>
            <span className="text-sm font-medium leading-5 text-neutral-600">
              {quantity}
            </span>
            <button className="inline-flex h-5 w-5 items-center justify-center p-0.5">
              <Plus width={16} height={16} />
            </button>
          </div>
          <Button variant="linkGray" size="medium">
            Remove
          </Button>
          <div className="ml-auto flex items-center gap-2">
            <span className="text-lg font-medium leading-7 text-neutral-900">
              ${total_list_price}
            </span>
            <span className="text-xs font-normal leading-4 text-neutral-600 line-through">
              ${total_sale_price}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
