import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SensorCardProps {
  title: string;
  value: number;
  unit: string;
  icon: LucideIcon;
  status: "optimal" | "warning" | "critical";
  trend: "up" | "down" | "stable";
  colorClass: string;
}

export function SensorCard({
  title,
  value,
  unit,
  icon: Icon,
  status,
  trend,
  colorClass,
}: SensorCardProps) {
  const getStatusColor = () => {
    switch (status) {
      case "optimal":
        return "bg-success text-success-foreground";
      case "warning":
        return "bg-warning text-warning-foreground";
      case "critical":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return "↗";
      case "down":
        return "↘";
      case "stable":
        return "→";
      default:
        return "→";
    }
  };

  return (
    <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className={cn("rounded-full p-2", colorClass)}>
          <Icon className="h-4 w-4 text-white" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold">
              {value}
              <span className="text-sm font-normal text-muted-foreground ml-1">
                {unit}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="outline" className={getStatusColor()}>
                {status}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {getTrendIcon()} {trend}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}