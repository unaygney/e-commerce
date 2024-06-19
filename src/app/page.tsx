import { connectDB } from "@/lib/db";
import React from "react";
import Product from "@/lib/models";
import { IProduct } from "@/lib/definitions";
import ProductDetail from "@/components/product-detail";

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
    <main className="min-h-screen w-full bg-gray-300 p-4">
      <ProductDetail product={formattedProduct} />
    </main>
  );
}
