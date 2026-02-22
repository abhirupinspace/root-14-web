"use client";

import { useState } from "react";
import { IconKey, IconEye, IconEyeOff, IconRefresh } from "@tabler/icons-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CopyButton } from "@/components/dashboard/copy-button";
import { StatusBadge } from "@/components/dashboard/status-badge";

const MOCK_API_KEY = "r14_live_sk_7f3a9b2c4d1e8f6a0b5c3d9e7f2a4b6c8d0e1f3a5b7c9d";

export function ApiKeyCard() {
  const [revealed, setRevealed] = useState(false);

  const masked = MOCK_API_KEY.slice(0, 12) + "••••••••••••••••••••••••••••••••";
  const display = revealed ? MOCK_API_KEY : masked;

  return (
    <Card>
      <CardHeader className="flex! flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <IconKey className="h-4 w-4 text-foreground/50" />
          <CardTitle className="text-sm font-medium">API Key</CardTitle>
        </div>
        <div className="flex items-center gap-2">
          <StatusBadge label="Pro" variant="info" />
          <button
            className="inline-flex items-center justify-center h-8 w-8 rounded-lg border border-border/60 text-foreground/40 hover:text-foreground/70 hover:bg-off-white transition-all cursor-pointer"
            title="Rotate key"
          >
            <IconRefresh className="h-3.5 w-3.5" />
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 p-3 rounded-xl bg-off-white border border-border/40">
          <code className="flex-1 text-sm font-mono text-foreground/70 truncate select-all">
            {display}
          </code>
          <button
            onClick={() => setRevealed(!revealed)}
            className="inline-flex items-center justify-center h-8 w-8 rounded-lg text-foreground/40 hover:text-foreground/70 transition-all cursor-pointer"
            title={revealed ? "Hide key" : "Reveal key"}
          >
            {revealed ? (
              <IconEyeOff className="h-3.5 w-3.5" />
            ) : (
              <IconEye className="h-3.5 w-3.5" />
            )}
          </button>
          <CopyButton text={MOCK_API_KEY} />
        </div>
      </CardContent>
    </Card>
  );
}
