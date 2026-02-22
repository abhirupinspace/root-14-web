"use client";

import {
  IconShieldCheck,
  IconLock,
  IconDatabase,
  IconCpu,
  IconBook,
  IconTerminal2,
  IconExternalLink,
} from "@tabler/icons-react";
import { ApiKeyCard } from "@/components/dashboard/api-key-card";
import { StatCard } from "@/components/dashboard/stat-card";
import { CopyButton } from "@/components/dashboard/copy-button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Overview</h1>
        <p className="text-sm text-foreground/50 mt-1">
          Manage your Root14 integration and monitor usage.
        </p>
      </div>

      {/* API Key */}
      <ApiKeyCard />

      {/* Usage Stats */}
      <div>
        <h2 className="text-sm font-medium text-foreground/60 mb-3">Usage — last 30 days</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Proof Verifications"
            value="1,247"
            trend="+12.3%"
            icon={<IconShieldCheck className="h-5 w-5" />}
          />
          <StatCard
            label="zkTLS Calls"
            value="856"
            trend="+8.1%"
            icon={<IconLock className="h-5 w-5" />}
          />
          <StatCard
            label="Indexer Queries"
            value="3,421"
            trend="+24.7%"
            icon={<IconDatabase className="h-5 w-5" />}
          />
          <StatCard
            label="Active Circuits"
            value="6 / 6"
            icon={<IconCpu className="h-5 w-5" />}
          />
        </div>
      </div>

      {/* Quick Links */}
      <div>
        <h2 className="text-sm font-medium text-foreground/60 mb-3">Quick start</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Docs */}
          <Card className="group hover:border-foreground/20 transition-colors">
            <CardContent className="pt-0">
              <div className="flex items-center gap-2 mb-2">
                <IconBook className="h-4 w-4 text-foreground/40" />
                <CardTitle className="text-sm">Documentation</CardTitle>
                <IconExternalLink className="h-3 w-3 text-foreground/30 ml-auto group-hover:text-foreground/60 transition-colors" />
              </div>
              <p className="text-xs text-foreground/50">
                Guides, API reference, and integration examples.
              </p>
            </CardContent>
          </Card>

          {/* SDK Install */}
          <Card>
            <CardContent className="pt-0">
              <div className="flex items-center gap-2 mb-2">
                <IconTerminal2 className="h-4 w-4 text-foreground/40" />
                <CardTitle className="text-sm">Install SDK</CardTitle>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-off-white border border-border/40">
                <code className="flex-1 text-xs font-mono text-foreground/60 truncate">
                  npm i @root14/sdk
                </code>
                <CopyButton text="npm i @root14/sdk" className="h-6 w-6" />
              </div>
            </CardContent>
          </Card>

          {/* CLI Install */}
          <Card>
            <CardContent className="pt-0">
              <div className="flex items-center gap-2 mb-2">
                <IconTerminal2 className="h-4 w-4 text-foreground/40" />
                <CardTitle className="text-sm">Install CLI</CardTitle>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-off-white border border-border/40">
                <code className="flex-1 text-xs font-mono text-foreground/60 truncate">
                  npm i -g @root14/cli
                </code>
                <CopyButton text="npm i -g @root14/cli" className="h-6 w-6" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
