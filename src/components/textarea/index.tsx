import React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.HTMLProps<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "min-h-[80px] w-full resize-none rounded-lg border border-neutral-200 bg-neutral-50 px-3.5 py-3 leading-5 text-neutral-900 outline-none transition duration-200 ease-in-out placeholder:text-sm placeholder:text-neutral-500 focus:border-[#444CE7] focus:ring-2 focus:ring-indigo-400 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      />
    );
  },
);

export { Textarea };
