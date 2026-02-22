"use client";

import { IconExternalLink } from "@tabler/icons-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CopyButton } from "@/components/dashboard/copy-button";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { ProjectHeader } from "@/components/dashboard/project-header";
import { useProject } from "@/contexts/project-context";
import { generateTxVolume } from "@/lib/mock-data";

const txVolumeData = generateTxVolume();

const txVolumeConfig = {
  verify: { label: "Verify", color: "hsl(var(--chart-1))" },
  deposit: { label: "Deposit", color: "hsl(var(--chart-2))" },
  transfer: { label: "Transfer", color: "hsl(var(--chart-3))" },
} satisfies ChartConfig;

const STELLAR_EXPLORER = "https://stellar.expert/explorer/testnet/contract";

const contracts = [
  { name: "Verifier", address: "CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC", network: "Testnet" as const },
  { name: "Commitment Pool", address: "CBKM3GZQLFXR5GKFVOCYN7RATJSFDEJWCEDI3IRPAZ7SYJHCM4WSXHQ", network: "Testnet" as const },
  { name: "Token Mixer", address: "CCWAMYJME4H5MKV57D5RCMSJRGH4QZPNMRZQDP3ZRIP52FLKL3SXEWX", network: "Testnet" as const },
  { name: "VK Registry", address: "CA4RCZWPZDFXH6KFWPNAMRVAGY3VHN6MQNBZQ7Y6DVTJM3KATQO2IRQ", network: "Testnet" as const },
];

const registeredCircuits = [
  { circuitId: "r14_transfer_v1_groth16", vkHash: "0x7f3a9b2c4d1e8f6a0b5c3d9e7f2a4b6c", txHash: "abc123def456789012345678901234567890abcdef" },
  { circuitId: "r14_range_v1_groth16", vkHash: "0x2c4d1e8f6a0b5c3d9e7f2a4b6c8d0e1f", txHash: "def456789012345678901234567890abcdef123456" },
  { circuitId: "r14_membership_v1_groth16", vkHash: "0x8f6a0b5c3d9e7f2a4b6c8d0e1f3a5b7c", txHash: "789012345678901234567890abcdef123456def456" },
  { circuitId: "r14_preimage_v1_groth16", vkHash: "0x0b5c3d9e7f2a4b6c8d0e1f3a5b7c9d1e", txHash: "345678901234567890abcdef123456def456789012" },
];

const recentTxs = [
  { type: "Verify", hash: "a1b2c3d4e5f6...7890", block: 1847290, time: "2 min ago", status: "Confirmed" },
  { type: "Deposit", hash: "f6e5d4c3b2a1...0987", block: 1847285, time: "8 min ago", status: "Confirmed" },
  { type: "Transfer", hash: "1a2b3c4d5e6f...abcd", block: 1847271, time: "24 min ago", status: "Confirmed" },
  { type: "Verify", hash: "9f8e7d6c5b4a...3210", block: 1847263, time: "31 min ago", status: "Confirmed" },
  { type: "Deposit", hash: "4d5e6f7a8b9c...ef01", block: 1847250, time: "47 min ago", status: "Confirmed" },
];

const txTypeBadgeVariant: Record<string, "default" | "secondary" | "outline"> = {
  Verify: "default",
  Deposit: "secondary",
  Transfer: "outline",
};

export default function ProjectContractsPage() {
  const { project } = useProject();
  if (!project) return null;

  return (
    <div className="space-y-8">
      <ProjectHeader title="Contracts" description="Deployed contract addresses and on-chain activity." />

      {/* Deployed Contracts */}
      <div>
        <h2 className="text-sm font-medium text-foreground/60 mb-3">Deployed contracts</h2>
        <Card>
          <CardContent className="pt-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Name</TableHead>
                  <TableHead className="text-xs">Address</TableHead>
                  <TableHead className="text-xs">Network</TableHead>
                  <TableHead className="text-xs w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contracts.map((c) => (
                  <TableRow key={c.address}>
                    <TableCell className="text-sm font-medium">{c.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <code className="text-xs font-mono text-foreground/60">{c.address.slice(0, 8)}...{c.address.slice(-6)}</code>
                        <CopyButton text={c.address} className="h-5 w-5" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-[10px]">{c.network}</Badge>
                    </TableCell>
                    <TableCell>
                      <a
                        href={`${STELLAR_EXPLORER}/${c.address}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground/40 hover:text-foreground/70 transition-colors"
                      >
                        <IconExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Transaction Volume Chart */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-foreground/60">
            Transaction Volume &mdash; last 7d
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <ChartContainer config={txVolumeConfig} className="h-[220px] w-full">
            <AreaChart data={txVolumeData} margin={{ top: 4, right: 4, bottom: 0, left: -12 }}>
              <defs>
                <linearGradient id="fillVerify" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-verify)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--color-verify)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="fillDeposit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-deposit)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--color-deposit)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="fillTransfer" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-transfer)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--color-transfer)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 10 }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 10 }} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Area type="monotone" dataKey="verify" stackId="1" stroke="var(--color-verify)" fill="url(#fillVerify)" strokeWidth={1.5} />
              <Area type="monotone" dataKey="deposit" stackId="1" stroke="var(--color-deposit)" fill="url(#fillDeposit)" strokeWidth={1.5} />
              <Area type="monotone" dataKey="transfer" stackId="1" stroke="var(--color-transfer)" fill="url(#fillTransfer)" strokeWidth={1.5} />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Registered Circuits */}
      <div>
        <h2 className="text-sm font-medium text-foreground/60 mb-3">Registered circuits</h2>
        <Card>
          <CardContent className="pt-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Circuit ID</TableHead>
                  <TableHead className="text-xs">VK Hash</TableHead>
                  <TableHead className="text-xs">Tx Hash</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {registeredCircuits.map((c) => (
                  <TableRow key={c.circuitId}>
                    <TableCell>
                      <code className="text-xs font-mono text-foreground/70">{c.circuitId}</code>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <code className="text-xs font-mono text-foreground/50">{c.vkHash.slice(0, 14)}...</code>
                        <CopyButton text={c.vkHash} className="h-5 w-5" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <code className="text-xs font-mono text-foreground/50">{c.txHash.slice(0, 12)}...</code>
                        <CopyButton text={c.txHash} className="h-5 w-5" />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <h2 className="text-sm font-medium text-foreground/60">Recent transactions</h2>
          <StatusBadge label="Sample Data" variant="warning" />
        </div>
        <Card>
          <CardContent className="pt-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Type</TableHead>
                  <TableHead className="text-xs">Tx Hash</TableHead>
                  <TableHead className="text-xs">Block</TableHead>
                  <TableHead className="text-xs">Time</TableHead>
                  <TableHead className="text-xs">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentTxs.map((tx, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <Badge variant={txTypeBadgeVariant[tx.type] ?? "outline"} className="text-[10px]">
                        {tx.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <code className="text-xs font-mono text-foreground/50">{tx.hash}</code>
                    </TableCell>
                    <TableCell>
                      <span className="text-xs font-mono text-foreground/60">{tx.block.toLocaleString()}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-xs text-foreground/50">{tx.time}</span>
                    </TableCell>
                    <TableCell>
                      <StatusBadge label={tx.status} variant="success" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
