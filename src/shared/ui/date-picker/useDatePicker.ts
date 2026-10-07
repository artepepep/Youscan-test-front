import { useState } from "react";

type UseDatePickerOptions = {
  value: string;
  minDate: string;
  maxDate: string;
  onValueChange: (value: string) => void;
};

export type CalendarDay = {
  date: Date;
  value: string;
  selectable: boolean;
  selected: boolean;
};

function parseDate(value: string): Date {
  return new Date(`${value}T00:00:00Z`);
}

function toIsoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function startOfMonth(date: Date): Date {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1));
}

function addMonths(date: Date, amount: number): Date {
  return new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + amount, 1),
  );
}

function monthIndex(date: Date): number {
  return date.getUTCFullYear() * 12 + date.getUTCMonth();
}

function getCalendarDays(
  month: Date,
  minDate: string,
  maxDate: string,
  selectedValue: string,
): Array<CalendarDay | undefined> {
  const year = month.getUTCFullYear();
  const monthNumber = month.getUTCMonth();
  const firstWeekday =
    (new Date(Date.UTC(year, monthNumber, 1)).getUTCDay() + 6) % 7;
  const daysInMonth = new Date(
    Date.UTC(year, monthNumber + 1, 0),
  ).getUTCDate();
  const days: Array<CalendarDay | undefined> = Array.from({
    length: firstWeekday,
  });

  for (let day = 1; day <= daysInMonth; day += 1) {
    const date = new Date(Date.UTC(year, monthNumber, day));
    const dateValue = toIsoDate(date);

    days.push({
      date,
      value: dateValue,
      selectable: dateValue >= minDate && dateValue <= maxDate,
      selected: dateValue === selectedValue,
    });
  }

  while (days.length % 7 !== 0) {
    days.push(undefined);
  }

  return days;
}

export function useDatePicker({
  value,
  minDate,
  maxDate,
  onValueChange,
}: UseDatePickerOptions) {
  const [open, setOpen] = useState(false);
  const [visibleMonth, setVisibleMonth] = useState(() =>
    startOfMonth(parseDate(value)),
  );
  const calendarDays = getCalendarDays(
    visibleMonth,
    minDate,
    maxDate,
    value,
  );
  const canGoToPreviousMonth =
    monthIndex(visibleMonth) > monthIndex(startOfMonth(parseDate(minDate)));
  const canGoToNextMonth =
    monthIndex(visibleMonth) < monthIndex(startOfMonth(parseDate(maxDate)));

  function showSelectedMonth(): void {
    setVisibleMonth(startOfMonth(parseDate(value)));
  }

  function showPreviousMonth(): void {
    setVisibleMonth((month) => addMonths(month, -1));
  }

  function showNextMonth(): void {
    setVisibleMonth((month) => addMonths(month, 1));
  }

  function selectDate(date: string): void {
    onValueChange(date);
    setOpen(false);
  }

  return {
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
    selectedDate: parseDate(value),
  };
}
