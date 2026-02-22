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
import { Area, AreaChart, Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { StatCard } from "@/components/dashboard/stat-card";
import { ApiKeyRow } from "@/components/dashboard/api-key-row";
import { ProjectHeader } from "@/components/dashboard/project-header";
import { CopyButton } from "@/components/dashboard/copy-button";
import { useProject } from "@/contexts/project-context";
import { useIndexer } from "@/hooks/useIndexer";
import { generateActivityData, generateMerkleGrowth } from "@/lib/mock-data";

const activityData = generateActivityData();
const merkleData = generateMerkleGrowth();

const activityConfig = {
  proofVerifications: { label: "Proof Verifications", color: "hsl(var(--chart-1))" },
  zkTlsCalls: { label: "zkTLS Calls", color: "hsl(var(--chart-2))" },
} satisfies ChartConfig;

const merkleConfig = {
  value: { label: "Leaf Count", color: "hsl(var(--chart-3))" },
} satisfies ChartConfig;

export default function ProjectOverviewPage() {
  const { project } = useProject();
  const { leafCount, isLoading } = useIndexer();

  if (!project) return null;

  return (
    <div className="space-y-6">
      <ProjectHeader
        title={project.name}
        badge={project.network}
        description="Project overview and quick actions."
      />

      {/* API Keys */}
      <div className="space-y-2">
        <ApiKeyRow label="Live" apiKey={project.apiKey} />
        <ApiKeyRow label="Test" apiKey={project.testApiKey} />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard
          label="Proof Verifications"
          value="1,247"
          icon={<IconShieldCheck className="h-4 w-4" />}
        />
        <StatCard
          label="zkTLS Calls"
          value="856"
          icon={<IconLock className="h-4 w-4" />}
        />
        <StatCard
          label="Merkle Leaves"
          value={leafCount.toLocaleString()}
          loading={isLoading}
          icon={<IconDatabase className="h-4 w-4" />}
        />
        <StatCard
          label="Active Circuits"
          value={`${project.circuits.length} / 6`}
          icon={<IconCpu className="h-4 w-4" />}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Activity Chart */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground/60">
              Activity &mdash; last 24h
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <ChartContainer config={activityConfig} className="h-[220px] w-full">
              <AreaChart data={activityData} margin={{ top: 4, right: 4, bottom: 0, left: -12 }}>
                <defs>
                  <linearGradient id="fillProofs" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-proofVerifications)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--color-proofVerifications)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="fillZktls" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-zkTlsCalls)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--color-zkTlsCalls)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="time" tickLine={false} axisLine={false} tick={{ fontSize: 10 }} interval={5} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 10 }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="proofVerifications"
                  stackId="1"
                  stroke="var(--color-proofVerifications)"
                  fill="url(#fillProofs)"
                  strokeWidth={1.5}
                />
                <Area
                  type="monotone"
                  dataKey="zkTlsCalls"
                  stackId="1"
                  stroke="var(--color-zkTlsCalls)"
                  fill="url(#fillZktls)"
                  strokeWidth={1.5}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Merkle Growth Chart */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground/60">
              Merkle Tree Growth
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <ChartContainer config={merkleConfig} className="h-[220px] w-full">
              <LineChart data={merkleData} margin={{ top: 4, right: 4, bottom: 0, left: -12 }}>
                <defs>
                  <linearGradient id="fillMerkle" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-value)" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="var(--color-value)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="time" tickLine={false} axisLine={false} tick={{ fontSize: 10 }} interval={6} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 10 }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="var(--color-value)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xs font-medium text-foreground/50 uppercase tracking-wider mb-3">Quick actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <a href="https://root14-docs.vercel.app/" target="_blank" rel="noopener noreferrer">
            <Card className="h-full hover:border-foreground/20 transition-colors cursor-pointer">
              <CardContent className="pt-0">
                <div className="flex items-center gap-2 mb-1">
                  <IconBook className="h-4 w-4 text-foreground/40" />
                  <CardTitle className="text-sm">Docs</CardTitle>
                  <IconExternalLink className="h-3 w-3 text-foreground/30 ml-auto" />
                </div>
                <p className="text-xs text-foreground/50">Guides and API reference.</p>
              </CardContent>
            </Card>
          </a>

          <Card className="h-full">
            <CardContent className="pt-0">
              <div className="flex items-center gap-2 mb-1">
                <IconTerminal2 className="h-4 w-4 text-foreground/40" />
                <CardTitle className="text-sm">Install SDK</CardTitle>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-md bg-muted">
                <code className="flex-1 text-xs font-mono text-foreground/60 truncate">cargo add r14-sdk</code>
                <CopyButton text="cargo add r14-sdk" className="h-6 w-6" />
              </div>
            </CardContent>
          </Card>

          <Card className="h-full">
            <CardContent className="pt-0">
              <div className="flex items-center gap-2 mb-1">
                <IconTerminal2 className="h-4 w-4 text-foreground/40" />
                <CardTitle className="text-sm">Install CLI</CardTitle>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-md bg-muted">
                <code className="flex-1 text-xs font-mono text-foreground/60 truncate">cargo install r14-cli</code>
                <CopyButton text="cargo install r14-cli" className="h-6 w-6" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
