import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";
import styles from "./case-size-grid.module.css";

export type CaseCardSize = "small" | "middle" | "large";

const sizeClassNames: Record<CaseCardSize, string> = {
  small: styles.small,
  middle: styles.middle,
  large: styles.large,
};

export function CaseSizeGrid({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn(styles.grid, className)}>{children}</div>;
}

export function CaseSizeGridItem({
  children,
  className,
  size,
  ...props
}: Omit<ComponentPropsWithoutRef<"div">, "children"> & {
  children: ReactNode;
  size: CaseCardSize;
}) {
  return (
    <div
      {...props}
      className={cn(styles.item, sizeClassNames[size], className)}
      data-size={size}
    >
      {children}
    </div>
  );
}
