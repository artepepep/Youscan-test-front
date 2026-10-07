import { API_URL } from "@/shared/config/api";
import { getApiErrorMessage } from "@/shared/lib/get-api-error-message";

async function readErrorResponse(response: Response): Promise<unknown> {
  try {
    return await response.json();
  } catch {
    return undefined;
  }
}

export async function deleteWidget(widgetId: string): Promise<void> {
  const response = await fetch(`${API_URL}/widgets/${widgetId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const data = await readErrorResponse(response);

    throw new Error(
      getApiErrorMessage(data, response.status, "Failed to delete widget"),
    );
  }
}
