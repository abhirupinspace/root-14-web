"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ContractRow } from "@/components/dashboard/contract-row";
import { CopyButton } from "@/components/dashboard/copy-button";
import { StatusBadge } from "@/components/dashboard/status-badge";

const STELLAR_EXPLORER = "https://stellar.expert/explorer/testnet/contract";

const contracts = [
  {
    name: "Verifier",
    address: "CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC",
    network: "Testnet" as const,
  },
  {
    name: "Commitment Pool",
    address: "CBKM3GZQLFXR5GKFVOCYN7RATJSFDEJWCEDI3IRPAZ7SYJHCM4WSXHQ",
    network: "Testnet" as const,
  },
  {
    name: "Token Mixer",
    address: "CCWAMYJME4H5MKV57D5RCMSJRGH4QZPNMRZQDP3ZRIP52FLKL3SXEWX",
    network: "Testnet" as const,
  },
  {
    name: "VK Registry",
    address: "CA4RCZWPZDFXH6KFWPNAMRVAGY3VHN6MQNBZQ7Y6DVTJM3KATQO2IRQ",
    network: "Testnet" as const,
  },
];

const registeredCircuits = [
  {
    circuitId: "r14_transfer_v1_groth16",
    vkHash: "0x7f3a9b2c4d1e8f6a0b5c3d9e7f2a4b6c",
    txHash: "abc123def456789012345678901234567890abcdef",
  },
  {
    circuitId: "r14_range_v1_groth16",
    vkHash: "0x2c4d1e8f6a0b5c3d9e7f2a4b6c8d0e1f",
    txHash: "def456789012345678901234567890abcdef123456",
  },
  {
    circuitId: "r14_membership_v1_groth16",
    vkHash: "0x8f6a0b5c3d9e7f2a4b6c8d0e1f3a5b7c",
    txHash: "789012345678901234567890abcdef123456def456",
  },
  {
    circuitId: "r14_preimage_v1_groth16",
    vkHash: "0x0b5c3d9e7f2a4b6c8d0e1f3a5b7c9d1e",
    txHash: "345678901234567890abcdef123456def456789012",
  },
];

const recentTxs = [
  { type: "Verify", hash: "a1b2c3d4e5f6...7890", block: 1847290, time: "2 min ago", status: "Confirmed" },
  { type: "Deposit", hash: "f6e5d4c3b2a1...0987", block: 1847285, time: "8 min ago", status: "Confirmed" },
  { type: "Transfer", hash: "1a2b3c4d5e6f...abcd", block: 1847271, time: "24 min ago", status: "Confirmed" },
  { type: "Verify", hash: "9f8e7d6c5b4a...3210", block: 1847263, time: "31 min ago", status: "Confirmed" },
  { type: "Deposit", hash: "4d5e6f7a8b9c...ef01", block: 1847250, time: "47 min ago", status: "Confirmed" },
];

const txTypeColors: Record<string, string> = {
  Verify: "text-blue-600 bg-blue-50",
  Deposit: "text-emerald-600 bg-emerald-50",
  Transfer: "text-violet-600 bg-violet-50",
};

export default function ContractsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Contracts</h1>
        <p className="text-sm text-foreground/50 mt-1">
          Deployed contract addresses and on-chain activity.
        </p>
      </div>

      {/* Deployed Contracts */}
      <div>
        <h2 className="text-sm font-medium text-foreground/60 mb-3">Deployed contracts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {contracts.map((c) => (
            <ContractRow
              key={c.address}
              {...c}
              explorerUrl={`${STELLAR_EXPLORER}/${c.address}`}
            />
          ))}
        </div>
      </div>

      {/* Registered Circuits */}
      <div>
        <h2 className="text-sm font-medium text-foreground/60 mb-3">Registered circuits</h2>
        <Card>
          <CardContent className="pt-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/40">
                    <th className="text-left text-[10px] uppercase tracking-wider text-foreground/40 py-2 pr-4">Circuit ID</th>
                    <th className="text-left text-[10px] uppercase tracking-wider text-foreground/40 py-2 pr-4">VK Hash</th>
                    <th className="text-left text-[10px] uppercase tracking-wider text-foreground/40 py-2">Tx Hash</th>
                  </tr>
                </thead>
                <tbody>
                  {registeredCircuits.map((c) => (
                    <tr key={c.circuitId} className="border-b border-border/20 last:border-0">
                      <td className="py-2.5 pr-4">
                        <code className="text-xs font-mono text-foreground/70">{c.circuitId}</code>
                      </td>
                      <td className="py-2.5 pr-4">
                        <div className="flex items-center gap-1">
                          <code className="text-xs font-mono text-foreground/50">{c.vkHash.slice(0, 14)}...</code>
                          <CopyButton text={c.vkHash} className="h-5 w-5" />
                        </div>
                      </td>
                      <td className="py-2.5">
                        <div className="flex items-center gap-1">
                          <code className="text-xs font-mono text-foreground/50">{c.txHash.slice(0, 12)}...</code>
                          <CopyButton text={c.txHash} className="h-5 w-5" />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <div>
        <h2 className="text-sm font-medium text-foreground/60 mb-3">Recent transactions</h2>
        <Card>
          <CardContent className="pt-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/40">
                    <th className="text-left text-[10px] uppercase tracking-wider text-foreground/40 py-2 pr-4">Type</th>
                    <th className="text-left text-[10px] uppercase tracking-wider text-foreground/40 py-2 pr-4">Tx Hash</th>
                    <th className="text-left text-[10px] uppercase tracking-wider text-foreground/40 py-2 pr-4">Block</th>
                    <th className="text-left text-[10px] uppercase tracking-wider text-foreground/40 py-2 pr-4">Time</th>
                    <th className="text-left text-[10px] uppercase tracking-wider text-foreground/40 py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTxs.map((tx, i) => (
                    <tr key={i} className="border-b border-border/20 last:border-0">
                      <td className="py-2.5 pr-4">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${txTypeColors[tx.type]}`}>
                          {tx.type}
                        </span>
                      </td>
                      <td className="py-2.5 pr-4">
                        <code className="text-xs font-mono text-foreground/50">{tx.hash}</code>
                      </td>
                      <td className="py-2.5 pr-4">
                        <span className="text-xs font-mono text-foreground/60">{tx.block.toLocaleString()}</span>
                      </td>
                      <td className="py-2.5 pr-4">
                        <span className="text-xs text-foreground/50">{tx.time}</span>
                      </td>
                      <td className="py-2.5">
                        <StatusBadge label={tx.status} variant="success" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
