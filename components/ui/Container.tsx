import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";

type ContainerSize = "sm" | "md" | "lg" | "xl" | "full";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: ContainerSize;
}

const sizeMap: Record<ContainerSize, string> = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
  full: "max-w-none",
};

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = "xl", children, ...rest }, ref) => (
    <div
      ref={ref}
      className={cn(
        "mx-auto w-full px-6 sm:px-8 lg:px-12",
        sizeMap[size],
        className
      )}
      {...rest}
    >
      {children}
    </div>
  )
);

Container.displayName = "Container";
