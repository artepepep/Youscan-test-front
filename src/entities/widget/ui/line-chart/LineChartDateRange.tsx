import { RotateCcwIcon } from "lucide-react";

import { Button } from "@/shared/ui/Button";
import { DatePicker } from "@/shared/ui/date-picker";
import { Label } from "@/shared/ui/Label";
import type { LineChartDateRange as DateRange } from "./useLineChart";

type DateRangeProps = {
  widgetId: string;
  range: DateRange;
};

export function LineChartDateRange({ widgetId, range }: DateRangeProps) {
  return (
    <div className="mb-4 flex flex-wrap items-end gap-3 rounded-xl border border-border/60 bg-muted/30 p-3">
      <div className="grid gap-1.5">
        <Label
          htmlFor={`${widgetId}-from-date`}
          className="text-xs text-muted-foreground"
        >
          From
        </Label>
        <DatePicker
          id={`${widgetId}-from-date`}
          value={range.from}
          minDate={range.min}
          maxDate={range.to}
          onValueChange={range.setFrom}
        />
      </div>

      <div className="grid gap-1.5">
        <Label
          htmlFor={`${widgetId}-to-date`}
          className="text-xs text-muted-foreground"
        >
          To
        </Label>
        <DatePicker
          id={`${widgetId}-to-date`}
          value={range.to}
          minDate={range.from}
          maxDate={range.max}
          onValueChange={range.setTo}
        />
      </div>

      <Button
        type="button"
        variant="outline"
        disabled={range.isFullRange}
        onClick={range.reset}
      >
        <RotateCcwIcon />
        Reset
      </Button>
    </div>
  );
}
