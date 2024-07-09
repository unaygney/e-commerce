import { db } from "@/db";
import CheckoutForm from "./checkout-form";
import CheckoutSummary from "./checkout-summary";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
export default async function CheckoutContent() {
  const cookieStore = cookies();
  const cartId = cookieStore.get("cart_id")?.value;

  const cart = await db.cart.findUnique({
    where: { cart_id: cartId },
    include: {
      items: {
        include: {
          product: true,
          unit: true,
        },
      },
      summary: true,
    },
  });

  if (!cart) {
    return notFound();
  }

  return (
    <div className="flex w-full flex-col gap-8 xl:flex-row">
      <CheckoutForm />
      <CheckoutSummary basket={cart} />
    </div>
  );
}
