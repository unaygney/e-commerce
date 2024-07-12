import React from "react";
import Image from "next/image";
import { toBase64 } from "@/lib/helper";
import { Shimmer } from "@/components/icons";
export default function SuccessImageSection() {
  return (
    <div className="relative h-[196px] w-full overflow-hidden md:h-[420px] xl:min-h-screen xl:w-[592px]">
      <Image
        src={"/success-image-mobile.png"}
        className="object-cover md:hidden"
        alt="success image "
        fill
        placeholder={`data:image/svg+xml;base64,${toBase64(Shimmer(700, 475))}`}
      />
      <Image
        src={"/success-image-tablet.png"}
        className="hidden object-cover md:block xl:hidden"
        alt="success image "
        fill
        placeholder={`data:image/svg+xml;base64,${toBase64(Shimmer(700, 475))}`}
      />
      <Image
        src={"/success-image-desktop.png"}
        className="hidden object-cover xl:block"
        alt="success image "
        fill
        placeholder={`data:image/svg+xml;base64,${toBase64(Shimmer(700, 475))}`}
      />
    </div>
  );
}
