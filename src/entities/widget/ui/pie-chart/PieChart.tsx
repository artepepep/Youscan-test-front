import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/Card";
import type { PieWidget } from "../../model/widget.types";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/shared/ui/Chart";

import { Pie, PieChart as RechartsPieChart } from "recharts";
import { CustomSector } from "./CustomSector";
import { preparePieChartData } from "./prepare-pie-chart-data";

type PieChartProps = {
  widget: PieWidget;
};

export function PieChart({ widget }: PieChartProps) {
  const { data, total, config } = preparePieChartData(widget.data.rows);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{widget.title}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <ChartContainer config={config} className="h-72 w-full">
          <RechartsPieChart>
            <ChartTooltip
              content={<ChartTooltipContent label={widget.title} />}
            />
            <Pie
              data={data}
              dataKey="value"
              nameKey="label"
              innerRadius={60}
              outerRadius={100}
              shape={CustomSector}
              label={({ name, value }) => String(`${name}, ${value}`)}
              labelLine={false}
            />
            <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">
              <tspan
                x="50%"
                dy="-0.35em"
                className="fill-foreground text-xl font-semibold"
              >
                {total.toLocaleString()}
              </tspan>
              <tspan
                x="50%"
                dy="1.5em"
                className="fill-muted-foreground text-xs"
              >
                Total
              </tspan>
            </text>
          </RechartsPieChart>
        </ChartContainer>

        <ul className="grid gap-2 sm:grid-cols-2">
          {data.map((row, index) => (
            <li
              key={`${row.label}-${index}`}
              className="flex items-center justify-between gap-3 rounded-lg border border-border/60 bg-muted/30 px-3 py-2 text-sm"
            >
              <span className="flex min-w-0 items-center gap-2">
                <span
                  className="size-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: row.fill }}
                />
                <span className="truncate text-muted-foreground">
                  {row.label}
                </span>
              </span>
              <span className="font-medium tabular-nums">{row.percentage}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
