import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TAB_LIST } from "./constant";
import { cn } from "@/lib/utils";
import Image from "next/image";
export default function ProductSpecifications() {
  return (
    <section
      id="product-specifications"
      className="flex flex-col gap-16 rounded bg-white px-4 py-12 shadow-sm md:py-16 xl:px-28 xl:py-24"
    >
      <ProductHeader />
      <ProductInformation />
    </section>
  );
}

function ProductHeader() {
  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-3xl font-semibold leading-9 text-neutral-900 md:text-5xl lg:leading-[48px]">
        Discover timeless elagance
      </h3>
      <p className="text-lg font-normal leading-7 text-neutral-600">
        Step into a world where quality meets quintessential charm with our
        collection. Every thread weaves a promise of unparalleled quality,
        ensuring that each garment is not just a part of your wardrobe, but a
        piece of art. Here&apos;s the essence of what makes our apparel the
        hallmark for those with an eye for excellence and a heart for the
        environment.
      </p>
    </div>
  );
}

function ProductInformation() {
  return (
    <Tabs defaultValue="Sustainability">
      <TabsList
        className={cn(
          "relative flex w-full justify-start gap-6 overflow-x-auto bg-white",
        )}
      >
        {TAB_LIST.map(({ tab_title, id }) => (
          <TabsTrigger
            key={id}
            value={tab_title}
            className={cn(
              "rounded-none text-base font-medium leading-6 text-neutral-600 data-[state=active]:border-b data-[state=active]:border-b-indigo-600 data-[state=active]:text-indigo-700 data-[state=active]:shadow-none",
            )}
          >
            {tab_title}
          </TabsTrigger>
        ))}
      </TabsList>
      {TAB_LIST.map(
        ({ content, content_title, id, tab_title, images, features }) => (
          <TabsContent key={id} value={tab_title} className="mt-8">
            <div className="flex flex-col gap-8 xl:flex-row">
              <div className="relative h-[180px] w-full overflow-hidden rounded-lg md:h-[384px] xl:h-[256px] xl:w-[367px]">
                <Image
                  src={images.mobile}
                  alt={images.alt}
                  fill
                  className="object-cover md:hidden"
                />
                <Image
                  src={images.tablet}
                  alt={images.alt}
                  fill
                  className="hidden object-cover md:block xl:hidden"
                />
                <Image
                  src={images.desktop}
                  alt={images.alt}
                  fill
                  className="hidden object-cover xl:block"
                />
              </div>

              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-2">
                  <h3 className="text-2xl font-medium leading-8 text-neutral-900">
                    {content_title}
                  </h3>
                  <p className="text-base font-normal leading-6 text-neutral-600">
                    {content}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {features.map(({ feature, feature_icon }, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-indigo-700 shadow">
                        {feature_icon}
                      </span>
                      <h6 className="text-base font-normal leading-6 text-neutral-600">
                        {feature}
                      </h6>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        ),
      )}
    </Tabs>
  );
}
