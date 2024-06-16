import { cn } from "@/lib/utils";
import React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          "overflow-hidden text-ellipsis rounded border border-neutral-200 bg-neutral-50 px-3.5 py-2.5 text-sm font-normal leading-5 text-neutral-900 placeholder:text-neutral-500 disabled:cursor-not-allowed disabled:border-neutral-100 disabled:text-[#a3a3a3]",
          className,
        )}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";

export { Input };
