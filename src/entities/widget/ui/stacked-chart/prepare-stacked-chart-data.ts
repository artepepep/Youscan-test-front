import type { ChartConfig } from "@/shared/ui/Chart";
import type { ChartRow } from "../../model/widget.types";

const STACKED_CHART_COLORS = [
  "#34d399",
  "#fbbf24",
  "#fb7185",
  "#38bdf8",
  "#a78bfa",
] as const;

export function prepareStackedChartData(rows: ChartRow[]) {
  const series = new Set<string>();

  for (const row of rows) {
    for (const [key, value] of Object.entries(row)) {
      if (key !== "label" && typeof value === "number") {
        series.add(key);
      }
    }
  }

  const seriesNames = Array.from(series);
  const config: ChartConfig = Object.fromEntries(
    seriesNames.map((name, index) => [
      name,
      {
        label: name,
        color: STACKED_CHART_COLORS[index % STACKED_CHART_COLORS.length],
      },
    ]),
  );

  return { series: seriesNames, config };
}
