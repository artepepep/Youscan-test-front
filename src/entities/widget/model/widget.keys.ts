export const widgetKeys = {
  all: ["widgets"] as const,
  detail: (widgetId: string) => ["widgets", widgetId] as const,
};
