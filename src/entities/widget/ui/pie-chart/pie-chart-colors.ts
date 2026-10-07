const PIE_COLORS = [
  "#38bdf8",
  "#a78bfa",
  "#34d399",
  "#fbbf24",
  "#fb7185",
] as const;

export function getPieSliceColor(index: number): string {
  return PIE_COLORS[index % PIE_COLORS.length];
}
