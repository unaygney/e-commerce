"use client";
import { Button, buttonVariants } from "@/components/button";
import { Bill } from "@/components/icons";
import { Input } from "@/components/input";
import { Label } from "@/components/label";
import { applyCoupon } from "@/lib/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { Coupon } from "@/lib/definitions";
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
  const queryClient = useQueryClient();
  const [isCouponActive, setCouponActive] = useState<boolean>(false);
  const [coupon, setCoupon] = useState<string>("");
  const [couponArr, setCouponArr] = useState<Coupon[]>([]);
  const [total, setTotal] = useState<number>(summary.total);

  const { data, error, mutate } = useMutation({
    mutationFn: ({ coupon }: { coupon: string }) => applyCoupon(coupon),
    onSuccess: (data) => {
      if (!couponArr.some((c) => c.coupon_code === data.coupon_code)) {
        setCouponArr([...couponArr, data]);
        setCoupon("");
      }
    },
    onError: (error: any) => {
      console.error("Failed fetching data", error.message);
    },
  });

  const handleRemoveCoupon = (couponCode: string) => {
    setCouponArr(couponArr.filter((c) => c.coupon_code !== couponCode));
  };

  useEffect(() => {
    let totalDiscount = 0;
    couponArr.forEach((coupon) => {
      if (coupon.discount_percentage !== null) {
        totalDiscount += (summary.subtotal * coupon.discount_percentage) / 100;
      } else if (coupon.discount_amount !== null) {
        totalDiscount += coupon.discount_amount;
      }
    });
    setTotal(summary.total - totalDiscount);
  }, [couponArr, summary.total, summary.subtotal]);

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
        {couponArr.length > 0 && (
          <div className="flex flex-col gap-3">
            {couponArr.map((coupon, i) => (
              <div key={i} className="flex items-center justify-between">
                <Badge variant="brand" size="large">
                  {coupon.coupon_code}
                </Badge>
                <span className="text-lg font-semibold leading-7 text-neutral-900">
                  {coupon.discount_percentage !== null
                    ? `-${coupon.discount_percentage}%`
                    : coupon.discount_amount !== null
                      ? `-$${coupon.discount_amount.toFixed(2)}`
                      : ""}
                </span>
              </div>
            ))}
          </div>
        )}

        {isCouponActive && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              mutate({ coupon });
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
            {error && (
              <p className="text-sm font-normal leading-5 text-red-600">
                {error.message}
              </p>
            )}
            {couponArr.length > 0 && (
              <div className="flex w-full flex-wrap gap-2">
                {couponArr.map((coupon, i) => (
                  <Tag
                    key={i}
                    coupon={coupon.coupon_code}
                    onRemove={() => handleRemoveCoupon(coupon.coupon_code)}
                  />
                ))}
              </div>
            )}
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

function Tag({ coupon, onRemove }: { coupon: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center justify-center gap-2 rounded border-[0.5px] border-neutral-200 bg-gray-200 px-2 py-1 text-sm font-medium leading-5 text-neutral-900">
      {coupon}
      <button type="button" onClick={onRemove}>
        <X width={20} height={20} />
      </button>
    </span>
  );
}
