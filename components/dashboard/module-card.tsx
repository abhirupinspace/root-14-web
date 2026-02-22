import { IconExternalLink } from "@tabler/icons-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { CopyButton } from "@/components/dashboard/copy-button";

interface ModuleCardProps {
  name: string;
  description: string;
  circuitId: string;
  constraintCount: string;
  vkStatus: "Testnet" | "Mainnet" | "Both";
  icon: React.ReactNode;
  comingSoon?: boolean;
}

export function ModuleCard({
  name,
  description,
  circuitId,
  constraintCount,
  vkStatus,
  icon,
  comingSoon,
}: ModuleCardProps) {
  const vkVariant = vkStatus === "Mainnet" || vkStatus === "Both" ? "success" : "warning";

  return (
    <Card>
      <CardHeader className="flex! flex-row items-start justify-between">
        <div className="flex items-center gap-3">
          <span className="text-foreground/40">{icon}</span>
          <div>
            <CardTitle className="text-sm font-medium">{name}</CardTitle>
            <p className="text-xs text-foreground/50 mt-0.5">{description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {comingSoon && <StatusBadge label="Coming Soon" variant="warning" />}
          <StatusBadge label={vkStatus} variant={vkVariant} />
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-foreground/40 mb-1">Circuit ID</p>
            <div className="flex items-center gap-1.5">
              <code className="text-xs font-mono text-foreground/70 truncate">{circuitId}</code>
              <CopyButton text={circuitId} className="h-6 w-6 shrink-0" />
            </div>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-foreground/40 mb-1">Constraints</p>
            <p className="text-xs font-mono text-foreground/70">{constraintCount}</p>
          </div>
        </div>

        <a
          href="https://root14-docs.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-foreground/40 hover:text-foreground/70 transition-colors"
        >
          <IconExternalLink className="h-3 w-3" />
          View docs
        </a>
      </CardContent>
    </Card>
  );
}
