"use server";
import { cookies } from "next/headers";
import { db } from "@/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function deleteProduct(formData: FormData) {
  const cookiesStore = cookies();
  const cart_id = cookiesStore.get("cart_id")?.value;
  const item_id = formData.get("product_id");

  const itemIdNumber = Number(item_id);

  const cartItem = await db.cartItem.findUnique({
    where: { id: itemIdNumber },
  });

  if (!cartItem) throw new Error("Item not found in cart");

  const deletedItem = await db.cartItem.delete({
    where: { id: itemIdNumber },
  });

  const cart = await db.cart.findUnique({
    where: { cart_id },
    include: {
      items: {
        include: {
          unit: true,
        },
      },
      summary: true,
    },
  });

  if (!cart) throw new Error("Cart not found");

  const newSubtotal = cart.items.reduce(
    (sum, item) => sum + item.total_sale_price,
    0,
  );

  const updatedCart = await db.cart.update({
    where: { cart_id },
    data: {
      summary: {
        update: {
          subtotal: newSubtotal,
          total: newSubtotal + cart.summary.shipping - cart.summary.discount,
        },
      },
    },
    include: {
      items: true,
      summary: true,
    },
  });

  revalidatePath("/basket");
  redirect("/basket");

  return {
    success: true,
    message: "Product removed from cart successfully",
    cart: updatedCart,
  };
}
