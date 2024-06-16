"use client";
import { Button, buttonVariants } from "@/components/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center gap-10 px-4">
      <div className="flex items-center gap-4">
        <Button size="medium" disabled>
          <p>deneme</p>
        </Button>
        <Button variant="secondary" size="large">
          <p>deneme</p>
        </Button>
        <Button variant="tertiary" size="extraLarge">
          <p>deneme</p>
        </Button>
        <Link
          className={buttonVariants({ variant: "linkColor" })}
          href="/about"
        >
          Go to about
        </Link>
        <Link className={buttonVariants({ variant: "linkGray" })} href="/about">
          Go to about
        </Link>

        <Button variant="destructive" size="medium">
          <p>deneme</p>
        </Button>
      </div>
    </main>
  );
}
