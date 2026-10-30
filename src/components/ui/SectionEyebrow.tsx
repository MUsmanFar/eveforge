import { cn } from "@/lib/cn";

type SectionEyebrowProps = {
  index: string;
  label: string;
  className?: string;
};

export function SectionEyebrow({ index, label, className }: SectionEyebrowProps) {
  return (
    <p
      className={cn(
        "font-[family-name:var(--font-space-grotesk)] text-xs font-medium uppercase tracking-[0.22em] text-[#526780]",
        className,
      )}
    >
      <span className="text-[#0865C8]">{index.padStart(2, "0")}</span>
      <span className="mx-2 text-[#173E70]/25" aria-hidden>
        /
      </span>
      <span>{label}</span>
    </p>
  );
}
