import React from "react";
import { SOCIAL_LINKS } from "./constant";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="footer"
      className="mx-auto flex w-full max-w-[1408px] flex-col bg-white px-4 py-12 md:py-16 xl:py-24"
    >
      <div>email</div>
      <div>navigation area</div>
      <div className="flex flex-col gap-8 border-t border-neutral-200 pt-8 md:flex-row md:justify-between">
        <p className="text-base font-normal leading-6 text-neutral-500">{`©${currentYear} StyleNest, Inc. All rights reserved.`}</p>
        <div className="flex gap-6">
          {SOCIAL_LINKS.map((item) => (
            <span key={item.id}>{item.icons}</span>
          ))}
        </div>
      </div>
    </footer>
  );
}
