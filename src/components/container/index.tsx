import React from "react";

export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-auto min-h-screen w-full max-w-[1408px] rounded-t-lg bg-white shadow">
      {children}
    </main>
  );
}
