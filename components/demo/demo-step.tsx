"use client";

import { cn } from "@/lib/utils";

interface DemoStepProps {
  number: number;
  title: string;
  description: string;
  status: "pending" | "active" | "done";
  children: React.ReactNode;
}

export function DemoStep({ number, title, description, status, children }: DemoStepProps) {
  return (
    <div
      className={cn(
        "border rounded-xl p-6 transition-all duration-300",
        status === "active" && "border-foreground/20 bg-card shadow-sm",
        status === "done" && "border-emerald-200/40 bg-emerald-50/30",
        status === "pending" && "border-border/40 opacity-50"
      )}
    >
      <div className="flex items-start gap-4">
        <div
          className={cn(
            "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border",
            status === "done" && "bg-emerald-500 text-white border-emerald-500",
            status === "active" && "bg-foreground text-background border-foreground",
            status === "pending" && "bg-transparent text-foreground/40 border-foreground/20"
          )}
        >
          {status === "done" ? "✓" : number}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold uppercase tracking-wider">{title}</h3>
          <p className="text-xs text-foreground/50 mt-1">{description}</p>
          {status !== "pending" && <div className="mt-4">{children}</div>}
        </div>
      </div>
    </div>
  );
}
