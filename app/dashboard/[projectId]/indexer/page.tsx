"use client";

import { IconDatabase, IconLeaf } from "@tabler/icons-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CopyButton } from "@/components/dashboard/copy-button";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/dashboard/empty-state";
import { ProjectHeader } from "@/components/dashboard/project-header";
import { useProject } from "@/contexts/project-context";
import { useIndexer } from "@/hooks/useIndexer";
import { generateMerkleGrowth } from "@/lib/mock-data";

const leafGrowthData = generateMerkleGrowth();

const leafGrowthConfig = {
  value: { label: "Leaves", color: "hsl(var(--chart-1))" },
} satisfies ChartConfig;

const MOCK_ENDPOINT = "https://indexer.root14.dev/v1";

const endpoints = [
  {
    method: "GET",
    path: "/v1/root",
    description: "Current Merkle root",
    mockResponse: JSON.stringify({ root: "0x1a2b3c...4567890", leafCount: 12847 }, null, 2),
  },
  {
    method: "GET",
    path: "/v1/proof/:index",
    description: "Inclusion proof for leaf at index",
    mockResponse: JSON.stringify(
      { index: 42, leaf: "0xabcdef...123456", proof: ["0x1111...aaaa", "0x2222...bbbb"], root: "0x1a2b3c...4567890" },
      null,
      2
    ),
  },
  {
    method: "GET",
    path: "/v1/leaves",
    description: "All committed leaves",
    mockResponse: JSON.stringify(
      { leaves: [{ index: 0, commitment: "0xaaaa...1111" }, { index: 1, commitment: "0xbbbb...2222" }] },
      null,
      2
    ),
  },
];

export default function ProjectIndexerPage() {
  const { project } = useProject();
  const { health, root, leafCount, isLoading } = useIndexer();

  if (!project) return null;

  const isOperational = !!health;
  const currentRoot = root?.root ?? null;

  return (
    <div className="space-y-8">
      <ProjectHeader title="Indexer" description="Hosted Merkle tree indexer for on-chain commitment tracking." />

      {/* Endpoint row */}
      <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-muted">
        <div className="flex items-center gap-1.5">
          {isLoading ? (
            <Skeleton className="h-2 w-2 rounded-full" />
          ) : isOperational ? (
            <div className="h-2 w-2 rounded-full bg-emerald-500" />
          ) : (
            <div className="h-2 w-2 rounded-full bg-amber-500" />
          )}
          <span className="text-xs text-foreground/50">
            {isLoading ? "Checking..." : isOperational ? "Operational" : "Unreachable"}
          </span>
        </div>
        <code className="flex-1 text-sm font-mono text-foreground/70 truncate">{MOCK_ENDPOINT}</code>
        <CopyButton text={MOCK_ENDPOINT} className="h-7 w-7" />
      </div>

      {/* Leaf Growth Chart */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-foreground/60">Leaf Growth</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <ChartContainer config={leafGrowthConfig} className="h-[220px] w-full">
            <AreaChart data={leafGrowthData} margin={{ top: 4, right: 4, bottom: 0, left: -12 }}>
              <defs>
                <linearGradient id="fillLeafGrowth" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-value)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--color-value)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis dataKey="time" tickLine={false} axisLine={false} tick={{ fontSize: 10 }} interval={6} />
              <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 10 }} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="value"
                stroke="var(--color-value)"
                fill="url(#fillLeafGrowth)"
                strokeWidth={1.5}
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Merkle Tree Stats */}
      <div>
        <h2 className="text-sm font-medium text-foreground/60 mb-3">Merkle tree</h2>
        {!isLoading && leafCount === 0 ? (
          <EmptyState
            icon={<IconLeaf className="h-10 w-10" />}
            title="No leaves yet"
            description="The Merkle tree is empty. Leaves will appear here as commitments are indexed."
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card>
              <CardContent className="pt-0">
                <p className="text-[10px] uppercase tracking-wider text-foreground/40 mb-1">Leaf Count</p>
                {isLoading ? (
                  <Skeleton className="h-7 w-20" />
                ) : (
                  <p className="text-xl stat-number text-foreground">
                    {leafCount.toLocaleString()}
                  </p>
                )}
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-0">
                <p className="text-[10px] uppercase tracking-wider text-foreground/40 mb-1">Current Root</p>
                {isLoading ? (
                  <Skeleton className="h-5 w-48" />
                ) : currentRoot ? (
                  <div className="flex items-center gap-1.5">
                    <code className="text-xs font-mono text-foreground/70 truncate">
                      {currentRoot.slice(0, 18)}...{currentRoot.slice(-8)}
                    </code>
                    <CopyButton text={currentRoot} className="h-6 w-6 shrink-0" />
                  </div>
                ) : (
                  <span className="text-xs text-foreground/40">—</span>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* REST API Explorer with Tabs */}
      <div>
        <h2 className="text-sm font-medium text-foreground/60 mb-3">REST API explorer</h2>
        <Tabs defaultValue={endpoints[0].path}>
          <TabsList>
            {endpoints.map((ep) => (
              <TabsTrigger key={ep.path} value={ep.path} className="text-xs">
                {ep.method} {ep.path}
              </TabsTrigger>
            ))}
          </TabsList>
          {endpoints.map((ep) => (
            <TabsContent key={ep.path} value={ep.path}>
              <Card>
                <CardContent className="pt-0">
                  <p className="text-xs text-foreground/50 mb-2">{ep.description}</p>
                  <StatusBadge label="Example Response" variant="info" />
                  <pre className="mt-2 text-xs font-mono text-foreground/70 overflow-x-auto whitespace-pre bg-muted p-3 rounded-lg">
                    {ep.mockResponse}
                  </pre>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
