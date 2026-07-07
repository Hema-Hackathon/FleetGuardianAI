export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-IN").format(value);
}

export function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`;
}

export function riskColor(level: string): string {
  switch (level.toLowerCase()) {
    case "critical":
      return "#ef4444";
    case "high":
      return "#f97316";
    case "medium":
    case "at risk":
      return "#facc15";
    case "low":
    case "healthy":
      return "#22c55e";
    default:
      return "#38bdf8";
  }
}
