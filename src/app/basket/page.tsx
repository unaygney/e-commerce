import Container from "@/components/container";
import React from "react";
import ShoppingCard from "@/components/shopping-card";

export default async function Basket() {
  const basket = await getBasketData();
  return (
    <Container>
      <ShoppingCard basket={basket} />
    </Container>
  );
}

const getBasketData = async () => {
  let url =
    "https://www.greatfrontend.com/api/projects/challenges/e-commerce/cart-sample";
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
