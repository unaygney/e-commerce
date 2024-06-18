"use client";

import { Label } from "@/components/label";
import { Textarea } from "@/components/textarea";

import React from "react";
export default function Home() {
  const [message, setMessage] = React.useState("");
  return (
    <main className="flex min-h-screen w-full items-center justify-center">
      <div className="flex w-[340px] flex-col gap-8">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="name">Description</Label>
          <Textarea
            value={message}
            placeholder="Write your message..."
            className="h-[160px]"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setMessage(e.target.value)
            }
          />
          <p className="text-right text-sm font-normal leading-5 text-neutral-500">
            {message.length}/500
          </p>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="name">Description</Label>
          <Textarea
            value={message}
            placeholder="Write your message..."
            className="h-[103px]"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setMessage(e.target.value)
            }
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="name">Description</Label>
          <Textarea
            value={message}
            className="h-[160px]"
            disabled
            placeholder="Write your message..."
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setMessage(e.target.value)
            }
          />
          <p className="text-right text-sm font-normal leading-5 text-neutral-500">
            {message.length}/500
          </p>
        </div>
      </div>
    </main>
  );
}
