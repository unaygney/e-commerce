import Container from "@/components/container";
import React from "react";
import ShoppingCard from "@/components/shopping-card";
import { getBasketData } from "@/lib/services";
export default async function Basket() {
  const basket = await getBasketData();
  return (
    <Container>
      <ShoppingCard basket={basket} />
    </Container>
  );
}
