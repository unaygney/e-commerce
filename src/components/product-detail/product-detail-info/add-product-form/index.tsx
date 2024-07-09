"use client";
import React from "react";
import { addProductToCart } from "@/app/product/[id]/actions";
import { useToast } from "@/components/ui/use-toast";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/button";
import { Loader2 } from "lucide-react";

export default function AddProductForm({
  product_id,
  selected,
  curSize,
  quantity,
  itemStock,
}: {
  product_id: string;
  selected: string;
  curSize: string | number;
  quantity: number;
  itemStock: any;
}) {
  const { toast } = useToast();

  return (
    <form
      action={async (formData: FormData) => {
        const res = await addProductToCart(formData);

        if (res.success) {
          toast({
            title: res.message,
          });
        } else {
          toast({
            description: res.message,
          });
        }
      }}
    >
      <input type="hidden" name="product_id" value={product_id} />
      <input type="hidden" name="color" value={selected} />
      <input type="hidden" name="size" value={curSize} />
      <input type="hidden" name="quantity" value={quantity} />

      <AddToCart itemStock={itemStock} />
    </form>
  );
}

function AddToCart({ itemStock }: { itemStock: any }) {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={itemStock?.stock === 0 || pending}
      className="w-full"
      type="submit"
      variant="primary"
      size="large"
    >
      {pending && <Loader2 className="animate-spin" />}
      Add to Cart
    </Button>
  );
}
