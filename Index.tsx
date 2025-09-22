import { Droplets, Thermometer, Sun, Sprout } from "lucide-react";
import { SensorCard } from "@/components/SensorCard";
import { SensorChart } from "@/components/SensorChart";
import { PredictionCard } from "@/components/PredictionCard";
import { useSensorData } from "@/hooks/useSensorData";

const Index = () => {
  const { currentData, chartData } = useSensorData();

  const getSensorStatus = (value: number, type: string) => {
    switch (type) {
      case "soil":
        if (value > 70) return "optimal";
        if (value > 40) return "warning";
        return "critical";
      case "humidity":
        if (value >= 60 && value <= 80) return "optimal";
        if (value >= 40 && value <= 90) return "warning";
        return "critical";
      case "temperature":
        if (value >= 20 && value <= 26) return "optimal";
        if (value >= 15 && value <= 30) return "warning";
        return "critical";
      case "light":
        if (value > 60) return "optimal";
        if (value > 30) return "warning";
        return "critical";
      default:
        return "optimal";
    }
  };

  const getTrend = () => "stable"; // Simplified for demo

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="bg-primary rounded-lg p-2">
              <Sprout className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Smart Agriculture IoT Dashboard
              </h1>
              <p className="text-muted-foreground">
                Real-time plant monitoring & growth prediction
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Sensor Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <SensorCard
            title="Soil Moisture"
            value={Math.round(currentData.soilMoisture)}
            unit="%"
            icon={Droplets}
            status={getSensorStatus(currentData.soilMoisture, "soil") as any}
            trend={getTrend() as any}
            colorClass="bg-moisture"
          />
          <SensorCard
            title="Humidity"
            value={Math.round(currentData.humidity)}
            unit="%"
            icon={Droplets}
            status={getSensorStatus(currentData.humidity, "humidity") as any}
            trend={getTrend() as any}
            colorClass="bg-info"
          />
          <SensorCard
            title="Temperature"
            value={Math.round(currentData.temperature)}
            unit="°C"
            icon={Thermometer}
            status={getSensorStatus(currentData.temperature, "temperature") as any}
            trend={getTrend() as any}
            colorClass="bg-temperature"
          />
          <SensorCard
            title="Light Intensity"
            value={Math.round(currentData.lightIntensity)}
            unit="%"
            icon={Sun}
            status={getSensorStatus(currentData.lightIntensity, "light") as any}
            trend={getTrend() as any}
            colorClass="bg-light"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <SensorChart
            title="Soil Moisture Trend"
            data={chartData.soil}
            color="hsl(var(--moisture))"
            unit="%"
          />
          <SensorChart
            title="Temperature Trend"
            data={chartData.temperature}
            color="hsl(var(--temperature))"
            unit="°C"
          />
          <SensorChart
            title="Humidity Trend"
            data={chartData.humidity}
            color="hsl(var(--info))"
            unit="%"
          />
          <SensorChart
            title="Light Intensity Trend"
            data={chartData.light}
            color="hsl(var(--light))"
            unit="%"
          />
        </div>

        {/* Prediction Card */}
        <div className="max-w-md mx-auto">
          <PredictionCard
            growthStage="Vegetative"
            healthScore={85}
            recommendations={[
              "Increase watering frequency by 15%",
              "Monitor temperature during night hours",
              "Consider adding nutrient solution",
              "Optimal light exposure maintained"
            ]}
            nextHarvest="3-4 weeks"
          />
        </div>
      </main>
    </div>
  );
};

export default Index;