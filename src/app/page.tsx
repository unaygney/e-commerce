import { connectDB } from "@/lib/db";
import React from "react";
import Product from "@/lib/models";
import { IProduct } from "@/lib/definitions";
export default async function Home() {
  await connectDB();
  const product = await Product.find({ name: "Classic Zip-Up Hoodie" }).lean();

  const formattedProduct: IProduct[] = product.map(({ _id, name, ...rest }) => {
    return {
      id: _id?.toString(),
      ...rest,
    } as IProduct;
  });

  return (
    <main className="flex min-h-screen w-full items-center justify-center">
      <div className="flex w-[340px] flex-col gap-12"></div>
    </main>
  );
}
