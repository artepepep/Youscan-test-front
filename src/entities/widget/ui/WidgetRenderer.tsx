import { assertNever } from "@/shared/lib/assert-never";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/Card";
import type { Widget } from "../model/widget.types";
import { LineChart } from "./line-chart/LineChart";
import { PieChart } from "./pie-chart/PieChart";
import { StackedChart } from "./stacked-chart/StackedChart";
import { TextWidget } from "./text-widget/TextWidget";

type WidgetRendererProps = {
  widget: Widget;
};

export function WidgetRenderer({ widget }: WidgetRendererProps) {
  switch (widget.type) {
    case "line":
      return <LineChart widget={widget} />;
    case "text":
      return <TextWidget widget={widget} />;
    case "pie":
      return <PieChart widget={widget} />;
    case "stacked-bar":
      return <StackedChart widget={widget} />;
    case "bar":
      return (
        <Card>
          <CardHeader>
            <CardTitle>{widget.title}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            The {widget.type} renderer is not implemented yet.
          </CardContent>
        </Card>
      );
    default:
      return assertNever(widget, "Unsupported widget");
  }
}
