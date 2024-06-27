"use client";

import React from "react";
import { DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { getProductReview } from "@/lib/services";
import { useQuery } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import { Rating } from "@mui/material";
import { StarIcon } from "lucide-react";
import { Button } from "../button";
import Image from "next/image";
import { formatDate, toBase64 } from "@/lib/helper";
import { Shimmer } from "../icons";
export default function ProductReview({
  productName,
}: {
  productName: string;
}) {
  const { data, isLoading } = useQuery({
    queryKey: ["reviews", productName],
    queryFn: async () => await getProductReview("urban-drift-bucket-hat"),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <DialogDescription className={cn("mt-6 pt-6")}>
        <div className="flex flex-col gap-10 lg:gap-8">
          <ReviewsSummary data={data.aggregate} />
          <Reviews data={data.data} />
        </div>
      </DialogDescription>
    </>
  );
}

function ReviewsSummary({ data }: { data: any }) {
  return (
    <div className="flex w-full max-w-[384px] flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold leading-7 text-neutral-900">
          Overall Rating
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-base font-semibold leading-6 text-neutral-900">
            {data?.rating ?? 0}
          </span>
          <Rating
            name="text-feedback"
            readOnly
            precision={0.5}
            value={data?.rating}
            emptyIcon={
              <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
            }
          />
          {data?.total > 0 ? <p>{`Based on ${data.total} reviews`}</p> : null}
        </div>
      </div>
      <div>stat</div>
      <Button variant="secondary" className={cn("mx-auto w-[153px] px-5 py-3")}>
        Write a review
      </Button>
    </div>
  );
}

function Reviews({ data }: { data: any }) {
  if (!data || !Array.isArray(data)) {
    return <div>No reviews available</div>;
  }

  return (
    <>
      <div className="flex w-full flex-col gap-6 lg:flex-1">
        {data.map((review: any, index: number) => (
          <div className="flex flex-col gap-4" key={index}>
            <div className="flex gap-4">
              <div className="relative h-12 w-12 overflow-hidden rounded-full">
                <Image
                  src={review.user.avatar_url}
                  alt={`${review.user.name}'s photo`}
                  fill
                  placeholder={`data:image/svg+xml;base64,${toBase64(Shimmer(700, 475))}`}
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-1">
                <h4>{review.user.name}</h4>
                <Rating
                  name="text-feedback"
                  readOnly
                  precision={0.5}
                  value={review.rating}
                  emptyIcon={
                    <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                  }
                />
              </div>
              <p className="ml-auto">{review.created_at}</p>
            </div>
            <p className="text-base font-normal leading-6 text-neutral-600">
              {review.content}
            </p>
          </div>
        ))}
      </div>
      <Button variant="secondary" className={cn("mx-auto w-full px-5 py-3")}>
        Show 10 more reviews
      </Button>
    </>
  );
}
