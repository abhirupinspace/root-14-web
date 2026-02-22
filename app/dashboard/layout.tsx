"use client";

import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { WalletProvider, useWallet } from "@/contexts/wallet-context";
import { WalletGate } from "@/components/dashboard/wallet-gate";

function DashboardShell({ children }: { children: React.ReactNode }) {
  const { address } = useWallet();

  if (!address) return <WalletGate />;

  return (
    <div className="flex h-screen w-full bg-background">
      <DashboardSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="p-6 md:p-10">
          {children}
        </div>
      </main>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WalletProvider>
      <DashboardShell>{children}</DashboardShell>
    </WalletProvider>
  );
}
