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

const modules = [
  {
    name: "Transfer",
    description: "Private token transfers with hidden amounts and recipients",
    circuitId: "r14_transfer_v1_groth16",
    constraintCount: "65,536",
    vkStatus: "Both" as const,
    icon: <IconArrowsExchange className="h-5 w-5" />,
    snippet: `import { Root14 } from "@root14/sdk";

const r14 = new Root14({ apiKey: "r14_live_sk_..." });

const proof = await r14.transfer.prove({
  sender: senderKeypair,
  recipient: recipientPubkey,
  amount: 100n,
  asset: "USDC",
});

const tx = await r14.transfer.submit(proof);`,
  },
  {
    name: "Range",
    description: "Range proofs for age verification, balance thresholds, credit scores",
    circuitId: "r14_range_v1_groth16",
    constraintCount: "32,768",
    vkStatus: "Both" as const,
    icon: <IconArrowsMinimize className="h-5 w-5" />,
    snippet: `import { Root14 } from "@root14/sdk";

const r14 = new Root14({ apiKey: "r14_live_sk_..." });

const proof = await r14.range.prove({
  value: 25,
  lowerBound: 18,
  upperBound: 120,
  label: "age_verification",
});`,
  },
  {
    name: "Membership",
    description: "Prove set membership without revealing which element",
    circuitId: "r14_membership_v1_groth16",
    constraintCount: "131,072",
    vkStatus: "Testnet" as const,
    icon: <IconUsers className="h-5 w-5" />,
    snippet: `import { Root14 } from "@root14/sdk";

const r14 = new Root14({ apiKey: "r14_live_sk_..." });

const proof = await r14.membership.prove({
  element: userAddress,
  merkleRoot: root,
  merkleProof: inclusionProof,
});`,
  },
  {
    name: "Ownership",
    description: "Prove asset ownership without revealing balance or identity",
    circuitId: "r14_ownership_v1_groth16",
    constraintCount: "49,152",
    vkStatus: "Testnet" as const,
    icon: <IconFingerprint className="h-5 w-5" />,
    snippet: `import { Root14 } from "@root14/sdk";

const r14 = new Root14({ apiKey: "r14_live_sk_..." });

const proof = await r14.ownership.prove({
  asset: "USDC",
  owner: keypair,
  minBalance: 1000n,
});`,
  },
  {
    name: "Preimage",
    description: "Prove knowledge of a hash preimage without revealing it",
    circuitId: "r14_preimage_v1_groth16",
    constraintCount: "16,384",
    vkStatus: "Both" as const,
    icon: <IconHash className="h-5 w-5" />,
    snippet: `import { Root14 } from "@root14/sdk";

const r14 = new Root14({ apiKey: "r14_live_sk_..." });

const proof = await r14.preimage.prove({
  preimage: secretValue,
  hashFunction: "poseidon",
});`,
  },
  {
    name: "zkTLS",
    description: "TLS attestation proofs for off-chain data verification",
    circuitId: "r14_zktls_v1_groth16",
    constraintCount: "262,144",
    vkStatus: "Testnet" as const,
    icon: <IconLock className="h-5 w-5" />,
    snippet: `import { Root14 } from "@root14/sdk";

const r14 = new Root14({ apiKey: "r14_live_sk_..." });

const attestation = await r14.zktls.attest({
  url: "https://api.exchange.com/balance",
  jsonPath: "$.available_balance",
  claim: { type: "range", min: 10000 },
  headers: { Authorization: "Bearer ..." },
});`,
  },
];

export default function ModulesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">ZK Modules</h1>
        <p className="text-sm text-foreground/50 mt-1">
          Browse the 6 zero-knowledge proof circuits available in Root14.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {modules.map((mod) => (
          <ModuleCard key={mod.circuitId} {...mod} />
        ))}
      </div>
    </div>
  );
}
