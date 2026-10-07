import { useMutation, useQueryClient } from "@tanstack/react-query";

import { widgetKeys, type Widget } from "@/entities/widget";
import { deleteWidget } from "../api/delete-widget";

export function useDeleteWidget(widgetId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteWidget(widgetId),
    onSuccess: () => {
      queryClient.setQueryData<Widget[]>(widgetKeys.all, (widgets) =>
        widgets?.filter((widget) => widget.id !== widgetId),
      );
    },
  });
}
