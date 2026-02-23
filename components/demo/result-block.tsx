"use client";

import { cn } from "@/lib/utils";

interface ResultBlockProps {
  label: string;
  value: string;
  mono?: boolean;
  variant?: "default" | "success" | "error";
}

export function ResultBlock({ label, value, mono = true, variant = "default" }: ResultBlockProps) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 py-2 px-3 rounded-lg border",
        variant === "success" && "border-emerald-200/60 bg-emerald-50/30",
        variant === "error" && "border-red-200/60 bg-red-50/30",
        variant === "default" && "border-border/40 bg-muted/30"
      )}
    >
      <span className="text-[10px] font-bold uppercase tracking-wider text-foreground/40 min-w-[80px] pt-0.5">
        {label}
      </span>
      <span
        className={cn(
          "text-xs break-all",
          mono && "font-mono",
          variant === "success" && "text-emerald-700",
          variant === "error" && "text-red-600"
        )}
      >
        {value}
      </span>
    </div>
  );
}
