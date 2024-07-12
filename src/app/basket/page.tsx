import Container from "@/components/container";
import React from "react";
import ShoppingCard from "@/components/shopping-card";
import { getBasketData } from "@/lib/services";
import { db } from "@/db";
import { cookies } from "next/headers";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "StyleNest | Basket",
  description: "StyleNest is a fashion e-commerce website.",
};

export default async function Basket() {
  const cookieStore = cookies();
  const cartId = cookieStore.get("cart_id")?.value;
  let cart;

  if (cartId) {
    cart = await db.cart.findUnique({
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
  }

  if (!cartId) cart = [];

  return (
    <Container>
      <ShoppingCard basket={cart} />
    </Container>
  );
}
