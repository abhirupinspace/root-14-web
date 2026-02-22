import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-16 text-center", className)}>
      <span className="text-foreground/20 mb-4">{icon}</span>
      <h3 className="text-sm font-semibold text-foreground/70">{title}</h3>
      <p className="mt-1 max-w-xs text-xs text-foreground/40">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
