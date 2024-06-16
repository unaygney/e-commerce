import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full font-normal",
  {
    variants: {
      variant: {
        neutral: "border-spacing-0.5 border bg-gray-50 text-neutral-600",
        error: "border border-red-200 bg-red-50 text-red-600",
        warning: "border border-amber-200 bg-amber-50 text-amber-700",
        success: "border border-green-200 bg-green-50 text-green-700",
        brand: "border border-indigo-200 bg-indigo-50 text-indigo-700",
      },
      size: {
        small: "px-1.5 py-0.5 text-xs",
        medium: "px-2 py-0.5 text-sm",
        large: "px-2.5 py-1 text-sm",
      },
      defaultVariants: {
        variant: "neutral",
        size: "medium",
      },
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Badge };
