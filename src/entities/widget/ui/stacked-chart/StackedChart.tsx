import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/Card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/shared/ui/Chart";
import type { StackedBarWidget } from "../../model/widget.types";
import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import { prepareStackedChartData } from "./prepare-stacked-chart-data";

type StackedChartProps = {
  widget: StackedBarWidget;
};

export function StackedChart({ widget }: StackedChartProps) {
  const { series, config } = prepareStackedChartData(widget.data.rows);

  if (widget.data.rows.length === 0 || series.length === 0) {
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
        <ChartContainer config={config} className="h-80 w-full">
          <RechartsBarChart
            data={widget.data.rows}
            margin={{ top: 8, right: 8, bottom: 8, left: 8 }}
          >
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              className="stroke-border"
            />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis tickLine={false} axisLine={false} width={48} />
            <ChartTooltip
              cursor={{ fill: "var(--muted)", fillOpacity: 0.35 }}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <ChartLegend content={<ChartLegendContent />} />

            {series.map((dataKey) => (
              <Bar
                key={dataKey}
                dataKey={dataKey}
                name={dataKey}
                stackId="total"
                fill={`var(--color-${dataKey})`}
                maxBarSize={72}
              />
            ))}
          </RechartsBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
