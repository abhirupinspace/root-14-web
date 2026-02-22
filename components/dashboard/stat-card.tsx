import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  loading?: boolean;
  className?: string;
}

export function StatCard({ label, value, icon, loading, className }: StatCardProps) {
  return (
    <Card className={cn("", className)}>
      <CardContent className="pt-0 space-y-1">
        <span className="text-foreground/40">{icon}</span>
        {loading ? (
          <Skeleton className="h-7 w-20" />
        ) : (
          <p className="stat-number text-2xl text-foreground">{value}</p>
        )}
        <p className="text-xs text-foreground/50">{label}</p>
      </CardContent>
    </Card>
  );
}
