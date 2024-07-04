import { getBasketData } from "@/lib/services";
import Image from "next/image";
import { Button } from "@/components/button";
import { Lock } from "lucide-react";

// Type definitions
type Product = {
  name: string;
  product_id: string;
  description: string;
};

type Unit = {
  sku: string;
  color: string;
  size: string;
  image_url: string;
  list_price: number | null;
  sale_price: number | null;
};

type Summary = {
  subtotal: string;
  total: string;
  discount: number | null;
  discountCode: string | null;
  shipping: number | null;
};

type Item = {
  product: Product;
  unit: Unit;
  summary: Summary;
  quantity: number;
};

type BasketData = {
  items: Item[];
  summary: {
    subtotal: string;
    total: string;
  };
};

export default async function CheckoutSummary() {
  const { items, summary }: BasketData = await getBasketData();

  return (
    <div className="w-full rounded-lg border border-neutral-200 bg-white p-4 md:p-8 xl:max-w-[528px]">
      <h2 className="text-xl font-semibold leading-7 text-neutral-900">
        Order Summary
      </h2>
      <div className="flex flex-col border-b border-neutral-200">
        {items.map(({ product, unit, summary, quantity }) => (
          <div
            key={product.name}
            className="flex flex-wrap gap-6 border-dashed border-neutral-300 py-8 [&:not(:last-child)]:border-b"
          >
            <div className="relative h-14 w-14 overflow-hidden rounded-lg">
              <Image
                src={unit.image_url}
                alt={`${product.name}'s image`}
                className="object-cover"
                fill
              />
            </div>
            <div className="flex w-[199px] flex-col gap-2">
              <p className="text-base font-medium leading-6 text-neutral-900">
                {product.name}
              </p>
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
              <span className="text-base font-medium capitalize leading-6 text-neutral-600">
                Quantity: {quantity}
              </span>
            </div>
            <div className="ml-auto flex flex-col gap-1">
              <span className="text-lg font-semibold leading-7 text-neutral-900">
                ${unit.list_price?.toFixed(2) ?? "0.00"}
              </span>
              <span className="text-right text-lg font-normal leading-7 text-neutral-600 line-through">
                ${unit.sale_price?.toFixed(2) ?? "0.00"}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-4 border-b border-dashed border-neutral-300 py-8">
        <div className="flex items-center justify-between">
          <p>Subtotal</p>
          <span>{summary.subtotal}</span>
        </div>
        <div className="flex items-center justify-between">
          <p>Total</p>
          <span>{summary.total}</span>
        </div>
      </div>
      <div className="flex items-center justify-between py-8">
        <p>Total</p>
        <span>{summary.total}</span>
      </div>
      <Button variant="primary" size="medium" className="w-full">
        <Lock width={16} height={16} />
        Confirm Order
      </Button>
    </div>
  );
}
