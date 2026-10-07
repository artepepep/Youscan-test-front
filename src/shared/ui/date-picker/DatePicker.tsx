import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import {
  CalendarDaysIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/Button";
import { useDatePicker } from "./useDatePicker";

const DATE_FORMATTER = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});
const MONTH_FORMATTER = new Intl.DateTimeFormat("en-GB", {
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});
const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

type DatePickerProps = {
  id?: string;
  value: string;
  minDate: string;
  maxDate: string;
  onValueChange: (value: string) => void;
  className?: string;
};

export function DatePicker({
  id,
  value,
  minDate,
  maxDate,
  onValueChange,
  className,
}: DatePickerProps) {
  const {
    open,
    setOpen,
    visibleMonth,
    calendarDays,
    canGoToPreviousMonth,
    canGoToNextMonth,
    showSelectedMonth,
    showPreviousMonth,
    showNextMonth,
    selectDate,
    selectedDate,
  } = useDatePicker({ value, minDate, maxDate, onValueChange });

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <PopoverPrimitive.Trigger
        id={id}
        render={<Button type="button" variant="outline" />}
        className={cn("w-44 justify-start font-normal", className)}
        onClick={showSelectedMonth}
      >
        <CalendarDaysIcon className="text-muted-foreground" />
        {DATE_FORMATTER.format(selectedDate)}
      </PopoverPrimitive.Trigger>

      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Positioner
          side="bottom"
          align="start"
          sideOffset={6}
          className="isolate z-50"
        >
          <PopoverPrimitive.Popup className="w-72 rounded-xl bg-popover p-3 text-popover-foreground shadow-xl ring-1 ring-foreground/10 outline-none duration-100 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95">
            <div className="mb-3 flex items-center justify-between">
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                disabled={!canGoToPreviousMonth}
                aria-label="Previous month"
                onClick={showPreviousMonth}
              >
                <ChevronLeftIcon />
              </Button>

              <div className="font-heading text-sm font-medium capitalize">
                {MONTH_FORMATTER.format(visibleMonth)}
              </div>

              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                disabled={!canGoToNextMonth}
                aria-label="Next month"
                onClick={showNextMonth}
              >
                <ChevronRightIcon />
              </Button>
            </div>

            <div className="grid grid-cols-7 gap-1">
              {WEEKDAYS.map((weekday) => (
                <div
                  key={weekday}
                  className="flex size-8 items-center justify-center text-[0.7rem] font-medium text-muted-foreground"
                >
                  {weekday}
                </div>
              ))}

              {calendarDays.map((day, index) => {
                if (!day) {
                  return <div key={`empty-${index}`} className="size-8" />;
                }

                return (
                  <button
                    key={day.value}
                    type="button"
                    disabled={!day.selectable}
                    aria-label={DATE_FORMATTER.format(day.date)}
                    aria-pressed={day.selected}
                    className={cn(
                      "flex size-8 items-center justify-center rounded-lg text-sm transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      day.selectable &&
                        !day.selected &&
                        "hover:bg-accent hover:text-accent-foreground",
                      day.selected && "bg-primary text-primary-foreground",
                      !day.selectable && "text-muted-foreground/35",
                    )}
                    onClick={() => selectDate(day.value)}
                  >
                    {day.date.getUTCDate()}
                  </button>
                );
              })}
            </div>
          </PopoverPrimitive.Popup>
        </PopoverPrimitive.Positioner>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}
