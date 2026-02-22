"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { ProjectHeader } from "@/components/dashboard/project-header";
import { useWallet } from "@/contexts/wallet-context";
import {
  IconSettings,
  IconSun,
  IconMoon,
  IconDeviceDesktop,
  IconBell,
  IconAlertTriangle,
} from "@tabler/icons-react";

type Theme = "light" | "dark" | "system";

function usePersistedState<T extends string>(key: string, fallback: T): [T, (v: T) => void] {
  const [value, setValue] = useState<T>(fallback);

  useEffect(() => {
    const stored = localStorage.getItem(key) as T | null;
    if (stored) setValue(stored);
  }, [key]);

  function set(v: T) {
    setValue(v);
    localStorage.setItem(key, v);
  }

  return [value, set];
}

export default function GlobalSettingsPage() {
  const { address, network, disconnect } = useWallet();
  const [theme, setTheme] = usePersistedState<Theme>("r14_theme", "light");
  const [notifyProofs, setNotifyProofs] = useState(true);
  const [notifyStatus, setNotifyStatus] = useState(true);
  const [resetOpen, setResetOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("dark");
    if (theme === "dark") {
      root.classList.add("dark");
    } else if (theme === "system") {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        root.classList.add("dark");
      }
    }
  }, [theme]);

  useEffect(() => {
    const stored = localStorage.getItem("r14_notifications");
    if (stored) {
      const parsed = JSON.parse(stored);
      setNotifyProofs(parsed.proofs ?? true);
      setNotifyStatus(parsed.status ?? true);
    }
  }, []);

  function saveNotifications(proofs: boolean, status: boolean) {
    setNotifyProofs(proofs);
    setNotifyStatus(status);
    localStorage.setItem("r14_notifications", JSON.stringify({ proofs, status }));
  }

  function handleReset() {
    disconnect();
    localStorage.removeItem("r14_wallet");
    setResetOpen(false);
  }

  const themeOptions: { value: Theme; label: string; icon: React.ReactNode }[] = [
    { value: "light", label: "Light", icon: <IconSun className="h-4 w-4" /> },
    { value: "dark", label: "Dark", icon: <IconMoon className="h-4 w-4" /> },
    { value: "system", label: "System", icon: <IconDeviceDesktop className="h-4 w-4" /> },
  ];

  return (
    <div className="space-y-8">
      <ProjectHeader title="Global Settings" description="Manage your preferences." />

      {/* Theme */}
      <Card>
        <CardHeader className="flex! flex-row items-center gap-2">
          <IconSettings className="h-4 w-4 text-foreground/50" />
          <CardTitle className="text-sm font-medium">Theme</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-3">
            {themeOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setTheme(opt.value)}
                className={`cursor-pointer flex items-center gap-2 rounded-lg border p-3 transition-all ${
                  theme === opt.value
                    ? "border-foreground/30 bg-muted"
                    : "border-border/40 hover:border-border/60"
                }`}
              >
                <span className="text-foreground/50">{opt.icon}</span>
                <span className="text-xs font-medium text-foreground">{opt.label}</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader className="flex! flex-row items-center gap-2">
          <IconBell className="h-4 w-4 text-foreground/50" />
          <CardTitle className="text-sm font-medium">Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Proof Verifications</p>
                <p className="text-xs text-foreground/40">Notify on new proof events</p>
              </div>
              <Switch
                checked={notifyProofs}
                onCheckedChange={(v) => saveNotifications(v, notifyStatus)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Status Alerts</p>
                <p className="text-xs text-foreground/40">Indexer health & downtime alerts</p>
              </div>
              <Switch
                checked={notifyStatus}
                onCheckedChange={(v) => saveNotifications(notifyProofs, v)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Wallet */}
      {address && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Wallet</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <code className="text-xs font-mono text-foreground/60">{address}</code>
                <p className="text-xs text-foreground/40 mt-0.5">{network}</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => setResetOpen(true)}>
                Disconnect
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Danger Zone */}
      <Card className="border-red-200/60">
        <CardHeader className="flex! flex-row items-center gap-2">
          <IconAlertTriangle className="h-4 w-4 text-red-500" />
          <CardTitle className="text-sm font-medium text-red-600">Danger Zone</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-foreground/50 mb-3">
            Disconnect your wallet and clear all local data.
          </p>
          <Button variant="destructive" size="sm" onClick={() => setResetOpen(true)}>
            Reset Wallet
          </Button>
        </CardContent>
      </Card>

      <ConfirmDialog
        open={resetOpen}
        onOpenChange={setResetOpen}
        title="Reset Wallet"
        description="This will disconnect your wallet and clear all local preferences. You can reconnect anytime."
        confirmLabel="Reset"
        variant="danger"
        onConfirm={handleReset}
      />
    </div>
  );
}
