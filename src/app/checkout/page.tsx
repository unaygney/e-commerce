import Container from "@/components/container";
import Link from "next/link";
import React from "react";
import { ChevronLeft } from "lucide-react";
import { buttonVariants } from "@/components/button";
import { cn } from "@/lib/utils";
import CheckoutContent from "./checkout-content";

export default function CheckoutPage() {
  return (
    <Container>
      <section
        id="checkout"
        className="flex flex-col items-start gap-8 px-3 py-12 md:px-4 md:py-16 xl:p-24"
      >
        <CheckoutHeader />
        <CheckoutContent />
      </section>
    </Container>
  );
}

function CheckoutHeader() {
  return (
    <>
      <Link
        className={cn(buttonVariants({ variant: "linkColor" }), "p-0")}
        href={"/basket"}
      >
        <ChevronLeft />
        Back to Shopping Cart
      </Link>
      <h1 className="text-2xl font-semibold leading-8 text-neutral-900 md:text-3xl md:leading-9 xl:leading-10">
        Checkout
      </h1>
    </>
  );
}
