import { useQuery } from "@tanstack/react-query";

import { getWidget } from "../api/get-widget";

export function useWidget(widgetId: string) {
  return useQuery({
    queryKey: ["dashboard-widget", widgetId],
    queryFn: () => getWidget(widgetId),
  });
}
