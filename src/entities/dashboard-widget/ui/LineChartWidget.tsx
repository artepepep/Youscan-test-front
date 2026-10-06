import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import type { LineChartWidgetData } from "../model/dashboard-widget.types";

type LineChartWidgetProps = {
  widget: LineChartWidgetData;
};

export function LineChartWidget({ widget }: LineChartWidgetProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{widget.title}</CardTitle>

        {widget.description && (
          <CardDescription>{widget.description}</CardDescription>
        )}
      </CardHeader>

      <CardContent>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={widget.data}
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
                className="text-xs"
              />

              <YAxis tickLine={false} axisLine={false} className="text-xs" />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="value"
                stroke="var(--chart-1)"
                strokeWidth={2}
                dot={{
                  fill: "var(--chart-1)",
                }}
                activeDot={{
                  r: 6,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
