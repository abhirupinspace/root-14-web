"use client";

import { IconKey, IconPlus } from "@tabler/icons-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface KeyCardProps {
  label: string;
  badge: "Public" | "Private";
  onGenerate?: () => void;
}

export function KeyCard({ label, badge, onGenerate }: KeyCardProps) {
  const isPublic = badge === "Public";

  return (
    <Card className="flex-1 min-w-[280px] max-w-[20vw]">
      <CardHeader className="flex! flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <IconKey className="h-4 w-4 text-foreground/50" />
          <CardTitle className="text-sm font-medium">{label}</CardTitle>
        </div>
        <span
          className={cn(
            "text-[10px] font-bold uppercase tracking-wider text-center px-2.5 py-1 rounded-md",
            isPublic
              ? "bg-blue-50 text-blue-600 border border-blue-200/60"
              : "bg-red-50 text-red-500 border border-red-200/60"
          )}
        >
          {badge}
        </span>
      </CardHeader>
      <CardContent>
        <button
          onClick={onGenerate}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-border/80 text-foreground/50 text-sm font-medium hover:bg-off-white hover:text-foreground/70 hover:border-foreground/15 transition-all cursor-pointer"
        >
          <IconPlus className="h-4 w-4" />
          Generate
        </button>
      </CardContent>
    </Card>
  );
}
