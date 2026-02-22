"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconLayoutDashboard,
  IconWallet,
  IconShieldLock,
  IconDatabase,
  IconFileCode,
  IconSettings,
  IconPlugConnected,
  IconExternalLink,
  IconChevronRight,
  IconFolder,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { useWallet } from "@/contexts/wallet-context";
import { useProjects } from "@/hooks/useProjects";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Separator } from "@/components/ui/separator";

function truncateAddress(address: string): string {
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
}

const projectSubNav = [
  { label: "Overview", segment: "", icon: IconLayoutDashboard },
  { label: "Modules", segment: "/modules", icon: IconShieldLock },
  { label: "Indexer", segment: "/indexer", icon: IconDatabase },
  { label: "Contracts", segment: "/contracts", icon: IconFileCode },
  { label: "Settings", segment: "/settings", icon: IconSettings },
];

function WalletSection() {
  const { address, network, isFreighterInstalled, isConnecting, error, connect, disconnect, clearError } =
    useWallet();
  const [confirmOpen, setConfirmOpen] = useState(false);

  if (!isFreighterInstalled) {
    return (
      <a
        href="https://www.freighter.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-3 py-2 text-sm text-amber-600 hover:bg-muted rounded-md transition-colors"
      >
        <IconPlugConnected className="h-4 w-4" />
        <span>Install Freighter</span>
      </a>
    );
  }

  if (address) {
    return (
      <>
        <button
          onClick={() => setConfirmOpen(true)}
          className="flex items-center gap-2 px-3 py-2 w-full text-left hover:bg-muted rounded-md transition-colors cursor-pointer"
        >
          <div className="h-4 w-4 shrink-0 rounded-full bg-emerald-500/20 flex items-center justify-center">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{truncateAddress(address)}</p>
            <p className="text-[11px] text-foreground/40">{network}</p>
          </div>
        </button>
        <ConfirmDialog
          open={confirmOpen}
          onOpenChange={setConfirmOpen}
          title="Disconnect Wallet"
          description="You'll need to reconnect to access the dashboard again."
          confirmLabel="Disconnect"
          variant="danger"
          onConfirm={() => {
            disconnect();
            setConfirmOpen(false);
          }}
        />
      </>
    );
  }

  return (
    <div>
      <button
        onClick={connect}
        disabled={isConnecting}
        className="flex items-center gap-2 px-3 py-2 w-full text-left hover:bg-muted rounded-md transition-colors cursor-pointer disabled:opacity-50"
      >
        <IconWallet className="h-4 w-4 text-foreground/50" />
        <span className="text-sm text-foreground/70">
          {isConnecting ? "Connecting..." : "Connect Wallet"}
        </span>
      </button>
      {error && (
        <button
          onClick={clearError}
          className="ml-9 text-[11px] text-red-500 cursor-pointer hover:text-red-400 transition-colors"
        >
          {error}
        </button>
      )}
    </div>
  );
}

export function DashboardSidebar() {
  const pathname = usePathname();
  const { projects } = useProjects();

  // Extract projectId from path: /dashboard/[projectId]/...
  const pathParts = pathname.split("/").filter(Boolean);
  const activeProjectId =
    pathParts.length >= 2 && pathParts[0] === "dashboard" && pathParts[1] !== "new" && pathParts[1] !== "settings"
      ? pathParts[1]
      : null;

  const activeProject = activeProjectId ? projects.find((p) => p.id === activeProjectId) : null;

  return (
    <aside className="hidden md:flex md:flex-col w-[240px] shrink-0 h-screen border-r border-border bg-sidebar">
      {/* Logo */}
      <div className="px-4 py-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <img src="/icon.svg" alt="Logo" className="h-5 w-5" />
          <span className="font-semibold text-sm text-foreground">Root14</span>
        </Link>
      </div>

      <Separator />

      {/* Main nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-1">
        {/* Projects link */}
        <Link
          href="/dashboard"
          className={cn(
            "flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors",
            pathname === "/dashboard"
              ? "bg-muted font-medium text-foreground"
              : "text-foreground/60 hover:text-foreground hover:bg-muted/50"
          )}
        >
          <IconFolder className="h-4 w-4" />
          Projects
        </Link>

        {/* Active project sub-nav */}
        {activeProject && (
          <div className="ml-2 mt-1 space-y-0.5">
            <p className="px-3 py-1 text-[11px] font-semibold text-foreground/40 uppercase tracking-wider truncate">
              {activeProject.name}
            </p>
            {projectSubNav.map((item) => {
              const href = `/dashboard/${activeProjectId}${item.segment}`;
              const isActive =
                item.segment === ""
                  ? pathname === `/dashboard/${activeProjectId}`
                  : pathname === href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.segment}
                  href={href}
                  className={cn(
                    "flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors",
                    isActive
                      ? "bg-muted font-medium text-foreground"
                      : "text-foreground/50 hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        )}

        <Separator className="my-2" />

        {/* Docs */}
        <a
          href="https://root14-docs.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-foreground/60 hover:text-foreground hover:bg-muted/50 transition-colors"
        >
          <IconExternalLink className="h-4 w-4" />
          Docs
        </a>

        {/* Global Settings */}
        <Link
          href="/dashboard/settings"
          className={cn(
            "flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors",
            pathname === "/dashboard/settings"
              ? "bg-muted font-medium text-foreground"
              : "text-foreground/60 hover:text-foreground hover:bg-muted/50"
          )}
        >
          <IconSettings className="h-4 w-4" />
          Global Settings
        </Link>
      </nav>

      <Separator />

      {/* Wallet at bottom */}
      <div className="px-3 py-3">
        <WalletSection />
      </div>
    </aside>
  );
}
