import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  trend?: string;
  className?: string;
}

export function StatCard({ label, value, icon, trend, className }: StatCardProps) {
  return (
    <Card className={cn("flex-1 min-w-[160px]", className)}>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between mb-3">
          <span className="text-foreground/40">{icon}</span>
          {trend && (
            <span className="text-xs font-medium text-emerald-500">{trend}</span>
          )}
        </div>
        <div className="stat-number text-2xl font-semibold text-foreground">{value}</div>
        <p className="text-xs text-foreground/50 mt-1">{label}</p>
      </CardContent>
    </Card>
  );
}
