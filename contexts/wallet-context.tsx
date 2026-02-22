"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useFreighter } from "@/hooks/useFreighter";

type WalletState = ReturnType<typeof useFreighter>;

const WalletContext = createContext<WalletState | null>(null);

export function WalletProvider({ children }: { children: ReactNode }) {
  const wallet = useFreighter();
  return (
    <WalletContext.Provider value={wallet}>{children}</WalletContext.Provider>
  );
}

export function useWallet(): WalletState {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error("useWallet must be used within WalletProvider");
  return ctx;
}
