export type WidgetType = "line" | "bar" | "stacked-bar" | "pie" | "text";

export type ChartRow = {
  label: string;
  [series: string]: string | number;
};

export type ChartData = {
  rows: ChartRow[];
};

export type TextData = {
  content: string;
};

type WidgetBase<TType extends WidgetType, TData> = {
  id: string;
  type: TType;
  title: string;
  data: TData;
  position: number;
  createdAt: string;
  updatedAt: string;
};

export type LineWidget = WidgetBase<"line", ChartData>;
export type BarWidget = WidgetBase<"bar", ChartData>;
export type StackedBarWidget = WidgetBase<"stacked-bar", ChartData>;
export type PieWidget = WidgetBase<"pie", ChartData>;
export type TextWidget = WidgetBase<"text", TextData>;

export type Widget =
  | LineWidget
  | BarWidget
  | StackedBarWidget
  | PieWidget
  | TextWidget;
