import Container from "@/components/container";
import React from "react";
import SuccessImageSection from "./success-image-section";
import SuccessContent from "./success-content";
import { db } from "@/db";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "StyleNest | Order Success",
  description: "StyleNest is a fashion e-commerce website.",
};

export const dynamic = "force-dynamic";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const order_id = searchParams["order_id"] as string;

  if (!order_id) notFound();

  const order: any = await db.order.findUnique({
    where: {
      id: order_id,
      isPaid: true,
    },
    include: {
      billingAddress: true,
      shippingAddress: true,
      cart: {
        include: {
          summary: true,
          items: {
            include: {
              product: true,
              unit: true,
            },
          },
        },
      },
    },
  });

  if (!order) notFound();

  return (
    <Container>
      <section
        id="success-page-section"
        className="flex flex-col gap-12 px-3 py-12 md:px-4 md:py-16 xl:flex-row xl:gap-8 xl:p-24"
      >
        <SuccessImageSection />
        <SuccessContent order={order} />
      </section>
    </Container>
  );
}
