"use client";

import { Input } from "@/components/input";
import { Label } from "@/components/label";
import { Mail } from "lucide-react";

import React from "react";
export default function Home() {
  const [message, setMessage] = React.useState("");
  return (
    <main className="flex min-h-screen w-full items-center justify-center">
      <div className="flex w-[340px] flex-col gap-12">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="message">Email</Label>
          <Input name="email" placeholder="name@email.com" />
          <p className="text-sm font-normal leading-5 text-neutral-500">
            This is a hint text
          </p>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="message">Email</Label>
          <Input
            name="email"
            placeholder="name@email.com"
            icon={<Mail width={20} height={20} className="text-neutral-500" />}
          />
          <p className="text-sm font-normal leading-5 text-neutral-500">
            This is a hint text
          </p>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="message">Email</Label>
          <Input name="email" placeholder="name@email.com" disabled />
          <p className="text-sm font-normal leading-5 text-neutral-500">
            This is a hint text
          </p>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="message">Email</Label>
          <Input
            name="email"
            placeholder="name@email.com"
            value={"name@email.com"}
            error
          />
          <p className="text-sm font-normal leading-5 text-red-600">
            This is a error message.
          </p>
        </div>
      </div>
    </main>
  );
}
