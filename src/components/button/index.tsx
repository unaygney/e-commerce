import React, { ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded font-medium transition disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary:
          "bg-[#4338CA] text-white shadow outline-none ring-offset-0 hover:bg-[#3730A3] focus:ring-2 focus:ring-indigo-200 focus:ring-offset-0 disabled:bg-[#F5F5F5] disabled:text-neutral-400",
        secondary:
          "border-[0.5px] border-[#e6e6e6] bg-white text-neutral-900 shadow outline-none ring-offset-0 hover:border hover:bg-[#fafafa] focus:ring-2 focus:ring-indigo-200 focus:ring-offset-0 disabled:bg-[#F5F5F5] disabled:text-neutral-400",
        tertiary:
          "border-0 bg-transparent text-indigo-700 outline-none hover:bg-[#fafafa] focus:ring-2 focus:ring-indigo-200 focus:ring-offset-0 disabled:text-neutral-400",
        destructive:
          "bg-red-600 text-white outline-none hover:bg-red-700 focus:ring-2 focus:ring-red-200 focus:ring-offset-0 disabled:bg-transparent disabled:text-neutral-400",
        linkGray:
          "text-sm font-medium leading-5 text-neutral-600 outline-none hover:text-neutral-900 focus:ring-2 focus:ring-indigo-200 focus:ring-offset-0 disabled:text-neutral-400",
        linkColor:
          "text-sm font-medium leading-5 text-indigo-700 outline-none hover:text-indigo-800 focus:ring-2 focus:ring-indigo-200 focus:ring-offset-0 disabled:text-neutral-400",
      },
      size: {
        medium: "gap-1.5 px-3.5 py-2.5 text-sm leading-5",
        large: "gap-1.5 px-4 py-2.5 text-base leading-6",
        extraLarge: "gap-1.5 px-5 py-3 text-base leading-6",
        large2XL: "gap-2.5 px-6 py-4 text-lg leading-7",
      },
    },
    defaultVariants: {
      variant: "primary",
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

Button.displayName = "Button";
export { buttonVariants, Button };
