"use client";

import { useState } from "react";
import { IconKey, IconRefresh } from "@tabler/icons-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ApiKeyRow } from "@/components/dashboard/api-key-row";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";

interface ApiKeyCardProps {
  apiKey: string;
  testApiKey: string;
  onRotate?: (keyType: "apiKey" | "testApiKey") => void;
}

export function ApiKeyCard({ apiKey, testApiKey, onRotate }: ApiKeyCardProps) {
  const [rotateOpen, setRotateOpen] = useState(false);
  const [rotateType, setRotateType] = useState<"apiKey" | "testApiKey">("apiKey");

  function handleRotateClick(type: "apiKey" | "testApiKey") {
    setRotateType(type);
    setRotateOpen(true);
  }

  return (
    <>
      <Card>
        <CardHeader className="flex! flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <IconKey className="h-4 w-4 text-foreground/50" />
            <CardTitle className="text-sm font-medium">API Keys</CardTitle>
          </div>
          {onRotate && (
            <button
              onClick={() => handleRotateClick("apiKey")}
              className="inline-flex items-center justify-center h-8 w-8 rounded-lg border border-border/60 text-foreground/40 hover:text-foreground/70 hover:bg-muted transition-all cursor-pointer"
              title="Rotate key"
            >
              <IconRefresh className="h-3.5 w-3.5" />
            </button>
          )}
        </CardHeader>
        <CardContent className="space-y-2">
          <ApiKeyRow label="Live" apiKey={apiKey} />
          <ApiKeyRow label="Test" apiKey={testApiKey} />
        </CardContent>
      </Card>

      <ConfirmDialog
        open={rotateOpen}
        onOpenChange={setRotateOpen}
        title="Rotate API Key"
        description="This will invalidate your current key immediately. Any integrations using it will stop working."
        confirmLabel="Rotate Key"
        variant="danger"
        onConfirm={() => {
          onRotate?.(rotateType);
          setRotateOpen(false);
        }}
      />
    </>
  );
}
