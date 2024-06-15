import React, { ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "rounded font-medium transition-colors duration-300 ease-in-out",
  {
    variants: {
      variant: {
        primary: "bg-red-500",
        secondary: "bg-blue-500",
        tertiary: "bg-green-500 leading-10",
        destructive: "",
        linkGray: "",
        linkColor: "",
      },
      size: {
        medium: "inline-flex h-10  items-center  gap-1 px-[14px] text-[14px]",
        large: "inline-flex h-11 items-center gap-1.5 px-4 text-base",
        extraLarge: "inline-flex h-12 items-center gap-1.5 px-5 text-base",
        large2XL: "inline-flex h-[60px] items-center gap-2.5 px-6 text-[18px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "medium",
    },
  },
);

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
