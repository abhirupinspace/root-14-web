import { IconExternalLink } from "@tabler/icons-react";
import { CopyButton } from "@/components/dashboard/copy-button";
import { StatusBadge } from "@/components/dashboard/status-badge";

interface ContractRowProps {
  name: string;
  address: string;
  network: "Testnet" | "Mainnet";
  explorerUrl: string;
}

export function ContractRow({ name, address, network, explorerUrl }: ContractRowProps) {
  const truncated = `${address.slice(0, 8)}...${address.slice(-6)}`;
  const variant = network === "Mainnet" ? "success" : "warning";

  return (
    <div className="flex items-center gap-3 p-3 rounded-xl border border-border/60 hover:bg-off-white transition-colors">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground">{name}</p>
        <div className="flex items-center gap-1.5 mt-0.5">
          <code className="text-xs font-mono text-foreground/50 truncate">{truncated}</code>
          <CopyButton text={address} className="h-5 w-5 shrink-0" />
        </div>
      </div>
      <StatusBadge label={network} variant={variant} />
      <a
        href={explorerUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center h-8 w-8 rounded-lg border border-border/60 text-foreground/40 hover:text-foreground/70 hover:bg-off-white transition-all"
        title="View on explorer"
      >
        <IconExternalLink className="h-3.5 w-3.5" />
      </a>
    </div>
  );
}
