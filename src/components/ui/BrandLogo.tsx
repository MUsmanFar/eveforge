import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/cn";

type BrandLogoProps = {
  href?: string;
  className?: string;
  priority?: boolean;
  size?: "sm" | "md";
};

export function BrandLogo({
  href = "#home",
  className,
  priority = false,
  size = "md",
}: BrandLogoProps) {
  const iconSize = size === "sm" ? 28 : 34;

  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-2.5 text-[#10294A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087FF5]",
        className,
      )}
      aria-label={`${siteConfig.name} home`}
    >
      <Image src="/assets/brand/icon-e.png" alt="" width={iconSize} height={iconSize} className="shrink-0 object-contain" priority={priority} />
      <span
        className={cn(
          "font-[family-name:var(--font-space-grotesk)] font-medium tracking-tight",
          size === "sm" ? "text-base" : "text-lg sm:text-xl",
        )}
      >
        everforge
      </span>
    </Link>
  );
}
