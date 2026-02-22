import { cn } from "@/lib/utils";

type BadgeVariant = "success" | "warning" | "error" | "info" | "neutral";

interface StatusBadgeProps {
  label: string;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  success: "bg-emerald-50 text-emerald-600 border-emerald-200/60",
  warning: "bg-amber-50 text-amber-600 border-amber-200/60",
  error: "bg-red-50 text-red-500 border-red-200/60",
  info: "bg-blue-50 text-blue-600 border-blue-200/60",
  neutral: "bg-neutral-100 text-neutral-500 border-neutral-200/60",
};

export function StatusBadge({ label, variant = "neutral", className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border",
        variantStyles[variant],
        className
      )}
    >
      {label}
    </span>
  );
}
