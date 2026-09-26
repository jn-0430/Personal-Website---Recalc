import Image from "next/image";
import { cn } from "@/lib/utils";

type BrandMarkProps = {
  withWordmark?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const markSizes = {
  sm: "h-11 w-11",
  md: "h-16 w-16",
  lg: "h-28 w-28",
};

export function BrandMark({ size = "md", className }: BrandMarkProps) {
  return (
    <div className={cn("inline-flex items-center", className)} aria-label="cnct">
      <span className={cn("cnct-glass-mark relative block shrink-0 overflow-hidden rounded-full", markSizes[size])}>
        <Image
          src="/cnct-c-logo.png"
          alt=""
          fill
          sizes={size === "lg" ? "112px" : size === "md" ? "64px" : "44px"}
          className="cnct-node-mark object-cover"
          priority={size === "lg"}
        />
      </span>
    </div>
  );
}
