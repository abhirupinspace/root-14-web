"use client";

import { SectionHeader } from "@/components/section-header";
import { ScrollReveal } from "@/components/scroll-reveal";
import { StripedPattern } from "@/components/striped-pattern";
import { ThreatModel } from "@/components/threat-model";

export function ThreatModelSection() {
  return (
    <section id="threat-model" className="relative px-6 md:px-16 lg:px-24 py-24 border-t border-foreground/10 overflow-hidden">
      <StripedPattern opacity={0.05} spacing={32} angle={45} />

      <div className="relative z-10 max-w-4xl mx-auto">
        <ScrollReveal>
          <SectionHeader
            title="Total Confidentiality"
            subtitle="What the chain sees vs what stays private"
          />
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <p className="text-xs leading-relaxed text-foreground/40 uppercase tracking-wider mb-8 max-w-lg">
            Root14 delivers complete privacy. Observers can verify that every
            transaction is valid, but learn nothing about who transacted, how
            much moved, or with whom.
          </p>
        </ScrollReveal>

        <ThreatModel />
      </div>
    </section>
  );
}
