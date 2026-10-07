import { isRecord } from "./is-record";

export function getApiErrorMessage(
  value: unknown,
  status: number,
  fallback: string,
): string {
  if (isRecord(value)) {
    if (typeof value.message === "string") {
      return value.message;
    }

    if (
      Array.isArray(value.message) &&
      value.message.every((message) => typeof message === "string")
    ) {
      return value.message.join(". ");
    }
  }

  return `${fallback}: ${status}`;
}
