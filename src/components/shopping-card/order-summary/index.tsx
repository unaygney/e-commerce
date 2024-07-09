"use client";
import { Button, buttonVariants } from "@/components/button";
import { Bill } from "@/components/icons";
import { Input } from "@/components/input";
import { Label } from "@/components/label";
import { applyCoupon, deleteCoupon } from "@/app/basket/actions";
import { X } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";
export default function OrderSummary({
  summary,
}: {
  summary: {
    subtotal: number;
    discount: number | null;
    discount_code: number | null;
    shipping: number;
    total: number;
  };
}) {
  const [isCouponActive, setCouponActive] = useState<boolean>(false);
  const [coupon, setCoupon] = useState<string | number>("");

  const { discount_code, discount, subtotal, shipping, total } = summary;

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
            ${subtotal}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-base font-normal leading-6 text-neutral-600">
            Shipping
          </p>
          <span className="text-lg font-semibold leading-7 text-neutral-900">
            ${shipping === 0 ? "FREE" : shipping}
          </span>
        </div>

        {discount_code && (
          <div className="flex items-center justify-between">
            <Badge variant="brand" size="large">
              {discount_code}
            </Badge>
            <span className="text-lg font-semibold leading-7 text-neutral-900">
              -${discount}
            </span>
          </div>
        )}

        {!isCouponActive && (
          <Button
            onClick={() => setCouponActive(true)}
            variant="linkColor"
            className="ml-auto w-[163px] gap-2"
          >
            <Bill className="flex-shrink-0" />
            Add coupon code
          </Button>
        )}

        {isCouponActive && (
          <>
            <form action={applyCoupon} className="flex flex-col gap-2">
              <Label>Coupon code</Label>
              <div className="flex justify-between gap-2">
                <Input
                  name="coupon"
                  id="coupon"
                  placeholder="Enter coupon code"
                  className="w-[232px]"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                />
                <Button
                  type="submit"
                  className="w-full"
                  size="medium"
                  variant="secondary"
                >
                  Apply
                </Button>
              </div>
            </form>

            {discount_code && (
              <div className="flex w-full flex-wrap gap-2">
                <Tag coupon={discount_code} />
              </div>
            )}
          </>
        )}
      </div>

      <hr aria-hidden="true" className="border-dashed" />

      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <p className="text-2xl font-medium leading-8 text-neutral-900">
            Total
          </p>
          <span className="text-right text-4xl font-semibold leading-10 text-neutral-900">
            ${total.toFixed(2)}
          </span>
        </div>
        <Link
          href={"/checkout"}
          className={cn(
            buttonVariants({ variant: "primary", size: "medium" }),
            "w-full font-medium",
          )}
        >
          Checkout
        </Link>
      </div>
    </div>
  );
}

function Tag({ coupon }: { coupon: string | number }) {
  return (
    <span className="inline-flex items-center justify-center gap-2 rounded border-[0.5px] border-neutral-200 bg-gray-200 px-2 py-1 text-sm font-medium leading-5 text-neutral-900">
      {coupon}
      <form className="flex" action={deleteCoupon}>
        <input value={coupon} name="coupon" type="hidden" />
        <button>
          <X width={20} height={20} />
        </button>
      </form>
    </span>
  );
}
