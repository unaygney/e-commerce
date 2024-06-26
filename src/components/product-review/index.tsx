"use client";

import React from "react";
import { DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { getProductReview } from "@/lib/services";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function ProductReview({
  productName,
}: {
  productName: string;
}) {
  return (
    <>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>testing</DialogDescription>
    </>
  );
}
