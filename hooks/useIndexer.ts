"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { api, type HealthResponse, type RootResponse, type LeafResponse } from "@/lib/api";

interface LeafHistoryEntry {
  time: string;
  count: number;
}

interface IndexerState {
  health: HealthResponse | null;
  root: RootResponse | null;
  leaves: LeafResponse[] | null;
  leafCount: number;
  leafHistory: LeafHistoryEntry[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useIndexer(): IndexerState {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [root, setRoot] = useState<RootResponse | null>(null);
  const [leaves, setLeaves] = useState<LeafResponse[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [leafHistory, setLeafHistory] = useState<LeafHistoryEntry[]>([]);
  const isFirstFetch = useRef(true);

  const fetchAll = useCallback(async () => {
    if (isFirstFetch.current) {
      setIsLoading(true);
    }
    setError(null);

    try {
      const [h, r, l] = await Promise.all([
        api.health().catch(() => null),
        api.root().catch(() => null),
        api.leaves().catch(() => null),
      ]);

      setHealth(h);
      setRoot(r);
      setLeaves(l);

      const count = r?.leafCount ?? l?.length ?? 0;
      const now = new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      setLeafHistory((prev) => [...prev.slice(-59), { time: now, count }]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to fetch indexer data");
    } finally {
      if (isFirstFetch.current) {
        setIsLoading(false);
        isFirstFetch.current = false;
      }
    }
  }, []);

  useEffect(() => {
    fetchAll();
    const id = setInterval(fetchAll, 10_000);
    return () => clearInterval(id);
  }, [fetchAll]);

  const leafCount = root?.leafCount ?? leaves?.length ?? 0;

  return { health, root, leaves, leafCount, leafHistory, isLoading, error, refetch: fetchAll };
}
