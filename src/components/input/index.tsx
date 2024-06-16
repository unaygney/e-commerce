import { cn } from "@/lib/utils";
import React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, icon, type, ...props }, ref) => {
    return (
      <div className="relative flex">
        <input
          ref={ref}
          type={type}
          className={cn(
            "w-full overflow-hidden text-ellipsis rounded border border-neutral-200 bg-neutral-50 px-3.5 py-2.5 text-sm font-normal leading-5 text-neutral-900 outline-none placeholder:text-neutral-500 focus:border-indigo-700 focus:ring-2 focus:ring-violet-200 focus:ring-offset-0 disabled:cursor-not-allowed disabled:border-neutral-100 disabled:text-[#a3a3a3]",
            icon && "mr-2 pl-[42px]",
            className,
          )}
          {...props}
        />
        {icon && (
          <div className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2">
            {icon}
          </div>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input };
