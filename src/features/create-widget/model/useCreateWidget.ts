import { useMutation, useQueryClient } from "@tanstack/react-query";

import { widgetKeys, type Widget } from "@/entities/widget";
import { createWidget } from "../api/create-widget";

export function useCreateWidget() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createWidget,
    onSuccess: (createdWidget) => {
      queryClient.setQueryData<Widget[]>(widgetKeys.all, (widgets) =>
        [...(widgets ?? []), createdWidget].sort(
          (first, second) => first.position - second.position,
        ),
      );
    },
  });
}
