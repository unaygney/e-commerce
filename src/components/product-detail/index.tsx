import { IProduct } from "@/lib/definitions";
import Image from "next/image";
import React from "react";
import { Label } from "../label";
import { Badge } from "../badge";
import { Button } from "../button";

export default function ProductDetail({ product }: { product: IProduct[] }) {
  let { name } = product[0];
  return (
    <section className="container mx-auto flex flex-col gap-12 rounded-md bg-white px-4 py-12 shadow-sm lg:flex-row lg:gap-8 lg:p-24">
      <ProductThumbnail />
      <ProductDetailInfo />
    </section>
  );
}

function ProductThumbnail() {
  return (
    <div className="flex w-full min-w-[48%] flex-1 flex-col gap-6">
      <div className="flex flex-col gap-6">
        <div className="relative h-[400px] w-full overflow-hidden rounded-lg md:h-[800px]">
          <Image src={"/image.png"} alt="image thumpnail" fill />
        </div>
        <div className="no-scrollbar flex h-[120px] gap-4 overflow-scroll md:h-[190px]">
          <div className="relative h-full w-full min-w-[80px] flex-1 overflow-hidden rounded-lg md:min-w-[188px] lg:min-w-[160px]">
            <Image src={"/image-1.png"} alt="image thumpnail" fill />
          </div>
          <div className="relative h-full min-w-[80px] flex-1 overflow-hidden rounded-lg md:min-w-[188px] lg:min-w-[160px]">
            <Image src={"/image-2.png"} alt="image thumpnail" fill />
          </div>
          <div className="relative h-full min-w-[80px] flex-1 overflow-hidden rounded-lg md:min-w-[188px] lg:min-w-[160px]">
            <Image src={"/image-3.png"} alt="image thumpnail" fill />
          </div>
          <div className="relative h-full min-w-[80px] flex-1 overflow-hidden rounded-lg md:min-w-[188px] lg:min-w-[160px]">
            <Image src={"/image-3.png"} alt="image thumpnail" fill />
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductDetailInfo() {
  return (
    <div className="flex w-full min-w-[48%] flex-1 flex-col">
      <div className="flex flex-col">
        <h1 className="text-3xl font-semibold leading-9 text-neutral-900 md:text-5xl md:leading-[48px]">
          Voyager Hoodie
        </h1>
        <div className="mt-5 flex flex-col">
          <div className="flex items-end gap-2">
            <span className="text-3xl font-medium leading-9 text-neutral-600">
              $76
            </span>
            <span className="text-lg font-medium leading-7 text-neutral-400">
              $95
            </span>
          </div>
          <Badge variant="warning" size="medium" className="mt-2 self-start">
            %20 OFF
          </Badge>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <h6 className="text-xl font-normal leading-7 text-neutral-900">
            4.1
          </h6>
          <div>yıldız gelcek</div>
          <p className="text-sm font-medium leading-5 text-indigo-700">
            See all 62 reviews
          </p>
        </div>
      </div>
      <p className="my-8 text-base font-normal leading-6 text-neutral-600">
        Product detail
      </p>
      <div className="mb-8">ürün özellikleri</div>
      <Button variant="primary" size="large">
        Add to Cart
      </Button>
    </div>
  );
}
