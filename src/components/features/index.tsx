import React from "react";
import { Feature, FEATURES } from "./constant";

export default function Features() {
  return (
    <section id="features">
      <div className="flex flex-col gap-3 text-center">
        <p className="text-base font-semibold leading-6 text-indigo-700">
          Elevate Your Experience
        </p>
        <h3 className="mx-auto mb-2 max-w-[30ch] text-3xl font-semibold leading-9 text-neutral-900 md:text-5xl md:leading-[48px]">
          Our Commitment to Exceptional Service
        </h3>
        <p className="mx-auto max-w-[79ch] text-lg font-normal leading-7 text-neutral-600 md:text-2xl md:leading-7">
          We pride ourselves on a foundation of exceptional customer service,
          where every interaction is a testament to our dedication to
          excellence.
        </p>
      </div>
      <div
        role="list"
        className="grid grid-cols-1 gap-8 px-3 py-12 md:grid-cols-2 md:px-4 md:py-16 xl:grid-cols-3 xl:gap-y-12 xl:p-24"
      >
        {FEATURES.map((feature) => (
          <Card key={feature.id} feature={feature} />
        ))}
      </div>
    </section>
  );
}

function Card({ feature }: { feature: Feature }) {
  const { icon, title, content } = feature;
  return (
    <div role="listitem" className="flex flex-col items-center text-center">
      <span
        aria-hidden="true"
        className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-indigo-700 shadow-md"
      >
        {icon}
      </span>
      <h5 className="mb-2 text-xl font-semibold leading-7 text-neutral-900">
        {title}
      </h5>
      <p className="text-base font-normal leading-6 text-neutral-600 md:max-w-[50ch] xl:max-w-full">
        {content}
      </p>
    </div>
  );
}
