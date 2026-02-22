"use client";

import { useState } from "react";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";

interface EndpointBlockProps {
  method: string;
  path: string;
  description: string;
  mockResponse: string;
}

export function EndpointBlock({ method, path, description, mockResponse }: EndpointBlockProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border border-border/60 rounded-xl overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-3 p-3 hover:bg-off-white transition-colors cursor-pointer"
      >
        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-emerald-600 border border-emerald-200/60">
          {method}
        </span>
        <code className="text-sm font-mono text-foreground/70">{path}</code>
        <span className="text-xs text-foreground/40 ml-auto mr-2 hidden sm:inline">{description}</span>
        {expanded ? (
          <IconChevronUp className="h-3.5 w-3.5 text-foreground/40 shrink-0" />
        ) : (
          <IconChevronDown className="h-3.5 w-3.5 text-foreground/40 shrink-0" />
        )}
      </button>
      {expanded && (
        <div className="border-t border-border/40 p-3 bg-off-white">
          <p className="text-xs text-foreground/50 mb-2 sm:hidden">{description}</p>
          <pre className="text-xs font-mono text-foreground/70 overflow-x-auto whitespace-pre">
            {mockResponse}
          </pre>
        </div>
      )}
    </div>
  );
}
