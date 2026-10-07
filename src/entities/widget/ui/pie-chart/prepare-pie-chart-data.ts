import type { ChartConfig } from "@/shared/ui/Chart";
import type { ChartRow } from "../../model/widget.types";
import { getPieSliceColor } from "./pie-chart-colors";

const PERCENT_FORMATTER = new Intl.NumberFormat(undefined, {
  style: "percent",
  maximumFractionDigits: 1,
});

type PieChartDatum = ChartRow & {
  fill: string;
  value: number;
  percentage: string;
};

export function preparePieChartData(rows: ChartRow[]) {
  const values = rows.map((row) =>
    typeof row.value === "number" ? row.value : 0,
  );
  const total = values.reduce((sum, value) => sum + value, 0);
  const data: PieChartDatum[] = rows.map((row, index) => ({
    ...row,
    value: values[index] ?? 0,
    fill: getPieSliceColor(index),
    percentage: PERCENT_FORMATTER.format(
      total > 0 ? (values[index] ?? 0) / total : 0,
    ),
  }));
  const config: ChartConfig = Object.fromEntries(
    data.map((row) => [row.label, { label: row.label }]),
  );

  return { data, total, config };
}
