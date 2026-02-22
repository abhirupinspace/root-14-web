"use client";

import { useState } from "react";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { CopyButton } from "@/components/dashboard/copy-button";

interface ApiKeyRowProps {
  label: string;
  apiKey: string;
}

export function ApiKeyRow({ label, apiKey }: ApiKeyRowProps) {
  const [revealed, setRevealed] = useState(false);
  const masked = apiKey.slice(0, 12) + "••••••••••••••••••••";
  const display = revealed ? apiKey : masked;

  return (
    <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-muted">
      <span className="text-xs font-medium text-foreground/50 w-16 shrink-0">{label}</span>
      <code className="flex-1 text-xs font-mono text-foreground/70 truncate select-all">
        {display}
      </code>
      <button
        onClick={() => setRevealed(!revealed)}
        className="inline-flex items-center justify-center h-7 w-7 rounded-md text-foreground/40 hover:text-foreground/70 transition-colors cursor-pointer"
        title={revealed ? "Hide" : "Reveal"}
      >
        {revealed ? <IconEyeOff className="h-3.5 w-3.5" /> : <IconEye className="h-3.5 w-3.5" />}
      </button>
      <CopyButton text={apiKey} className="h-7 w-7" />
    </div>
  );
}
