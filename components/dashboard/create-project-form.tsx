"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useProjects } from "@/hooks/useProjects";

const AVAILABLE_CIRCUITS = [
  { id: "r14_transfer_v1_groth16", name: "Transfer", description: "Private token transfers" },
  { id: "r14_range_v1_groth16", name: "Range", description: "Range proofs for thresholds" },
  { id: "r14_membership_v1_groth16", name: "Membership", description: "Set membership proofs" },
  { id: "r14_ownership_v1_groth16", name: "Ownership", description: "Asset ownership proofs" },
  { id: "r14_preimage_v1_groth16", name: "Preimage", description: "Hash preimage proofs" },
  { id: "r14_zktls_v1_groth16", name: "zkTLS", description: "TLS attestation proofs" },
];

export function CreateProjectForm() {
  const router = useRouter();
  const { create } = useProjects();
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [network, setNetwork] = useState<"testnet" | "mainnet">("testnet");
  const [selectedCircuits, setSelectedCircuits] = useState<string[]>([]);

  function toggleCircuit(id: string) {
    setSelectedCircuits((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  }

  function handleCreate() {
    if (!name.trim()) return;
    const project = create({ name: name.trim(), network, circuits: selectedCircuits });
    router.push(`/dashboard/${project.id}`);
  }

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-lg">
            {step === 1 ? "Create Project" : "Select Circuits"}
          </CardTitle>
          <p className="text-xs text-foreground/50">Step {step} of 2</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {step === 1 ? (
            <>
              <div>
                <label className="text-xs font-medium text-foreground/70 mb-1.5 block">
                  Project Name
                </label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="My dApp"
                  autoFocus
                />
              </div>
              <div>
                <label className="text-xs font-medium text-foreground/70 mb-1.5 block">
                  Network
                </label>
                <Select value={network} onValueChange={(v) => setNetwork(v as "testnet" | "mainnet")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="testnet">Testnet</SelectItem>
                    <SelectItem value="mainnet">Mainnet</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                onClick={() => setStep(2)}
                disabled={!name.trim()}
                className="w-full"
              >
                Next
              </Button>
            </>
          ) : (
            <>
              <div className="space-y-2">
                {AVAILABLE_CIRCUITS.map((c) => (
                  <label
                    key={c.id}
                    className="flex items-start gap-3 p-3 rounded-lg border border-border/60 hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCircuits.includes(c.id)}
                      onChange={() => toggleCircuit(c.id)}
                      className="mt-0.5 h-4 w-4 rounded border-border/60 accent-foreground"
                    />
                    <div>
                      <p className="text-sm font-medium text-foreground">{c.name}</p>
                      <p className="text-xs text-foreground/40">{c.description}</p>
                    </div>
                  </label>
                ))}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                  Back
                </Button>
                <Button onClick={handleCreate} className="flex-1">
                  Create Project
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
