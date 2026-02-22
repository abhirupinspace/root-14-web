"use client";

import { ScrollReveal } from "@/components/scroll-reveal";
import { Wallet, Repeat, Landmark, Globe } from "lucide-react";

const cases = [
  {
    tag: "01",
    title: "Private Payments",
    desc: "Complete shielding for every payment. Not partial privacy — total confidentiality. Sender, receiver, amount, and balance are all hidden by default.",
    detail: "Every transaction is fully shielded. No opt-in, no exceptions, no metadata leaks.",
  },
  {
    tag: "02",
    title: "Confidential DeFi",
    desc: "The full privacy solution for DeFi. Trade, lend, and swap without anyone seeing your strategy, position size, or portfolio.",
    detail: "Complete confidentiality at every step — from order placement to settlement.",
  },
  {
    tag: "03",
    title: "Institutional Settlement",
    desc: "Root14 solves the privacy-compliance tension completely. Institutions get full transaction privacy with selective disclosure for regulators.",
    detail: "Private by default, compliant by design — the complete solution for institutional finance.",
  },
  {
    tag: "04",
    title: "Cross-Border Transfers",
    desc: "End-to-end privacy from sender to recipient. Every cross-border transfer is fully shielded — no corridor volumes, no exposed routes.",
    detail: "Complete privacy across borders — cryptographic verification without sacrificing confidentiality.",
  },
];

export function UseCases() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {cases.map((c, i) => (
        <ScrollReveal key={c.tag} delay={i * 0.08}>
          <div className="border border-foreground/20 p-6 h-full flex flex-col bg-background/80 backdrop-blur-sm card-elevated group">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-accent text-background px-2 py-0.5 text-[10px] font-bold">
                {c.tag}
              </span>
              <span className="text-sm font-bold uppercase tracking-wider">
                {c.title}
              </span>
            </div>
            <p className="text-xs leading-relaxed text-foreground/50 uppercase tracking-wider flex-1">
              {c.desc}
            </p>
            <p className="mt-4 text-[10px] leading-relaxed text-foreground/30 uppercase tracking-wider border-t border-foreground/10 pt-3">
              {c.detail}
            </p>
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
}
