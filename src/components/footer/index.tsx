"use client";
import React, { useState } from "react";
import { FOOTER_LINKS, SOCIAL_LINKS } from "./constant";
import { Button } from "../button";
import { cn } from "@/lib/utils";
import { Logo } from "../icons";
import Link from "next/link";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { subscribeEmail } from "@/lib/services";
import { useToast } from "../ui/use-toast";

export default function Footer() {
  return (
    <footer
      id="footer"
      className="container mx-auto flex w-full flex-col bg-white px-4 py-12 md:py-16 xl:p-24"
    >
      <Newsletter />
      <Navlinks />
      <Copyright />
    </footer>
  );
}

function Newsletter() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [email, setEmail] = useState("");

  const handleEmailChange: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    setEmail(e.target.value);

  const handleClick = async (e: any) => {
    e.preventDefault();
    mutate(email);
  };

  const { data, isPending, mutate } = useMutation({
    mutationFn: subscribeEmail,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["postEmail"] });
      toast({
        description: data.error ? data.error : data.message,
      });
      setTimeout(() => setEmail(""), 2000);
    },
    onError: (error) => {
      console.error("Error:", error);
    },
  });

  return (
    <div className="flex flex-col gap-12 xl:flex-row xl:justify-between">
      <div className="flex flex-col gap-2">
        <h5 className="text-xl font-semibold leading-7 text-neutral-900">
          Join our newsletter
        </h5>
        <p className="text-base font-normal leading-6 text-neutral-600">
          We&apos;ll send you a nice letter once per week. No spam.
        </p>
      </div>
      <form className="flex w-full flex-col gap-4 md:flex-row xl:w-[400px]">
        <input
          type="string"
          placeholder="Enter your email"
          value={email}
          onChange={handleEmailChange}
          className="h-10 w-full text-ellipsis rounded border border-neutral-200 bg-neutral-50 px-3.5 py-2.5 text-sm leading-5 placeholder:text-neutral-500"
        />
        <Button
          variant="primary"
          size="medium"
          className={cn("h-10 w-full md:w-[98px]")}
          onClick={handleClick}
          disabled={isPending}
        >
          Subscribe
        </Button>
      </form>
    </div>
  );
}

function Navlinks() {
  return (
    <div className="flex flex-col gap-8 xl:mt-16 xl:flex-row xl:justify-between">
      <div className="mt-12 flex flex-col gap-6 xl:mt-0">
        <div className="flex items-center gap-1">
          <Logo />
          <p className="text-base font-bold leading-6 tracking-[-0.96px] text-neutral-900">
            StyleNest
          </p>
        </div>
        <p className="text-base font-normal leading-6 text-neutral-600 md:max-w-xs">
          Craft stunning style journeys that weave more joy into every thread.
        </p>
      </div>
      <div className="mb-12 flex flex-col gap-8 md:flex-row xl:ml-auto xl:min-w-[800px]">
        {FOOTER_LINKS.map((item) => (
          <div key={item.id} className="flex flex-col gap-4 md:flex-1">
            <h5 className="text-sm font-normal leading-5 text-neutral-500 xl:text-right">
              {item.title}
            </h5>
            <nav className="flex flex-col gap-3 xl:text-right">
              {item.categories.map((category) => (
                <Link
                  key={category.id}
                  href={category.link}
                  className="text-base font-medium leading-6 text-neutral-600"
                >
                  {category.linkName}
                </Link>
              ))}
            </nav>
          </div>
        ))}
      </div>
    </div>
  );
}

function Copyright() {
  const currentYear = new Date().getFullYear();
  return (
    <div className="flex flex-col gap-8 border-t border-neutral-200 pt-8 md:flex-row md:justify-between">
      <p className="text-base font-normal leading-6 text-neutral-500">{`©${currentYear} StyleNest, Inc. All rights reserved.`}</p>
      <div className="flex gap-6">
        {SOCIAL_LINKS.map((item) => (
          <Link href="#" key={item.id}>
            {item.icons}
          </Link>
        ))}
      </div>
    </div>
  );
}
