"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const publicData = [
  { label: "Nullifier", value: "0xd4e5...f6a7" },
  { label: "Commitment", value: "0x82b1...3c4d" },
  { label: "Proof", value: "384 bytes" },
  { label: "Merkle Root", value: "0x91fa...2b3c" },
  { label: "Tx Hash", value: "0xab12...ef34" },
];

const hiddenData = [
  { label: "Sender" },
  { label: "Receiver" },
  { label: "Amount" },
  { label: "Secret Key" },
  { label: "Leaf Index" },
];

export function ThreatModel() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="grid md:grid-cols-2 gap-6">
      {/* Public column */}
      <div className="border border-foreground/20 p-6 bg-background/80 backdrop-blur-sm card-elevated">
        <div className="flex items-center gap-2 mb-5">
          <span className="bg-accent text-background px-2 py-0.5 text-[10px] font-bold">
            PUBLIC
          </span>
          <span className="text-[10px] uppercase tracking-widest text-foreground/40">
            On-chain — visible to all
          </span>
        </div>
        <div className="space-y-3">
          {publicData.map((item, i) => (
            <motion.div
              key={item.label}
              className="flex items-baseline justify-between gap-2"
              initial={{ opacity: 0, x: -12 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.35, delay: i * 0.08 }}
            >
              <span className="text-[10px] uppercase tracking-[0.15em] text-foreground/50 font-bold shrink-0">
                {item.label}
              </span>
              <span className="text-[11px] text-foreground/60 font-mono">
                {item.value}
              </span>
            </motion.div>
          ))}
        </div>
        <motion.div
          className="mt-5 pt-4 border-t border-foreground/10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          <p className="text-[10px] uppercase tracking-widest text-foreground/30">
            Enough to verify correctness. Nothing more.
          </p>
        </motion.div>
      </div>

      {/* Hidden column */}
      <div className="border border-foreground/10 p-6 bg-background/80 backdrop-blur-sm card-elevated">
        <div className="flex items-center gap-2 mb-5">
          <span className="border border-foreground/30 px-2 py-0.5 text-[10px] font-bold uppercase">
            Hidden
          </span>
          <span className="text-[10px] uppercase tracking-widest text-foreground/40">
            Zero-knowledge — revealed to none
          </span>
        </div>
        <div className="space-y-3">
          {hiddenData.map((item, i) => (
            <motion.div
              key={item.label}
              className="flex items-baseline justify-between gap-2"
              initial={{ opacity: 0, x: 12 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.35, delay: 0.2 + i * 0.08 }}
            >
              <span className="text-[10px] uppercase tracking-[0.15em] text-foreground/35 font-bold shrink-0">
                {item.label}
              </span>
              <motion.span
                className="text-[11px] text-foreground/20 select-none font-mono"
                animate={
                  isInView
                    ? {
                        opacity: [0.2, 0.35, 0.15, 0.3, 0.2],
                      }
                    : {}
                }
                transition={{
                  duration: 4,
                  delay: 0.6 + i * 0.15,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                ████████
              </motion.span>
            </motion.div>
          ))}
        </div>
        <motion.div
          className="mt-5 pt-4 border-t border-foreground/[0.06]"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
        >
          <p className="text-[10px] uppercase tracking-widest text-foreground/20">
            The proof guarantees validity. The data stays private.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
