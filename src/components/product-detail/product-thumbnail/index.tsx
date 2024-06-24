"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { toBase64 } from "@/lib/helper";
import { Shimmer } from "@/components/icons";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Product } from "@/lib/definitions";

interface ProductDetailProps {
  product: Product;
}

export function ProductThumbnail({ product }: ProductDetailProps) {
  const { images, inventory } = product;
  const searchParams = useSearchParams();

  let defaultColor = inventory[0]?.color ?? "";

  const color = searchParams.get("color") ?? defaultColor;
  const filteredImages = images.filter((image: any) => image?.color === color);

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  return (
    <div className="flex w-full flex-1 flex-col gap-6 lg:max-w-[48%]">
      <div className="flex h-full w-full flex-col gap-6">
        <Swiper
          style={
            {
              "--swiper-navigation-color": "transparent",
              "--swiper-pagination-color": "transparent",
            } as React.CSSProperties
          }
          loop={true}
          spaceBetween={10}
          navigation={true}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="h-[400px] w-full md:h-[800px]"
        >
          {filteredImages.map((image: any, index: number) => (
            <SwiperSlide
              key={index}
              className="relative w-full overflow-hidden rounded-lg"
            >
              <Image
                fill
                alt="image"
                src={image?.image_url}
                placeholder={`data:image/svg+xml;base64,${toBase64(Shimmer(700, 475))}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={10}
          slidesPerView={3}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="no-scrollbar flex h-[120px] w-full gap-4 overflow-scroll md:h-[190px]"
          style={
            {
              height: "120px",
              maxHeight: "120px",
              md: { height: "190px", maxHeight: "190px" },
            } as React.CSSProperties
          }
        >
          {filteredImages.map((image: any, index: number) => (
            <SwiperSlide
              key={index}
              className="relative h-full w-full min-w-[80px] flex-1 cursor-pointer overflow-hidden rounded-lg md:min-w-[188px] lg:min-w-[160px]"
            >
              <Image
                fill
                alt={`product image ${index}`}
                src={image?.image_url}
                className="object-cover"
                placeholder={`data:image/svg+xml;base64,${toBase64(Shimmer(700, 475))}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
