"use client";

import { IconDatabase } from "@tabler/icons-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CopyButton } from "@/components/dashboard/copy-button";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { EndpointBlock } from "@/components/dashboard/endpoint-block";

const MOCK_ENDPOINT = "https://indexer.root14.dev/v1";
const MOCK_ROOT = "0x1a2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890";

const endpoints = [
  {
    method: "GET",
    path: "/v1/root",
    description: "Current Merkle root",
    mockResponse: JSON.stringify(
      {
        root: "0x1a2b3c...4567890",
        blockNumber: 1847293,
        timestamp: "2026-02-22T10:30:00Z",
        leafCount: 12847,
      },
      null,
      2
    ),
  },
  {
    method: "GET",
    path: "/v1/proof/:index",
    description: "Inclusion proof for leaf at index",
    mockResponse: JSON.stringify(
      {
        index: 42,
        leaf: "0xabcdef...123456",
        proof: [
          "0x1111...aaaa",
          "0x2222...bbbb",
          "0x3333...cccc",
        ],
        root: "0x1a2b3c...4567890",
      },
      null,
      2
    ),
  },
  {
    method: "GET",
    path: "/v1/leaves",
    description: "Paginated leaf list",
    mockResponse: JSON.stringify(
      {
        leaves: [
          { index: 0, hash: "0xaaaa...1111", block: 1800001 },
          { index: 1, hash: "0xbbbb...2222", block: 1800042 },
          { index: 2, hash: "0xcccc...3333", block: 1800099 },
        ],
        total: 12847,
        page: 1,
        perPage: 50,
      },
      null,
      2
    ),
  },
];

export default function IndexerPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Indexer</h1>
        <p className="text-sm text-foreground/50 mt-1">
          Hosted Merkle tree indexer for on-chain commitment tracking.
        </p>
      </div>

      {/* Endpoint */}
      <Card>
        <CardHeader className="flex! flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <IconDatabase className="h-4 w-4 text-foreground/50" />
            <CardTitle className="text-sm font-medium">Hosted Endpoint</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="text-xs text-emerald-600 font-medium">Operational</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 p-3 rounded-xl bg-off-white border border-border/40">
            <code className="flex-1 text-sm font-mono text-foreground/70 truncate">
              {MOCK_ENDPOINT}
            </code>
            <CopyButton text={MOCK_ENDPOINT} />
          </div>
        </CardContent>
      </Card>

      {/* Merkle Tree Stats */}
      <div>
        <h2 className="text-sm font-medium text-foreground/60 mb-3">Merkle tree</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-0">
              <p className="text-[10px] uppercase tracking-wider text-foreground/40 mb-1">Leaf Count</p>
              <p className="text-xl font-semibold stat-number text-foreground">12,847</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-0">
              <p className="text-[10px] uppercase tracking-wider text-foreground/40 mb-1">Current Root</p>
              <div className="flex items-center gap-1.5">
                <code className="text-xs font-mono text-foreground/70 truncate">
                  {MOCK_ROOT.slice(0, 18)}...{MOCK_ROOT.slice(-8)}
                </code>
                <CopyButton text={MOCK_ROOT} className="h-6 w-6 shrink-0" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-0">
              <p className="text-[10px] uppercase tracking-wider text-foreground/40 mb-1">Last Synced Block</p>
              <div className="flex items-center gap-2">
                <p className="text-xl font-semibold stat-number text-foreground">1,847,293</p>
                <StatusBadge label="Live" variant="success" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* REST API Explorer */}
      <div>
        <h2 className="text-sm font-medium text-foreground/60 mb-3">REST API explorer</h2>
        <div className="space-y-2">
          {endpoints.map((ep) => (
            <EndpointBlock key={ep.path} {...ep} />
          ))}
        </div>
      </div>
    </div>
  );
}
