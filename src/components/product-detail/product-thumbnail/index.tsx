"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

export function ProductThumbnail({ product }: any) {
  const [selectedImage, setSelectedImage] = React.useState("/image.png");
  const { images } = product;
  const searchParams = useSearchParams();
  const color = searchParams.get("color") ?? "green";

  const filteredImages = images.filter((image: any) => image?.color === color);

  const thumbnails = [
    { src: "/image.png", alt: "image thumbnail" },
    { src: "/image-1.png", alt: "image thumbnail 1" },
    { src: "/image-2.png", alt: "image thumbnail 2" },
    { src: "/image-3.png", alt: "image thumbnail 3" },
  ];

  return (
    <div className="flex w-full flex-1 flex-col gap-6 lg:min-w-[48%]">
      <div className="flex flex-col gap-6">
        <div className="relative h-[400px] w-full overflow-hidden rounded-lg md:h-[800px]">
          <Image src={selectedImage} alt="selected image" fill />
        </div>
        <div className="no-scrollbar flex h-[120px] gap-4 overflow-scroll md:h-[190px]">
          {thumbnails.map(
            (
              thumbnail: { src: string; alt: string },
              index: React.Key | null | undefined,
            ) => (
              <div
                key={index}
                className="relative h-full w-full min-w-[80px] flex-1 cursor-pointer overflow-hidden rounded-lg md:min-w-[188px] lg:min-w-[160px]"
                onClick={() => setSelectedImage(thumbnail.src)}
              >
                <Image src={thumbnail.src} alt={thumbnail.alt} fill />
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
}
