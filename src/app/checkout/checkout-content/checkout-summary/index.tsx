import { getBasketData } from "@/lib/services";
import Image from "next/image";
import { Button } from "@/components/button";
import { Lock } from "lucide-react";

export default async function CheckoutSummary({ basket }: { basket: any }) {
  const { items, summary } = basket;

  return (
    <div className="flex w-full flex-col rounded-lg border border-neutral-200 bg-white p-4 md:p-8 xl:max-w-[528px]">
      <h2 className="text-xl font-semibold leading-7 text-neutral-900">
        Order Summary
      </h2>
      <div className="flex flex-col border-b border-neutral-200">
        {items.map(
          ({
            product,
            unit,
            summary,
            quantity,
          }: {
            product: any;
            unit: any;
            summary: any;
            quantity: number;
          }) => (
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
                    {unit.size === "null" ? "One size" : unit.size}
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
                {unit.sale_price !== unit.list_price && (
                  <span className="text-right text-lg font-normal leading-7 text-neutral-600 line-through">
                    ${unit.sale_price?.toFixed(2) ?? "0.00"}
                  </span>
                )}
              </div>
            </div>
          ),
        )}
      </div>
      <div className="flex flex-col gap-4 border-b border-dashed border-neutral-300 py-8">
        <div className="flex items-center justify-between">
          <p className="text-base font-normal leading-6 text-neutral-600">
            Subtotal
          </p>
          <span className="text-right text-lg font-semibold leading-7 text-neutral-900">
            ${summary.subtotal}
          </span>
        </div>
      </div>
      <div className="mt-auto flex items-center justify-between py-8">
        <p className="text-2xl font-medium leading-8 text-neutral-900">Total</p>
        <span className="text-right text-4xl font-semibold leading-10 text-neutral-900">
          ${summary.total}
        </span>
      </div>
      <Button
        type="submit"
        form="checkout-form"
        variant="primary"
        size="medium"
        className="w-full"
      >
        <Lock width={16} height={16} />
        Confirm Order
      </Button>
    </div>
  );
}
