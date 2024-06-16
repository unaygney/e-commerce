"use client";

import { Badge } from "@/components/badge";
import { Input } from "@/components/input";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center gap-10 px-4">
      <div>
        <Badge variant="brand">Default</Badge>
        <Badge variant="error" size="medium">
          Default
        </Badge>
        <Badge variant="neutral" size="large">
          Default
        </Badge>
        <Badge variant="success" size="medium">
          Default
        </Badge>
        <Badge variant="warning" size="small">
          Default
        </Badge>
      </div>

      <div className="w-full max-w-[300px]">
        <Input type="text" placeholder="name@email.com" />
      </div>
    </main>
  );
}
