import { parseWidgetResponse, type TextWidget } from "@/entities/widget";
import { API_URL } from "@/shared/config/api";
import { getApiErrorMessage } from "@/shared/lib/get-api-error-message";

export async function updateTextWidget(
  widgetId: string,
  content: string,
): Promise<TextWidget> {
  const response = await fetch(`${API_URL}/widgets/${widgetId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });
  const data: unknown = await response.json();

  if (!response.ok) {
    throw new Error(
      getApiErrorMessage(data, response.status, "Failed to update widget"),
    );
  }

  const widget = parseWidgetResponse(data);

  if (widget.type !== "text") {
    throw new Error("Invalid text widget response");
  }

  return widget;
}
