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

const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

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

function isIsoDate(value: string): boolean {
  if (!ISO_DATE_PATTERN.test(value)) {
    return false;
  }

  const date = new Date(`${value}T00:00:00Z`);
  return (
    !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value
  );
}

function getChartMetadata(rows: ChartRow[]) {
  const labels = new Set<string>();
  const series = new Set<string>();

  for (const row of rows) {
    labels.add(row.label);

    for (const [key, value] of Object.entries(row)) {
      if (key !== "label" && typeof value === "number") {
        series.add(key);
      }
    }
  }

  const chartLabels = Array.from(labels);
  const dates = chartLabels.every(isIsoDate) ? chartLabels.sort() : [];
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

  return { dates, series: seriesNames, chartConfig };
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
  const hasDateRange = dates.length > 0;
  const from = isDateInRange(selection.from, firstDate, lastDate)
    ? selection.from
    : firstDate;
  const to = isDateInRange(selection.to, from, lastDate)
    ? selection.to
    : lastDate;
  const displayedRows = useMemo(
    () =>
      hasDateRange
        ? rows.filter((row) => row.label >= from && row.label <= to)
        : rows,
    [from, hasDateRange, rows, to],
  );

  const dateRange: LineChartDateRange | undefined = hasDateRange
    ? {
        from,
        to,
        min: firstDate,
        max: lastDate,
        isFullRange: from === firstDate && to === lastDate,
        setFrom: (date) =>
          setSelection((current) => ({ ...current, from: date })),
        setTo: (date) =>
          setSelection((current) => ({ ...current, to: date })),
        reset: () => setSelection({}),
      }
    : undefined;

  return { displayedRows, series, chartConfig, dateRange };
}
