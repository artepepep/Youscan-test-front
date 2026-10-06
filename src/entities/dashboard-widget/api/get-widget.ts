import { API_URL } from "@/shared/config/api";
import type { LineChartWidgetData } from "../model/dashboard-widget.types";

export async function getWidget(
  widgetId: string,
): Promise<LineChartWidgetData> {
  const response = await fetch(`${API_URL}/widgets/${widgetId}`);

  if (!response.ok) {
    throw new Error(`Failed to load widget: ${response.status}`);
  }

  const data: unknown = await response.json();

  return data as LineChartWidgetData;
}
