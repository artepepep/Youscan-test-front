import { isRecord } from "@/shared/lib/is-record";
import type { ChartData, ChartRow, Widget } from "../model/widget.types";

function parseChartData(value: unknown): ChartData {
  if (!isRecord(value) || !Array.isArray(value.rows)) {
    throw new Error("Invalid widget chart data");
  }

  const rows = value.rows.map((value): ChartRow => {
    if (!isRecord(value) || typeof value.label !== "string") {
      throw new Error("Invalid widget chart row");
    }

    const row: ChartRow = { label: value.label };

    for (const [key, cell] of Object.entries(value)) {
      if (typeof cell === "string" || typeof cell === "number") {
        row[key] = cell;
      }
    }

    return row;
  });

  return { rows };
}

export function parseWidgetResponse(value: unknown): Widget {
  if (
    !isRecord(value) ||
    typeof value.id !== "string" ||
    typeof value.title !== "string" ||
    typeof value.position !== "number" ||
    typeof value.createdAt !== "string" ||
    typeof value.updatedAt !== "string"
  ) {
    throw new Error("Invalid widget response");
  }

  const common = {
    id: value.id,
    title: value.title,
    position: value.position,
    createdAt: value.createdAt,
    updatedAt: value.updatedAt,
  };

  switch (value.type) {
    case "line":
    case "bar":
    case "stacked-bar":
    case "pie":
      return { ...common, type: value.type, data: parseChartData(value.data) };
    case "text":
      if (!isRecord(value.data) || typeof value.data.content !== "string") {
        throw new Error("Invalid text widget data");
      }

      return {
        ...common,
        type: value.type,
        data: { content: value.data.content },
      };
    default:
      throw new Error("Unsupported widget type");
  }
}

export function parseWidgetsResponse(value: unknown): Widget[] {
  if (!Array.isArray(value)) {
    throw new Error("Invalid widgets response");
  }

  return value.map(parseWidgetResponse);
}
