import type { WidgetType } from "@/entities/widget";

type ChartWidgetType = Exclude<WidgetType, "text">;

export type CreateWidgetRequest =
  | {
      type: ChartWidgetType;
      title: string;
    }
  | {
      type: "text";
      title: string;
      content: string;
    };
