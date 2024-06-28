"use client";

import React from "react";
import { DialogDescription } from "@/components/ui/dialog";
import { useInfiniteQuery } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import { Rating } from "@mui/material";
import { StarIcon } from "lucide-react";
import { Button } from "../button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getProductReview } from "@/lib/services";
import { getInitials, getRatingText } from "@/lib/helper";
import { Progress } from "@/components/ui/progress";

export default function ProductReview({
  productName,
}: {
  productName: string;
}) {
  const { data, isLoading, isError, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["reviews", productName],
      queryFn: async ({ pageParam = 1 }) =>
        await getProductReview("voyager-hoodie", { page: pageParam }),
      getNextPageParam: (lastPage) =>
        lastPage.pagination.has_more ? lastPage.pagination.page + 1 : undefined,
      initialPageParam: 1,
    });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading reviews.</div>;
  }

  const allReviews = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <DialogDescription className={cn("mt-6 pt-6")}>
      <div className="flex flex-col gap-10 lg:flex-row lg:gap-8">
        <ReviewsSummary data={data?.pages[0].aggregate} />
        <Reviews
          data={allReviews}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
        />
      </div>
    </DialogDescription>
  );
}

function ReviewsSummary({ data }: { data: any }) {
  const sortedCounts = [...data.counts].sort((a, b) => b.rating - a.rating);
  console.log(sortedCounts);

  function getRatingColor(rating: number): string {
    switch (rating) {
      case 5:
        return "#16A34A";
      case 4:
        return "#22C55E";
      case 3:
        return "#FDE047";
      case 2:
        return "#EAB308";
      case 1:
        return "#FACC15";
      default:
        return "#ccc";
    }
  }

  return (
    <div className="flex w-full flex-col gap-6 lg:max-w-[384px]">
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
      <div className="flex flex-col gap-5">
        {sortedCounts.map((count: any, index: number) => (
          <div key={index} className="flex items-center gap-2">
            <p className="w-[120px] text-base font-medium leading-6 text-neutral-600">
              {getRatingText(count.rating)}
            </p>
            <Progress
              value={count.count}
              max={100}
              className={`h-2 w-[142px] bg-gray-200`}
              color={getRatingColor(count.rating)}
            />
            <p className="text-right text-base font-normal leading-6 text-neutral-600">
              {count.count}
            </p>
          </div>
        ))}
      </div>
      <Button variant="secondary" className={cn("mx-auto w-[153px] px-5 py-3")}>
        Write a review
      </Button>
    </div>
  );
}

function Reviews({
  data,
  fetchNextPage,
  hasNextPage,
}: {
  data: any[];
  fetchNextPage: any;
  hasNextPage: boolean;
}) {
  return (
    <div>
      <div className="flex w-full flex-col gap-6 lg:flex-1">
        {data.map((review: any, index: number) => (
          <div className="flex flex-col gap-4" key={index}>
            <div className="flex gap-4">
              <div className="relative h-12 w-12 overflow-hidden rounded-full">
                {review.user.avatar_url ? (
                  <Avatar>
                    <AvatarImage
                      className="object-cover"
                      src={review?.user?.avatar_url}
                    />
                    <AvatarFallback>
                      {getInitials(review.user.name)}
                    </AvatarFallback>
                  </Avatar>
                ) : (
                  <Avatar>
                    <AvatarFallback>
                      {getInitials(review.user.name)}
                    </AvatarFallback>
                  </Avatar>
                )}
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
      {hasNextPage && (
        <Button
          variant="secondary"
          className={cn("mx-auto mt-10 w-full px-5 py-3")}
          onClick={() => fetchNextPage()}
        >
          Show 10 more reviews
        </Button>
      )}
    </div>
  );
}
