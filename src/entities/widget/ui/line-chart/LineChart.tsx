import {
  CartesianGrid,
  Line,
  LineChart as RechartsLineChart,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/ui/Card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/shared/ui/Chart";
import type { LineWidget } from "../../model/widget.types";
import { LineChartDateRange } from "./LineChartDateRange";
import { useLineChart } from "./useLineChart";

type LineChartProps = {
  widget: LineWidget;
};

export function LineChart({ widget }: LineChartProps) {
  const { displayedRows, series, chartConfig, dateRange } = useLineChart(
    widget.data.rows,
  );

  if (widget.data.rows.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{widget.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex h-72 items-center justify-center text-sm text-muted-foreground">
          No chart data available.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{widget.title}</CardTitle>
      </CardHeader>

      <CardContent>
        <LineChartDateRange widgetId={widget.id} range={dateRange} />

        <ChartContainer config={chartConfig} className="h-72 w-full">
          <RechartsLineChart
            data={displayedRows}
            margin={{
              top: 8,
              right: 8,
              bottom: 8,
              left: 8,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />

            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              minTickGap={40}
              className="text-xs"
            />

            <YAxis tickLine={false} axisLine={false} className="text-xs" />

            <ChartTooltip
              cursor={{ stroke: "var(--border)", strokeDasharray: "4 4" }}
              content={<ChartTooltipContent indicator="line" />}
            />
            <ChartLegend content={<ChartLegendContent />} />

            {series.map((dataKey) => (
              <Line
                key={dataKey}
                type="monotone"
                dataKey={dataKey}
                name={dataKey}
                stroke={`var(--color-${dataKey})`}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }}
                connectNulls
              />
            ))}
          </RechartsLineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
