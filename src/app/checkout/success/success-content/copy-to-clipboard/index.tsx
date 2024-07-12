"use client";
import { FileCopy } from "@/components/icons";
import React from "react";
import { useToast } from "@/components/ui/use-toast";
export default function CopyToClipboard({ id }: { id: string }) {
  const { toast } = useToast();
  const handleClick = () => {
    navigator.clipboard.writeText(id);
    toast({
      description: "Order number copied",
    });
  };
  return (
    <div className="mt-12 flex flex-col gap-1">
      <h6 className="text-base font-normal leading-6 text-neutral-600">
        Order Number
      </h6>
      <div className="flex items-center gap-1.5">
        <span className="text-base font-medium leading-6 text-indigo-700">
          {id}
        </span>
        <button onClick={handleClick} className="text-indigo-700">
          <FileCopy />
        </button>
      </div>
    </div>
  );
}
