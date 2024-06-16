import { cn } from "@/lib/utils";
import React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input ref={ref} type={type} className={cn("", className)} {...props} />
    );
  },
);

Input.displayName = "Input";

export { Input };
