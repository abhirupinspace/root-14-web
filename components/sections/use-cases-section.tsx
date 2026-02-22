"use client";

import { SectionHeader } from "@/components/section-header";
import { ScrollReveal } from "@/components/scroll-reveal";
import { StripedPattern } from "@/components/striped-pattern";
import { UseCases } from "@/components/use-cases";

export function UseCasesSection() {
  return (
    <section id="use-cases" className="relative px-6 md:px-16 lg:px-24 py-24 border-t border-foreground/10 overflow-hidden">
      <StripedPattern opacity={0.04} spacing={30} angle={-45} />

      <div className="relative z-10 max-w-4xl mx-auto">
        <ScrollReveal>
          <SectionHeader
            title="Use Cases"
            subtitle="Complete privacy for every use case"
          />
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <p className="text-xs leading-relaxed text-foreground/40 uppercase tracking-wider mb-8 max-w-lg">
            Root14 is a complete privacy solution — from payment confidentiality
            to institutional compliance, one protocol covers it all.
          </p>
        </ScrollReveal>

        <UseCases />
      </div>
    </section>
  );
}
