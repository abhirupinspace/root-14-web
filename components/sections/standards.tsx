"use client";

import { SectionHeader } from "@/components/section-header";
import { ScrollReveal } from "@/components/scroll-reveal";
import { StripedPattern } from "@/components/striped-pattern";

export function Standards() {
  return (
    <section
      id="standards"
      className="relative px-6 md:px-16 lg:px-24 py-24 border-y border-foreground/10 overflow-hidden"
    >
      <StripedPattern opacity={0.04} spacing={28} angle={45} />

      <div className="relative z-10 max-w-4xl mx-auto">
        <ScrollReveal>
          <SectionHeader
            title="Standards"
            subtitle="Open specifications for complete privacy"
          />
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <p className="text-xs leading-relaxed text-foreground/40 uppercase tracking-wider mb-6 max-w-lg">
            Root14 defines the privacy standard for Stellar. Open specifications
            anyone can build on — interoperable primitives for complete
            zero-knowledge privacy.
          </p>
        </ScrollReveal>

        <div className="space-y-6">
          <ScrollReveal delay={0.1}>
            <div className="border border-foreground/20 p-6 bg-background/80 backdrop-blur-sm card-elevated">
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-accent text-background px-2 py-0.5 text-[10px] font-bold">
                  R14-STP
                </span>
                <span className="text-xs font-bold uppercase tracking-wider">
                  State Transition Protocol
                </span>
                <span className="ml-auto border border-foreground/20 px-2 py-0.5 text-[9px] uppercase tracking-widest text-foreground/40">
                  In Development
                </span>
              </div>
              <p className="text-xs leading-relaxed text-foreground/50 uppercase tracking-wider">
                Defines the commitment scheme, nullifier derivation, Merkle
                tree construction, and Groth16 circuit constraints for
                private state transitions on Soroban. Covers deposit,
                transfer, and withdrawal operations.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="border border-foreground/20 p-6 bg-background/80 backdrop-blur-sm card-elevated">
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-accent text-background px-2 py-0.5 text-[10px] font-bold">
                  R14-NUL
                </span>
                <span className="text-xs font-bold uppercase tracking-wider">
                  Nullifier Specification
                </span>
                <span className="ml-auto border border-foreground/20 px-2 py-0.5 text-[9px] uppercase tracking-widest text-foreground/40">
                  In Development
                </span>
              </div>
              <p className="text-xs leading-relaxed text-foreground/50 uppercase tracking-wider">
                Specifies nullifier generation, storage, and verification.
                Prevents double-spending without revealing the spent
                commitment. Defines the nullifier set data structure and
                on-chain storage layout.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
