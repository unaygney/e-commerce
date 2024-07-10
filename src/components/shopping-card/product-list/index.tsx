import Image from "next/image";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/button";
import { Minus, Plus } from "lucide-react";
import { deleteProduct, updateQuantity } from "@/app/basket/actions";
import { adjustSize } from "@/lib/helper";

export default function ProductList({ basket }: { basket: any }) {
  return (
    <div className="flex w-full flex-col gap-8 xl:flex-1">
      {basket.items.map((item: any) => (
        <ProductItem key={item.product.product_id} item={item} />
      ))}
    </div>
  );
}

function ProductItem({ item }: { item: any }) {
  const { product, unit, total_list_price, total_sale_price, quantity } = item;

  return (
    <div className="flex flex-col gap-4 border-dashed border-neutral-200 pb-8 md:flex-row [&:not(:last-child)]:border-b">
      <div className="relative h-[200px] w-full overflow-hidden rounded-lg md:w-[280px]">
        <Image
          alt={`${product.name}' image`}
          src={unit.image_url}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-4 md:flex-1">
        <h3 className="text-2xl font-medium leading-8 text-neutral-900">
          {product.name}
        </h3>
        <div className="flex items-center gap-1">
          <span className="text-base font-medium capitalize leading-6 text-neutral-600">
            {unit.color}
          </span>
          <span className="text-base font-medium leading-6 text-neutral-600">
            •
          </span>
          <span className="text-base font-medium capitalize leading-6 text-neutral-600">
            {unit.size === "null" ? "One size" : adjustSize(unit.size)}
          </span>
        </div>
        <p className="text-sm font-normal leading-5 text-neutral-600">
          {product.description}
        </p>

        <div className="flex items-center gap-4 xl:mt-auto">
          <form
            className="flex h-9 w-[125px] items-center justify-between gap-3 rounded-md border border-neutral-200 bg-neutral-50 p-0.5"
            action={updateQuantity}
          >
            <input name="item_id" value={item.id} type="hidden" />
            <button
              name="action"
              value="decrease"
              className="inline-flex h-5 w-5 items-center justify-center p-0.5"
              type="submit"
            >
              <Minus width={16} height={16} />
            </button>
            <span className="text-sm font-medium leading-5 text-neutral-600">
              {quantity}
            </span>
            <button
              name="action"
              value="increase"
              className="inline-flex h-5 w-5 items-center justify-center p-0.5"
              type="submit"
            >
              <Plus width={16} height={16} />
            </button>
          </form>

          <Dialog>
            <DialogTrigger className="text-sm font-medium leading-5 text-neutral-600">
              Remove
            </DialogTrigger>
            <DialogContent className="flex max-w-[343px] flex-col">
              <DialogHeader>
                <DialogTitle>Confirm Item Removal?</DialogTitle>
                <DialogDescription>
                  Are you sure you want to remove this item from your shopping
                  cart? of title
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="mt-6 flex gap-3">
                <DialogClose className="flex-1" asChild>
                  <Button type="button" variant="secondary" size="medium">
                    Close
                  </Button>
                </DialogClose>

                <form className="md:w-[50%]" action={deleteProduct}>
                  <input name="product_id" value={item.id} type="hidden" />
                  <Button
                    className="w-full"
                    type="submit"
                    variant="primary"
                    size="medium"
                  >
                    Yes
                  </Button>
                </form>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <div className="ml-auto flex items-center gap-2">
            <span className="text-lg font-medium leading-7 text-neutral-900">
              ${total_sale_price}
            </span>
            {total_list_price !== total_sale_price && (
              <span className="text-xs font-normal leading-4 text-neutral-600 line-through">
                ${total_list_price}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
