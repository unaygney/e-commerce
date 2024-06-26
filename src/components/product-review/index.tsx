"use client";

import React from "react";
import { DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { getProductReview } from "@/lib/services";
import { useQuery } from "@tanstack/react-query";
import { cn } from "@/lib/utils";

export default function ProductReview({
  productName,
}: {
  productName: string;
}) {
  const { data, isLoading } = useQuery({
    queryKey: ["reviews", productName],
    queryFn: async () => await getProductReview(productName),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <DialogDescription className={cn("mt-6 pt-6")}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, odit
        praesentium voluptatibus qui beatae tempora sequi libero totam aut quas
        id molestias debitis sapiente ipsam, ex odio similique ipsa mollitia!
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Similique vel
        voluptates qui, consequatur recusandae iusto nesciunt nulla fugit illum
        incidunt praesentium, itaque eum minima veniam nihil, libero enim nam
        optio voluptate odit a architecto commodi modi consequuntur! Earum
        architecto facilis omnis quam eligendi beatae tempora distinctio animi
        similique perspiciatis reiciendis, incidunt, pariatur nihil voluptatem
        tenetur ratione, porro reprehenderit? Saepe incidunt rerum asperiores
        corrupti id vitae debitis at! Aliquam, voluptatem minima fugiat saepe
        corrupti voluptatum minus eaque asperiores, officia eum incidunt
        voluptas laborum provident iure aperiam? Quam sed doloremque, eos
        deleniti ipsam similique sint unde soluta aspernatur commodi officia
        voluptates illo, fugit est ex obcaecati omnis! Velit neque aliquid nobis
        earum temporibus ipsa, laudantium ut porro commodi quam pariatur!
        Suscipit quam sapiente numquam, maxime consequatur impedit error rem
        quaerat quis qui deserunt dolorum assumenda obcaecati sunt voluptatum
        dolore voluptas provident esse. Ut suscipit magni harum nam labore quam?
        Voluptatem possimus voluptate, quod et placeat debitis similique
        aspernatur quibusdam, vero quia optio. Earum, odit veniam! Voluptate
        totam qui possimus dolores facilis explicabo, corrupti autem beatae in
        maiores et quaerat recusandae odit! Rerum nam dicta officia aliquam
        nesciunt, temporibus facere ex vero assumenda nostrum, consequatur sequi
        porro atque voluptas non aut eligendi velit.
      </DialogDescription>
    </>
  );
}
