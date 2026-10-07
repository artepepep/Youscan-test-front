import { parseWidgetResponse, type Widget } from "@/entities/widget";
import { API_URL } from "@/shared/config/api";
import { getApiErrorMessage } from "@/shared/lib/get-api-error-message";
import type { CreateWidgetRequest } from "../model/create-widget.types";

export async function createWidget(
  request: CreateWidgetRequest,
): Promise<Widget> {
  const title = request.title.trim();
  const response = await fetch(`${API_URL}/widgets`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: request.type,
      ...(title && { title }),
      ...(request.type === "text" && { content: request.content }),
    }),
  });
  const data: unknown = await response.json();

  if (!response.ok) {
    throw new Error(
      getApiErrorMessage(data, response.status, "Failed to create widget"),
    );
  }

  return parseWidgetResponse(data);
}
