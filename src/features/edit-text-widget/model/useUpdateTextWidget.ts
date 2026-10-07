import { useMutation, useQueryClient } from "@tanstack/react-query";

import { widgetKeys, type Widget } from "@/entities/widget";
import { updateTextWidget } from "../api/update-text-widget";

export function useUpdateTextWidget(widgetId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content: string) => updateTextWidget(widgetId, content),
    onSuccess: (updatedWidget) => {
      queryClient.setQueryData<Widget[]>(widgetKeys.all, (widgets) =>
        widgets?.map((widget) =>
          widget.id === updatedWidget.id ? updatedWidget : widget,
        ),
      );
    },
  });
}
