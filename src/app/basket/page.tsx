import Container from "@/components/container";
import React from "react";
import ShoppingCard from "@/components/shopping-card";
import { getBasketData } from "@/lib/services";
import { db } from "@/db";
import { cookies } from "next/headers";

export default async function Basket() {
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

  const basket = cart;
  return (
    <Container>
      <ShoppingCard basket={basket} />
    </Container>
  );
}
