import { cn } from "@/lib/utils";
import React from "react";

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          "text-sm font-medium leading-5 text-stone-700",
          className,
        )}
        {...props}
      />
    );
  },
);

Label.displayName = "Label";

export { Label };
