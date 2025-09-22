import { useState, useEffect } from "react";

interface SensorReading {
  soilMoisture: number;
  humidity: number;
  temperature: number;
  lightIntensity: number;
  timestamp: string;
}

interface ChartData {
  time: string;
  value: number;
}

export function useSensorData() {
  const [currentData, setCurrentData] = useState<SensorReading>({
    soilMoisture: 65,
    humidity: 72,
    temperature: 24,
    lightIntensity: 85,
    timestamp: new Date().toISOString(),
  });

  const [chartData, setChartData] = useState<{
    soil: ChartData[];
    humidity: ChartData[];
    temperature: ChartData[];
    light: ChartData[];
  }>({
    soil: [],
    humidity: [],
    temperature: [],
    light: [],
  });

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeString = now.toLocaleTimeString([], { 
        hour: "2-digit", 
        minute: "2-digit" 
      });

      // Generate realistic sensor variations
      const newData: SensorReading = {
        soilMoisture: Math.max(0, Math.min(100, currentData.soilMoisture + (Math.random() - 0.5) * 5)),
        humidity: Math.max(0, Math.min(100, currentData.humidity + (Math.random() - 0.5) * 3)),
        temperature: Math.max(15, Math.min(35, currentData.temperature + (Math.random() - 0.5) * 2)),
        lightIntensity: Math.max(0, Math.min(100, currentData.lightIntensity + (Math.random() - 0.5) * 8)),
        timestamp: now.toISOString(),
      };

      setCurrentData(newData);

      // Update chart data (keep last 10 points)
      setChartData(prev => {
        const addPoint = (arr: ChartData[], value: number) => {
          const newArr = [...arr, { time: timeString, value: Math.round(value) }];
          return newArr.slice(-10); // Keep only last 10 points
        };

        return {
          soil: addPoint(prev.soil, newData.soilMoisture),
          humidity: addPoint(prev.humidity, newData.humidity),
          temperature: addPoint(prev.temperature, newData.temperature),
          light: addPoint(prev.light, newData.lightIntensity),
        };
      });
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, [currentData]);

  return { currentData, chartData };
}
