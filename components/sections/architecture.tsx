"use client";

import { SectionHeader } from "@/components/section-header";
import { ScrollReveal } from "@/components/scroll-reveal";
import { StripedPattern } from "@/components/striped-pattern";

const layers = [
  {
    label: "L1",
    icon: "⛓",
    title: "Kernel",
    desc: "The trust anchor. A single Soroban smart contract that verifies Groth16 proofs on-chain, manages the Merkle tree, and enforces every privacy guarantee.",
    footer:
      "One contract, infinite privacy — all verification happens trustlessly on-chain.",
  },
  {
    label: "L2",
    icon: "⊞",
    title: "Circuit",
    desc: "Privacy happens here. Groth16 circuits over BLS12-381 prove commitment validity, Merkle membership, and balance conservation — entirely on your device.",
    footer:
      "Your data never leaves your device — no trusted third party, ever.",
  },
  {
    label: "L3",
    icon: "⟳",
    title: "Indexer",
    desc: "Seamless privacy without compromising usability. Watches Soroban events and builds a local Merkle tree replica so proofs are always ready.",
    footer:
      "Complete privacy, zero friction — real-time state sync from on-chain events.",
  },
];

export function Architecture() {
  return (
    <section
      id="architecture"
      className="relative px-6 md:px-16 lg:px-24 py-24 border-t border-foreground/10 overflow-hidden grid place-items-center"
    >
      {/* <StripedPattern opacity={0.04} spacing={28} angle={-45} /> */}

      <div className="relative z-10 max-w-4xl">
        <ScrollReveal>
          <SectionHeader
            title="End-to-End Privacy Stack"
            subtitle="Three layers, complete coverage"
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {layers.map((layer, i) => (
            <ScrollReveal key={layer.title} delay={0.1 * (i + 1)}>
              <div className="border border-foreground/20 p-6 bg-background/80 backdrop-blur-sm card-elevated flex flex-col h-full">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-accent text-background px-2 py-0.5 text-[10px] font-bold">
                    {layer.label}
                  </span>
                  <span className="text-sm">{layer.icon}</span>
                  <span className="text-xs font-bold uppercase tracking-wider">
                    {layer.title}
                  </span>
                </div>

                <p className="text-xs leading-relaxed text-foreground/50 uppercase tracking-wider mb-6">
                  {layer.desc}
                </p>

                <p className="text-[10px] leading-relaxed text-foreground/30 uppercase tracking-wider mt-auto">
                  {layer.footer}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
