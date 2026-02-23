"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DemoStep } from "@/components/demo/demo-step";
import { ResultBlock } from "@/components/demo/result-block";
import { Navbar } from "@/components/navbar";
import {
  Shield,
  ArrowRight,
  Wallet,
  Send,
  Eye,
  BookOpen,
} from "lucide-react";

type StepStatus = "pending" | "active" | "done";

interface DemoState {
  currentStep: number;
  walletAddress: string | null;
  ownerHash: string | null;
  depositCommitment: string | null;
  depositValue: number | null;
  balance: number | null;
  transferNullifier: string | null;
  transferValue: number | null;
  error: string | null;
}

// Simulated crypto values for the demo
function randomHex(len: number): string {
  const chars = "0123456789abcdef";
  let result = "0x";
  for (let i = 0; i < len; i++) result += chars[Math.floor(Math.random() * 16)];
  return result;
}

export default function DemoPage() {
  const [state, setState] = useState<DemoState>({
    currentStep: 0,
    walletAddress: null,
    ownerHash: null,
    depositCommitment: null,
    depositValue: null,
    balance: null,
    transferNullifier: null,
    transferValue: null,
    error: null,
  });

  const [loading, setLoading] = useState(false);

  const stepStatus = (step: number): StepStatus => {
    if (step < state.currentStep) return "done";
    if (step === state.currentStep) return "active";
    return "pending";
  };

  const advance = useCallback(() => {
    setState((s) => ({ ...s, currentStep: s.currentStep + 1, error: null }));
  }, []);

  // Step 0: Connect wallet (simulated)
  const handleConnect = useCallback(async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));

    const address = "G" + randomHex(27).slice(2).toUpperCase();
    const ownerHash = randomHex(64);

    setState((s) => ({
      ...s,
      walletAddress: address,
      ownerHash,
      currentStep: 1,
    }));
    setLoading(false);
  }, []);

  // Step 1: Deposit
  const handleDeposit = useCallback(async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));

    const commitment = randomHex(64);
    const value = 1000;

    setState((s) => ({
      ...s,
      depositCommitment: commitment,
      depositValue: value,
      balance: value,
      currentStep: 2,
    }));
    setLoading(false);
  }, []);

  // Step 2: View balance
  const handleBalance = useCallback(async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    advance();
    setLoading(false);
  }, [advance]);

  // Step 3: Transfer
  const handleTransfer = useCallback(async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 2000));

    const nullifier = randomHex(64);
    const transferValue = 300;

    setState((s) => ({
      ...s,
      transferNullifier: nullifier,
      transferValue,
      balance: (s.balance ?? 0) - transferValue,
      currentStep: 4,
    }));
    setLoading(false);
  }, []);

  // Step 4: Verify
  const handleVerify = useCallback(async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    advance();
    setLoading(false);
  }, [advance]);

  const reset = useCallback(() => {
    setState({
      currentStep: 0,
      walletAddress: null,
      ownerHash: null,
      depositCommitment: null,
      depositValue: null,
      balance: null,
      transferNullifier: null,
      transferValue: null,
      error: null,
    });
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="max-w-2xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-foreground/10 mb-6">
              <Shield className="h-3.5 w-3.5 text-foreground/50" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/50">
                Interactive Demo
              </span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight">
              Private Payments on Stellar
            </h1>
            <p className="text-sm text-foreground/50 mt-3 max-w-md mx-auto">
              Walk through the complete Root14 flow — from wallet creation to
              zero-knowledge private transfers — in under 2 minutes.
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-4">
            {/* Step 0: Connect Wallet */}
            <DemoStep
              number={1}
              title="Connect Wallet"
              description="Generate a Root14 keypair linked to your Stellar identity"
              status={stepStatus(0)}
            >
              {state.walletAddress ? (
                <div className="space-y-2">
                  <ResultBlock
                    label="address"
                    value={state.walletAddress}
                    variant="success"
                  />
                  <ResultBlock label="owner_hash" value={state.ownerHash!} />
                </div>
              ) : (
                <Button onClick={handleConnect} disabled={loading} size="sm">
                  <Wallet className="h-3.5 w-3.5" />
                  {loading ? "Generating keypair..." : "Connect & Generate Keys"}
                </Button>
              )}
            </DemoStep>

            {/* Step 1: Deposit */}
            <DemoStep
              number={2}
              title="Deposit"
              description="Shield funds by creating a private note with a Poseidon commitment"
              status={stepStatus(1)}
            >
              {state.depositCommitment ? (
                <div className="space-y-2">
                  <ResultBlock
                    label="value"
                    value={`${state.depositValue} units`}
                    mono={false}
                    variant="success"
                  />
                  <ResultBlock label="commitment" value={state.depositCommitment} />
                  <p className="text-[10px] text-foreground/40 mt-2">
                    Note created and submitted on-chain. The value is hidden — only
                    the commitment hash is public.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-xs text-foreground/60">
                    Deposit <strong>1,000 units</strong> into a shielded note.
                    The on-chain transaction only reveals a Poseidon hash commitment
                    — the value stays private.
                  </p>
                  <Button onClick={handleDeposit} disabled={loading} size="sm">
                    <ArrowRight className="h-3.5 w-3.5" />
                    {loading ? "Creating note..." : "Deposit 1,000"}
                  </Button>
                </div>
              )}
            </DemoStep>

            {/* Step 2: View Balance */}
            <DemoStep
              number={3}
              title="View Balance"
              description="Sync with the indexer and compute your private balance"
              status={stepStatus(2)}
            >
              {state.currentStep > 2 ? (
                <div className="space-y-2">
                  <ResultBlock
                    label="balance"
                    value={`${state.balance} units`}
                    mono={false}
                    variant="success"
                  />
                  <ResultBlock
                    label="notes"
                    value="1 unspent note (on-chain)"
                    mono={false}
                  />
                  <p className="text-[10px] text-foreground/40 mt-2">
                    Only you can compute this balance — it requires your secret key
                    to decrypt note values.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-xs text-foreground/60">
                    Query the indexer to sync note statuses and compute your
                    shielded balance locally.
                  </p>
                  <Button onClick={handleBalance} disabled={loading} size="sm">
                    <Eye className="h-3.5 w-3.5" />
                    {loading ? "Syncing..." : "Check Balance"}
                  </Button>
                </div>
              )}
            </DemoStep>

            {/* Step 3: Transfer */}
            <DemoStep
              number={4}
              title="Private Transfer"
              description="Generate a Groth16 ZK proof and send funds without revealing the amount"
              status={stepStatus(3)}
            >
              {state.transferNullifier ? (
                <div className="space-y-2">
                  <ResultBlock
                    label="sent"
                    value={`${state.transferValue} units`}
                    mono={false}
                    variant="success"
                  />
                  <ResultBlock label="nullifier" value={state.transferNullifier} />
                  <ResultBlock
                    label="remaining"
                    value={`${state.balance} units`}
                    mono={false}
                  />
                  <p className="text-[10px] text-foreground/40 mt-2">
                    The old note is nullified (spent) and two new notes are created:
                    one for the recipient, one as change. The on-chain verifier only
                    sees the ZK proof — never the amounts.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-xs text-foreground/60">
                    Transfer <strong>300 units</strong> to another address. A
                    Groth16 proof proves the transaction is valid without revealing
                    sender, recipient, or amount.
                  </p>
                  <Button onClick={handleTransfer} disabled={loading} size="sm">
                    <Send className="h-3.5 w-3.5" />
                    {loading
                      ? "Generating ZK proof..."
                      : "Transfer 300 (Private)"}
                  </Button>
                </div>
              )}
            </DemoStep>

            {/* Step 4: Verify */}
            <DemoStep
              number={5}
              title="Verify On-Chain"
              description="Confirm the proof was accepted by the Soroban verifier contract"
              status={stepStatus(4)}
            >
              {state.currentStep > 4 ? (
                <div className="space-y-3">
                  <ResultBlock
                    label="status"
                    value="Proof verified ✓"
                    mono={false}
                    variant="success"
                  />
                  <ResultBlock
                    label="balance"
                    value={`${state.balance} units`}
                    mono={false}
                    variant="success"
                  />
                  <div className="mt-4 p-4 rounded-lg border border-foreground/10 bg-muted/20">
                    <p className="text-xs text-foreground/60">
                      <strong>What an observer sees:</strong> A deposit hash, a
                      nullifier, and a proof blob. No amounts, no addresses, no
                      linkage.
                    </p>
                    <p className="text-xs text-foreground/40 mt-2">
                      <strong>What happened:</strong> 1,000 deposited → 300
                      transferred → 700 remaining. All private.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-xs text-foreground/60">
                    The Soroban contract verifies the Groth16 proof on-chain. If
                    valid, the state transitions are applied.
                  </p>
                  <Button onClick={handleVerify} disabled={loading} size="sm">
                    <Shield className="h-3.5 w-3.5" />
                    {loading ? "Verifying..." : "Verify Proof"}
                  </Button>
                </div>
              )}
            </DemoStep>
          </div>

          {/* Bottom actions */}
          {state.currentStep > 4 && (
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="outline" size="sm" onClick={reset}>
                Run Again
              </Button>
              <Button asChild size="sm">
                <a href="https://root14-docs.vercel.app/" target="_blank" rel="noopener noreferrer">
                  <BookOpen className="h-3.5 w-3.5" />
                  Read the Docs
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href="/dashboard">
                  Open Dashboard
                </a>
              </Button>
            </div>
          )}

          {/* Info card */}
          <Card className="mt-12">
            <CardHeader>
              <CardTitle className="text-sm uppercase tracking-wider">
                How It Works
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-foreground/40">
                    Notes (UTXO)
                  </p>
                  <p className="text-xs text-foreground/60 mt-1">
                    Funds exist as encrypted notes with Poseidon hash commitments.
                    Only the owner can read values.
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-foreground/40">
                    ZK Proofs
                  </p>
                  <p className="text-xs text-foreground/60 mt-1">
                    Groth16 proofs verify transfers without revealing amounts,
                    senders, or recipients.
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-foreground/40">
                    On-Chain
                  </p>
                  <p className="text-xs text-foreground/60 mt-1">
                    Soroban smart contracts verify proofs and update the Merkle tree
                    — all trustlessly on Stellar.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
