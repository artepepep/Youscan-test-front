import { useQuery } from "@tanstack/react-query";

import { getWidgets } from "../api/get-widgets";
import { widgetKeys } from "./widget.keys";

export function useWidgets() {
  return useQuery({
    queryKey: widgetKeys.all,
    queryFn: getWidgets,
  });
}
