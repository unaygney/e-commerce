import React from "react";
import { ShoppingCart, ArrowRight, Plus, Minus } from "lucide-react";
import { Button, buttonVariants } from "../button";
import Link from "next/link";
import Image from "next/image";
import { toBase64 } from "@/lib/helper";
import { Shimmer } from "../icons";
import OrderSummary from "./order-summary";
import ProductList from "./product-list";

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
              Let&apos;s go explore some products
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
