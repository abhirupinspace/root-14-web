"use client";

import { useState } from "react";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { CopyButton } from "@/components/dashboard/copy-button";

interface ModuleCardProps {
  name: string;
  description: string;
  circuitId: string;
  constraintCount: string;
  vkStatus: "Testnet" | "Mainnet" | "Both";
  snippet: string;
  icon: React.ReactNode;
}

export function ModuleCard({
  name,
  description,
  circuitId,
  constraintCount,
  vkStatus,
  snippet,
  icon,
}: ModuleCardProps) {
  const [expanded, setExpanded] = useState(false);

  const vkVariant = vkStatus === "Mainnet" || vkStatus === "Both" ? "success" : "warning";

  return (
    <Card>
      <CardHeader className="flex! flex-row items-start justify-between">
        <div className="flex items-center gap-3">
          <span className="text-foreground/40">{icon}</span>
          <div>
            <CardTitle className="text-sm font-medium">{name}</CardTitle>
            <p className="text-xs text-foreground/50 mt-0.5">{description}</p>
          </div>
        </div>
        <StatusBadge label={vkStatus} variant={vkVariant} />
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-foreground/40 mb-1">Circuit ID</p>
            <div className="flex items-center gap-1.5">
              <code className="text-xs font-mono text-foreground/70 truncate">{circuitId}</code>
              <CopyButton text={circuitId} className="h-6 w-6 shrink-0" />
            </div>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-foreground/40 mb-1">Constraints</p>
            <p className="text-xs font-mono text-foreground/70">{constraintCount}</p>
          </div>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-xs text-foreground/40 hover:text-foreground/70 transition-colors cursor-pointer"
        >
          {expanded ? (
            <>
              <IconChevronUp className="h-3 w-3" /> Hide snippet
            </>
          ) : (
            <>
              <IconChevronDown className="h-3 w-3" /> Code snippet
            </>
          )}
        </button>

        {expanded && (
          <div className="relative">
            <pre className="p-3 rounded-xl bg-off-white border border-border/40 text-xs font-mono text-foreground/70 overflow-x-auto">
              {snippet}
            </pre>
            <div className="absolute top-2 right-2">
              <CopyButton text={snippet} className="h-6 w-6" />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
