"use client";

import {
  IconArrowsExchange,
  IconArrowsMinimize,
  IconUsers,
  IconFingerprint,
  IconHash,
  IconLock,
} from "@tabler/icons-react";
import { ModuleCard } from "@/components/dashboard/module-card";
import { ProjectHeader } from "@/components/dashboard/project-header";
import { useProject } from "@/contexts/project-context";

const modules = [
  {
    name: "Transfer",
    description: "Private token transfers with hidden amounts and recipients",
    circuitId: "r14_transfer_v1_groth16",
    constraintCount: "7,638",
    vkStatus: "Both" as const,
    icon: <IconArrowsExchange className="h-5 w-5" />,
  },
  {
    name: "Range",
    description: "Range proofs for age verification, balance thresholds, credit scores",
    circuitId: "r14_range_v1_groth16",
    constraintCount: "—",
    vkStatus: "Testnet" as const,
    icon: <IconArrowsMinimize className="h-5 w-5" />,
    comingSoon: true,
  },
  {
    name: "Membership",
    description: "Prove set membership without revealing which element",
    circuitId: "r14_membership_v1_groth16",
    constraintCount: "—",
    vkStatus: "Testnet" as const,
    icon: <IconUsers className="h-5 w-5" />,
    comingSoon: true,
  },
  {
    name: "Ownership",
    description: "Prove asset ownership without revealing balance or identity",
    circuitId: "r14_ownership_v1_groth16",
    constraintCount: "—",
    vkStatus: "Testnet" as const,
    icon: <IconFingerprint className="h-5 w-5" />,
    comingSoon: true,
  },
  {
    name: "Preimage",
    description: "Prove knowledge of a hash preimage without revealing it",
    circuitId: "r14_preimage_v1_groth16",
    constraintCount: "—",
    vkStatus: "Testnet" as const,
    icon: <IconHash className="h-5 w-5" />,
    comingSoon: true,
  },
  {
    name: "zkTLS",
    description: "TLS attestation proofs for off-chain data verification",
    circuitId: "r14_zktls_v1_groth16",
    constraintCount: "—",
    vkStatus: "Testnet" as const,
    icon: <IconLock className="h-5 w-5" />,
    comingSoon: true,
  },
];

export default function ProjectModulesPage() {
  const { project } = useProject();
  if (!project) return null;

  return (
    <div className="space-y-8">
      <ProjectHeader title="ZK Modules" description="Zero-knowledge proof circuits available in Root14." />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {modules.map((mod) => (
          <ModuleCard key={mod.circuitId} {...mod} />
        ))}
      </div>
    </div>
  );
}
