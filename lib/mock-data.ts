// Deterministic seeded random for consistent mock charts
function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

interface TimeSeriesPoint {
  time: string;
  value: number;
}

interface TxVolumePoint {
  day: string;
  verify: number;
  deposit: number;
  transfer: number;
}

// Proof verifications — hourly for last 24h
export function generateProofVerifications(): TimeSeriesPoint[] {
  const rand = seededRandom(42);
  const now = new Date();
  return Array.from({ length: 24 }, (_, i) => {
    const t = new Date(now.getTime() - (23 - i) * 3600_000);
    return {
      time: t.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false }),
      value: Math.floor(rand() * 80 + 20),
    };
  });
}

// zkTLS calls — hourly for last 24h
export function generateZkTlsCalls(): TimeSeriesPoint[] {
  const rand = seededRandom(77);
  const now = new Date();
  return Array.from({ length: 24 }, (_, i) => {
    const t = new Date(now.getTime() - (23 - i) * 3600_000);
    return {
      time: t.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false }),
      value: Math.floor(rand() * 50 + 10),
    };
  });
}

// Merkle leaves — daily for last 30d (cumulative growth)
export function generateMerkleGrowth(): TimeSeriesPoint[] {
  const rand = seededRandom(123);
  const now = new Date();
  let cumulative = 8000;
  return Array.from({ length: 30 }, (_, i) => {
    const t = new Date(now.getTime() - (29 - i) * 86400_000);
    cumulative += Math.floor(rand() * 200 + 50);
    return {
      time: t.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      value: cumulative,
    };
  });
}

// Transaction volume — daily for last 7d, broken by type
export function generateTxVolume(): TxVolumePoint[] {
  const rand = seededRandom(256);
  const now = new Date();
  return Array.from({ length: 7 }, (_, i) => {
    const t = new Date(now.getTime() - (6 - i) * 86400_000);
    return {
      day: t.toLocaleDateString("en-US", { weekday: "short" }),
      verify: Math.floor(rand() * 40 + 10),
      deposit: Math.floor(rand() * 25 + 5),
      transfer: Math.floor(rand() * 30 + 8),
    };
  });
}

// Combined activity data for stacked area chart
export function generateActivityData() {
  const proofs = generateProofVerifications();
  const zktls = generateZkTlsCalls();
  return proofs.map((p, i) => ({
    time: p.time,
    proofVerifications: p.value,
    zkTlsCalls: zktls[i].value,
  }));
}
