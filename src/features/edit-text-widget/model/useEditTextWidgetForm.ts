import { useState, type FormEvent } from "react";

import { useUpdateTextWidget } from "./useUpdateTextWidget";

type UseEditTextWidgetFormOptions = {
  widgetId: string;
  initialContent: string;
};

export function useEditTextWidgetForm({
  widgetId,
  initialContent,
}: UseEditTextWidgetFormOptions) {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState(initialContent);
  const updateWidget = useUpdateTextWidget(widgetId);

  function handleOpenChange(nextIsOpen: boolean): void {
    if (updateWidget.isPending) {
      return;
    }

    setIsOpen(nextIsOpen);
    updateWidget.reset();

    if (nextIsOpen) {
      setContent(initialContent);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    updateWidget.mutate(content, {
      onSuccess: () => setIsOpen(false),
    });
  }

  return {
    isOpen,
    content,
    error: updateWidget.error,
    isPending: updateWidget.isPending,
    hasChanges: content !== initialContent,
    setContent,
    handleOpenChange,
    handleSubmit,
  };
}
