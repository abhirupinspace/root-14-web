"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  IconLayoutDashboard,
  IconWallet,
  IconShieldLock,
  IconDatabase,
  IconFileCode,
  IconSettings,
  IconPlugConnected,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarBody,
  SidebarLink,
  useSidebar,
} from "@/components/ui/sidebar";
import { useFreighter } from "@/hooks/useFreighter";

const sidebarLinks = [
  {
    label: "Overview",
    href: "/dashboard",
    icon: (
      <IconLayoutDashboard className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  },
  {
    label: "ZK Modules",
    href: "/dashboard/modules",
    icon: (
      <IconShieldLock className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  },
  {
    label: "Indexer",
    href: "/dashboard/indexer",
    icon: (
      <IconDatabase className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  },
  {
    label: "Contracts",
    href: "/dashboard/contracts",
    icon: (
      <IconFileCode className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: (
      <IconSettings className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  },
];

function truncateAddress(address: string): string {
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
}

function WalletButton() {
  const { open, animate } = useSidebar();
  const { address, network, isFreighterInstalled, isConnecting, connect, disconnect } =
    useFreighter();

  if (!isFreighterInstalled) {
    return (
      <a
        href="https://www.freighter.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 py-2 group/sidebar"
      >
        <IconPlugConnected className="h-5 w-5 shrink-0 text-amber-500" />
        <motion.span
          animate={{
            display: animate ? (open ? "inline-block" : "none") : "inline-block",
            opacity: animate ? (open ? 1 : 0) : 1,
          }}
          className="text-amber-500 text-sm whitespace-pre"
        >
          Install Freighter
        </motion.span>
      </a>
    );
  }

  if (address) {
    return (
      <div className="flex flex-col gap-1">
        <button
          onClick={disconnect}
          className="flex items-center gap-2 py-2 group/sidebar cursor-pointer"
        >
          <div className="h-5 w-5 shrink-0 rounded-full bg-emerald-500/20 flex items-center justify-center">
            <div className="h-2 w-2 rounded-full bg-emerald-500" />
          </div>
          <motion.span
            animate={{
              display: animate ? (open ? "inline-block" : "none") : "inline-block",
              opacity: animate ? (open ? 1 : 0) : 1,
            }}
            className="text-neutral-700 dark:text-neutral-200 text-sm whitespace-pre group-hover/sidebar:translate-x-1 transition duration-150"
          >
            {truncateAddress(address)}
          </motion.span>
        </button>
        <motion.span
          animate={{
            display: animate ? (open ? "inline-block" : "none") : "inline-block",
            opacity: animate ? (open ? 1 : 0) : 1,
          }}
          className="text-neutral-500 text-xs whitespace-pre ml-7"
        >
          {network}
        </motion.span>
      </div>
    );
  }

  return (
    <button
      onClick={connect}
      disabled={isConnecting}
      className="flex items-center gap-2 py-2 group/sidebar cursor-pointer disabled:opacity-50"
    >
      <IconWallet className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      <motion.span
        animate={{
          display: animate ? (open ? "inline-block" : "none") : "inline-block",
          opacity: animate ? (open ? 1 : 0) : 1,
        }}
        className="text-neutral-700 dark:text-neutral-200 text-sm whitespace-pre group-hover/sidebar:translate-x-1 transition duration-150"
      >
        {isConnecting ? "Connecting..." : "Connect Wallet"}
      </motion.span>
    </button>
  );
}

function Logo() {
  const { open, animate } = useSidebar();
  return (
    <Link
      href="/dashboard"
      className="flex items-center gap-2 py-1 relative z-20"
    >
      <img src="/icon.svg" alt="Logo" className="h-6 w-6" />
      <motion.span
        animate={{
          display: animate ? (open ? "inline-block" : "none") : "inline-block",
          opacity: animate ? (open ? 1 : 0) : 1,
        }}
        className="font-semibold text-black dark:text-white text-sm whitespace-pre"
      >
        Root14
      </motion.span>
    </Link>
  );
}

export function DashboardSidebar() {
  return (
    <Sidebar>
      <SidebarBody className="justify-between gap-10">
        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          <Logo />
          <div className="mt-8 flex flex-col gap-2">
            {sidebarLinks.map((link) => (
              <SidebarLink key={link.label} link={link} />
            ))}
          </div>
        </div>
        <div className="border-t border-neutral-200 dark:border-neutral-700 pt-4">
          <WalletButton />
        </div>
      </SidebarBody>
    </Sidebar>
  );
}
