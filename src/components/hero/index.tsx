import Link from "next/link";
import React from "react";
import { buttonVariants } from "../button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { toBase64 } from "@/lib/helper";
import { Shimmer } from "../icons";
export default function Hero() {
  return (
    <section
      id="hero"
      className="flex flex-col gap-12 rounded-t-lg bg-transparent px-3 py-12 md:gap-8 md:px-4 md:py-16 xl:flex-row xl:p-24"
    >
      <div className="flex flex-col gap-4 xl:my-auto">
        <h1 className="text-4xl font-semibold leading-10 text-neutral-900 md:text-5xl md:leading-[48px]">
          Summer styles are finally here
        </h1>
        <p className="text-lg font-normal leading-7 text-neutral-600 md:text-xl md:leading-7">
          This year, our new summer collection will be your haven from the
          world's harsh elements.
        </p>
        <Link
          href="#"
          className={cn(
            buttonVariants({ variant: "primary", size: "medium" }),
            "mt-4 w-[151.5px] md:mt-12",
          )}
        >
          Shop now
        </Link>
      </div>
      <div className="relative h-[246px] w-full md:h-[526px]">
        <Image
          src="/hero-mobile.png"
          placeholder={`data:image/svg+xml;base64,${toBase64(Shimmer(700, 475))}`}
          alt="hero image"
          fill
        />
        <Image
          src="/hero.png"
          placeholder={`data:image/svg+xml;base64,${toBase64(Shimmer(700, 475))}`}
          alt="hero image"
          fill
          className="hidden md:block xl:hidden"
        />
        <Image
          src="/hero.png"
          placeholder={`data:image/svg+xml;base64,${toBase64(Shimmer(700, 475))}`}
          alt="hero image"
          fill
          className="xl:blo hidden"
        />
      </div>
    </section>
  );
}
