"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { Basket, Logo } from "../icons";
import { Menu, X } from "lucide-react";
import { Button, buttonVariants } from "../button";
import { LINKS } from "./constant";
import { cn } from "@/lib/utils";
import { SITE_NAME } from "@/lib/constants";

export default function Navbar() {
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [open]);

  return (
    <header className="relative mx-auto flex h-[68px] w-full max-w-[1336px] items-center justify-between px-4 py-[18px] md:px-4 lg:justify-start">
      <Link className="flex items-center" href="/">
        <Logo />
        <p className="text-base font-bold leading-6 tracking-[-0.96px] text-neutral-900">
          {SITE_NAME}
        </p>
      </Link>

      {/* Mobile  Buttons */}
      <div className="flex items-center gap-4 lg:hidden">
        <Button variant="linkColor">
          <Basket />
        </Button>
        <Button
          className="text-gray-600"
          onClick={() => setOpen(!open)}
          variant="linkColor"
          role="button"
        >
          <Menu />
        </Button>
      </div>

      {/* Mobile Navbar */}
      <MobileNav open={open} setOpen={setOpen} />

      {/* Overlay */}
      {open && (
        <div
          className={cn(
            "fixed inset-0 h-screen w-screen bg-black bg-opacity-50",
          )}
          onClick={() => setOpen(false)}
          aria-hidden={true}
        />
      )}

      {/* Desktop Navbar */}
      <DesktopNav />

      {/* Desktop Buttons */}
      <div className="ml-auto hidden items-center gap-4 lg:flex">
        <Button variant="linkColor">
          <Basket />
        </Button>
      </div>
    </header>
  );
}

function DesktopNav() {
  return (
    <nav role="navigation" className="ml-24 hidden items-center gap-8 lg:flex">
      {LINKS.map(({ title, id, href }) => (
        <Link
          className={buttonVariants({ variant: "linkGray" })}
          href={href}
          key={id}
        >
          {title}
        </Link>
      ))}
    </nav>
  );
}

function MobileNav({
  setOpen,
  open,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
}) {
  return (
    <nav
      className={cn(
        "absolute -left-4 -top-4 bottom-0 right-0 z-[9999] min-h-screen w-0 bg-white px-4 pb-4 pt-8 opacity-0 transition-all duration-300 ease-in-out lg:hidden",
        { "w-[98%] opacity-100": open },
      )}
      role="navigation"
    >
      <div className="flex h-full w-full flex-col pl-4">
        <div className="flex w-full items-center justify-between">
          <Link className="flex items-center" href="/">
            <Logo />
            <p className="text-base font-bold leading-6 tracking-[-0.96px] text-neutral-900">
              {SITE_NAME}
            </p>
          </Link>
          <button onClick={() => setOpen(false)} role="button">
            <X />
          </button>
        </div>
        <div className="mt-6 flex flex-col gap-4">
          {LINKS.map(({ href, id, title }) => (
            <Link className="link-gray-md truncate" href={href} key={id}>
              {title}
            </Link>
          ))}
        </div>

        <div className="mb-12 mt-auto flex flex-col items-center gap-4">
          <Button
            className="inline-flex w-full items-center justify-center truncate"
            variant="secondary"
            size="large"
          >
            Learn more
          </Button>
          <Button
            variant="primary"
            size="large"
            className="inline-flex w-full items-center justify-center truncate"
          >
            See Pricing
          </Button>
        </div>
      </div>
    </nav>
  );
}
