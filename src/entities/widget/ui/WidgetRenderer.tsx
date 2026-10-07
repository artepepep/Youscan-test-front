import { assertNever } from "@/shared/lib/assert-never";
import type { Widget } from "../model/widget.types";
import { BarChart } from "./bar-chart/BarChart";
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
      return <BarChart widget={widget} />;
    default:
      return assertNever(widget, "Unsupported widget");
  }
}
