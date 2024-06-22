"use client";
import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

export function ProductThumbnail({ product }: any) {
  const [selectedImage, setSelectedImage] = React.useState<null | string>(null);
  const { images } = product;
  const searchParams = useSearchParams();
  const color = searchParams.get("color") ?? "green";

  const filteredImages = images.filter((image: any) => image?.color === color);

  // useEffect(() => {
  //   if (filteredImages.length > 2) {
  //     setSelectedImage(filteredImages[2].image_url);
  //   } else if (filteredImages.length > 0) {
  //     setSelectedImage(filteredImages[0].image_url);
  //   }
  // }, [filteredImages]);

  return (
    <div className="flex w-full flex-1 flex-col gap-6 lg:min-w-[48%]">
      <div className="flex flex-col gap-6">
        <div className="relative h-[400px] w-full overflow-hidden rounded-lg md:h-[800px]">
          <Image
            src={selectedImage || filteredImages[0].image_url}
            alt="selected image"
            fill
          />
        </div>
        <div className="no-scrollbar flex h-[120px] gap-4 overflow-scroll md:h-[190px]">
          {filteredImages.map(
            (
              thumbnail: { color: string; image_url: string },
              index: React.Key | null | undefined,
            ) => (
              <div
                key={index}
                className="relative h-full w-full min-w-[80px] flex-1 cursor-pointer overflow-hidden rounded-lg md:min-w-[188px] lg:min-w-[160px]"
                onClick={() => setSelectedImage(thumbnail.image_url)}
              >
                <Image src={thumbnail.image_url} alt={`product image`} fill />
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
}
