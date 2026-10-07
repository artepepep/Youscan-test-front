import { API_URL } from "@/shared/config/api";
import { parseWidgets } from "../get-widgets/parse-widgets";
import type { Widget } from "../../model/widget.types";

export async function getWidgets(): Promise<Widget[]> {
  const response = await fetch(`${API_URL}/widgets`);

  if (!response.ok) {
    throw new Error(`Failed to load widgets: ${response.status}`);
  }

  const data: unknown = await response.json();
  return parseWidgets(data);
}
