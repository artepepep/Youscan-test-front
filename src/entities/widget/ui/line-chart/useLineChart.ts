import { useMemo, useState } from "react";

import type { ChartConfig } from "@/shared/ui/Chart";
import type { ChartRow } from "../../model/widget.types";

const LINE_COLORS = [
  "#38bdf8",
  "#a78bfa",
  "#34d399",
  "#fbbf24",
  "#fb7185",
] as const;

type DateRangeSelection = {
  from?: string;
  to?: string;
};

export type LineChartDateRange = {
  from: string;
  to: string;
  min: string;
  max: string;
  isFullRange: boolean;
  setFrom: (date: string) => void;
  setTo: (date: string) => void;
  reset: () => void;
};

function getChartMetadata(rows: ChartRow[]) {
  const dates = new Set<string>();
  const series = new Set<string>();

  for (const row of rows) {
    dates.add(row.label);

    for (const [key, value] of Object.entries(row)) {
      if (key !== "label" && typeof value === "number") {
        series.add(key);
      }
    }
  }

  const sortedDates = Array.from(dates).sort();
  const seriesNames = Array.from(series);
  const chartConfig: ChartConfig = Object.fromEntries(
    seriesNames.map((name, index) => [
      name,
      {
        label: name,
        color: LINE_COLORS[index % LINE_COLORS.length],
      },
    ]),
  );

  return { dates: sortedDates, series: seriesNames, chartConfig };
}

function isDateInRange(
  date: string | undefined,
  min: string,
  max: string,
): date is string {
  return date !== undefined && date >= min && date <= max;
}

export function useLineChart(rows: ChartRow[]) {
  const { dates, series, chartConfig } = useMemo(
    () => getChartMetadata(rows),
    [rows],
  );
  const [selection, setSelection] = useState<DateRangeSelection>({});
  const firstDate = dates[0] ?? "";
  const lastDate = dates.at(-1) ?? "";
  const from = isDateInRange(selection.from, firstDate, lastDate)
    ? selection.from
    : firstDate;
  const to = isDateInRange(selection.to, from, lastDate)
    ? selection.to
    : lastDate;
  const displayedRows = useMemo(
    () => rows.filter((row) => row.label >= from && row.label <= to),
    [from, rows, to],
  );

  const dateRange: LineChartDateRange = {
    from,
    to,
    min: firstDate,
    max: lastDate,
    isFullRange: from === firstDate && to === lastDate,
    setFrom: (date) => setSelection((current) => ({ ...current, from: date })),
    setTo: (date) => setSelection((current) => ({ ...current, to: date })),
    reset: () => setSelection({}),
  };

  return { displayedRows, series, chartConfig, dateRange };
}
