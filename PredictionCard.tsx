import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Sprout, Leaf, Sun } from "lucide-react";

interface PredictionCardProps {
  growthStage: string;
  healthScore: number;
  recommendations: string[];
  nextHarvest?: string;
}

export function PredictionCard({
  growthStage,
  healthScore,
  recommendations,
  nextHarvest,
}: PredictionCardProps) {
  const getHealthColor = () => {
    if (healthScore >= 80) return "bg-success";
    if (healthScore >= 60) return "bg-warning";
    return "bg-destructive";
  };

  const getStageIcon = () => {
    switch (growthStage.toLowerCase()) {
      case "seedling":
        return <Sprout className="h-5 w-5" />;
      case "vegetative":
        return <Leaf className="h-5 w-5" />;
      case "flowering":
        return <Sun className="h-5 w-5" />;
      default:
        return <Sprout className="h-5 w-5" />;
    }
  };

  return (
    <Card className="bg-gradient-to-br from-accent/50 to-accent/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {getStageIcon()}
          Plant Growth Prediction
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Current Stage:</span>
            <Badge variant="secondary">{growthStage}</Badge>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Health Score:</span>
              <span className="text-sm font-bold">{healthScore}%</span>
            </div>
            <Progress 
              value={healthScore} 
              className="h-2"
            />
          </div>
        </div>

        {nextHarvest && (
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Next Harvest:</span>
            <Badge variant="outline">{nextHarvest}</Badge>
          </div>
        )}

        <div>
          <h4 className="text-sm font-medium mb-2">ML Recommendations:</h4>
          <ul className="space-y-1">
            {recommendations.map((rec, index) => (
              <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                <span className="text-primary">•</span>
                {rec}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}