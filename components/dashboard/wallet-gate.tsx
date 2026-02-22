"use client";

import { IconWallet, IconLoader2, IconPlugConnected } from "@tabler/icons-react";
import { useWallet } from "@/contexts/wallet-context";

export function WalletGate() {
  const { isFreighterInstalled, isConnecting, error, connect, clearError } = useWallet();

  return (
    <div className="flex h-screen w-full items-center justify-center bg-neutral-100 dark:bg-neutral-900 p-6">
      <div className="flex max-w-md flex-col items-center text-center">
        <img src="/icon.svg" alt="Root14" className="mb-8 h-10 w-10" />
        <h1 className="text-xl font-semibold text-foreground">Connect your wallet</h1>
        <p className="mt-2 text-sm text-foreground/50">
          Connect a Stellar wallet to access the Root14 dashboard.
        </p>

        {error && (
          <button
            onClick={clearError}
            className="mt-4 w-full rounded-xl border border-red-200/60 bg-red-50 px-4 py-2.5 text-xs text-red-600 text-left cursor-pointer hover:bg-red-100 transition-colors"
          >
            {error}
          </button>
        )}

        {isFreighterInstalled ? (
          <button
            onClick={connect}
            disabled={isConnecting}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-foreground px-6 py-3 text-xs font-bold uppercase tracking-widest text-background transition-colors hover:bg-foreground/90 disabled:opacity-50 cursor-pointer"
          >
            {isConnecting ? (
              <>
                <IconLoader2 className="h-4 w-4 animate-spin" />
                Connecting…
              </>
            ) : (
              <>
                <IconWallet className="h-4 w-4" />
                Connect Freighter
              </>
            )}
          </button>
        ) : (
          <a
            href="https://www.freighter.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-amber-200/60 bg-amber-50 px-6 py-3 text-xs font-bold uppercase tracking-widest text-amber-700 transition-colors hover:bg-amber-100"
          >
            <IconPlugConnected className="h-4 w-4" />
            Install Freighter
          </a>
        )}
      </div>
    </div>
  );
}
