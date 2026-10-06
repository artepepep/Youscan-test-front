export type LineChartPoint = {
  label: string;
  value: number;
};

export type LineChartWidgetData = {
  id: string;
  type: "line";
  title: string;
  description?: string;
  data: LineChartPoint[];
};
