import { forwardRef, ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export const Content = forwardRef<HTMLDivElement, ComponentProps<"div">>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        {...props}
        className={twMerge("flex-1 overflow-auto ", className)}
      >
        {children}
      </div>
    );
  }
);

Content.displayName = "Content";
