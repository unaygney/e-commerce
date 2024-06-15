import React, { ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva("bg-white", {
  variants: {
    variant: {
      default: "bg-red-500",
      primary: "bg-blue-500",
      secondary: "bg-green-500 leading-10",
    },
    size: {
      default: "p-4",
      small: "p-2",
      large: "p-6",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "large",
  },
});

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant,
  size,
  ...props
}) => {
  return (
    <button
      {...props}
      className={cn(buttonVariants({ variant, size, className }))}
    >
      {children}
    </button>
  );
};
export { buttonVariants, Button };
