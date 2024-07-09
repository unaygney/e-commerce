"use server";

import { cookies } from "next/headers";
import { db } from "@/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteProduct(formData: FormData) {
  const cookiesStore = cookies();
  const cart_id = cookiesStore.get("cart_id")?.value;
  const item_id = formData.get("product_id");

  const itemIdNumber = Number(item_id);

  const cartItem = await db.cartItem.findUnique({
    where: { id: itemIdNumber },
    include: { unit: true },
  });

  if (!cartItem) throw new Error("Item not found in cart");

  await db.cartItem.delete({
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

  await db.cart.update({
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
  };
}

export async function updateQuantity(formData: FormData) {
  const cookiesStore = cookies();
  const cart_id = cookiesStore.get("cart_id")?.value;
  const item_id = formData.get("item_id");
  const action = formData.get("action");

  if (!cart_id) throw new Error("Cart not found");
  if (!item_id) throw new Error("Item ID is required");

  const itemIdNumber = Number(item_id);

  const cartItem = await db.cartItem.findUnique({
    where: { id: itemIdNumber },
    include: { unit: true },
  });

  if (!cartItem) throw new Error("Item not found in cart");

  let newQuantity = cartItem.quantity;
  if (action === "increase") {
    newQuantity += 1;
  } else if (action === "decrease" && newQuantity > 1) {
    newQuantity -= 1;
  }

  await db.cartItem.update({
    where: { id: itemIdNumber },
    data: {
      quantity: newQuantity,
      total_sale_price: newQuantity * cartItem.unit.sale_price,
      total_list_price: newQuantity * cartItem.unit.list_price,
    },
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

  await db.cart.update({
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
    message: "Quantity updated successfully",
  };
}

export async function applyCoupon(formData: FormData) {
  let url =
    "https://www.greatfrontend.com/api/projects/challenges/e-commerce/coupons/apply";

  const coupon = formData.get("coupon") as string;
  const cookiesStore = cookies();
  const cart_id = cookiesStore.get("cart_id")?.value;

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ coupon_code: coupon }),
  });

  const data = await response.json();

  if (!response.ok) {
    console.log(data);
    throw new Error(data.error || "Something went wrong");
  }

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

  let discount = 0;
  if (data.discount_percentage) {
    discount = (cart.summary.subtotal * data.discount_percentage) / 100;
  } else if (data.discount_amount) {
    discount = data.discount_amount;
  }

  const newTotal = cart.summary.subtotal - discount + cart.summary.shipping;

  await db.cart.update({
    where: { cart_id },
    data: {
      summary: {
        update: {
          discount: discount,
          discount_code: coupon,
          total: newTotal,
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
}

export async function deleteCoupon(formData: FormData) {
  const cookiesStore = cookies();
  const cart_id = cookiesStore.get("cart_id")?.value;
  const coupon = formData.get("coupon") as string;

  const cart = await db.cart.findUnique({
    where: { cart_id },
    include: {
      summary: true,
    },
  });

  if (!cart) throw new Error("Cart not found");

  const newTotal = cart.summary.subtotal + cart.summary.shipping;

  await db.cart.update({
    where: { cart_id },
    data: {
      summary: {
        update: {
          discount: 0,
          discount_code: null,
          total: newTotal,
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
}
