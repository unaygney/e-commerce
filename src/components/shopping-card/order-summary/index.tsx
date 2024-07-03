"use client";
import { Button } from "@/components/button";
import { Bill } from "@/components/icons";
import { Input } from "@/components/input";
import { Label } from "@/components/label";
import { applyCoupon } from "@/lib/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function OrderSummary({
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
  const queryClient = useQueryClient();
  const [isCouponActive, setCouponActive] = useState<boolean>(false);
  const [coupon, setCoupon] = useState<string>("");

  const mutation = useMutation({
    mutationFn: ({ coupon }: { coupon: string }) => applyCoupon(coupon),
    onSuccess: (data) => {
      console.log("Başarılı", data);
    },
    onError: (error: any) => {
      console.error("Başarısız", error.message);
    },
  });

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
          <form
            onSubmit={(e) => {
              e.preventDefault();
              mutation.mutate({ coupon });
            }}
            className="flex flex-col gap-2"
          >
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
        )}
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
