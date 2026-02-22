"use client";

import { ScrollReveal } from "@/components/scroll-reveal";

interface Protocol {
  name: string;
  highlight: boolean;
  values: Record<string, string>;
}

const dimensions = [
  "Chain",
  "Proof System",
  "Curve",
  "Privacy Model",
  "State Model",
  "Proof Size",
  "Verification",
  "Status",
] as const;

const protocols: Protocol[] = [
  {
    name: "Root14",
    highlight: true,
    values: {
      Chain: "Stellar (Soroban)",
      "Proof System": "Groth16",
      Curve: "BLS12-381",
      "Privacy Model": "Shielded Pool",
      "State Model": "UTXO + Nullifier",
      "Proof Size": "384 bytes",
      Verification: "~1ms on-chain",
      Status: "Live on Testnet",
    },
  },
  {
    name: "Tornado Cash",
    highlight: false,
    values: {
      Chain: "Ethereum",
      "Proof System": "Groth16",
      Curve: "BN254",
      "Privacy Model": "Fixed-Size Mixer",
      "State Model": "Nullifier Set",
      "Proof Size": "256 bytes",
      Verification: "~230k gas",
      Status: "Sanctioned",
    },
  },
  {
    name: "Zcash",
    highlight: false,
    values: {
      Chain: "Zcash (custom)",
      "Proof System": "Halo 2",
      Curve: "Pasta Curves",
      "Privacy Model": "Full Shielded",
      "State Model": "UTXO + Nullifier",
      "Proof Size": "~7.5 KB",
      Verification: "~50ms",
      Status: "Production",
    },
  },
];

export function ProtocolComparison() {
  return (
    <div>
      {/* Desktop table */}
      <div className="hidden md:block">
        <ScrollReveal delay={0.1}>
          <div className="border border-foreground/10 overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-foreground/10">
                  <th className="px-4 py-3 text-[10px] uppercase tracking-widest text-foreground/40 font-bold w-[140px]">
                    Dimension
                  </th>
                  {protocols.map((p) => (
                    <th
                      key={p.name}
                      className={`px-4 py-3 text-[10px] uppercase tracking-widest font-bold ${
                        p.highlight
                          ? "text-foreground/80 bg-accent/[0.04] border-x border-accent/40"
                          : "text-foreground/40"
                      }`}
                    >
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dimensions.map((dim) => (
                  <tr
                    key={dim}
                    className="border-b border-foreground/[0.06] last:border-b-0"
                  >
                    <td className="px-4 py-2.5 text-[10px] uppercase tracking-[0.15em] text-foreground/40 font-bold">
                      {dim}
                    </td>
                    {protocols.map((p) => (
                      <td
                        key={`${p.name}-${dim}`}
                        className={`px-4 py-2.5 text-[11px] ${
                          p.highlight
                            ? "text-foreground/70 bg-accent/[0.04] border-x border-accent/40"
                            : "text-foreground/50"
                        }`}
                      >
                        <span className="font-mono">{p.values[dim]}</span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollReveal>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-4">
        {protocols.map((p, i) => (
          <ScrollReveal key={p.name} delay={i * 0.1}>
            <div
              className={`border p-5 space-y-3 ${
                p.highlight
                  ? "border-accent/40 bg-accent/[0.03]"
                  : "border-foreground/10"
              }`}
            >
              <div
                className={`text-[10px] uppercase tracking-widest font-bold ${
                  p.highlight ? "text-foreground/80" : "text-foreground/40"
                }`}
              >
                {p.name}
              </div>
              <div className="space-y-2">
                {dimensions.map((dim) => (
                  <div
                    key={dim}
                    className="flex justify-between items-baseline gap-2"
                  >
                    <span className="text-[9px] uppercase tracking-[0.15em] text-foreground/35 font-bold shrink-0">
                      {dim}
                    </span>
                    <span
                      className={`text-[11px] text-right font-mono ${
                        p.highlight
                          ? "text-foreground/70"
                          : "text-foreground/50"
                      }`}
                    >
                      {p.values[dim]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
