import { useState, type FormEvent } from "react";

import type { WidgetType } from "@/entities/widget";
import type { CreateWidgetRequest } from "./create-widget.types";
import { useCreateWidget } from "./useCreateWidget";

const INITIAL_WIDGET_TYPE: WidgetType = "line";

export function useCreateWidgetForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState<WidgetType>(INITIAL_WIDGET_TYPE);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const createWidget = useCreateWidget();

  function resetForm(): void {
    setType(INITIAL_WIDGET_TYPE);
    setTitle("");
    setContent("");
  }

  function handleOpenChange(nextIsOpen: boolean): void {
    if (createWidget.isPending) {
      return;
    }

    setIsOpen(nextIsOpen);
    createWidget.reset();

    if (!nextIsOpen) {
      resetForm();
    }
  }

  function handleTypeChange(nextType: WidgetType | null): void {
    if (nextType) {
      setType(nextType);
      createWidget.reset();
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    const request: CreateWidgetRequest =
      type === "text"
        ? { type, title, content }
        : { type, title };

    createWidget.mutate(request, {
      onSuccess: () => {
        resetForm();
        setIsOpen(false);
      },
    });
  }

  return {
    isOpen,
    type,
    title,
    content,
    error: createWidget.error,
    isPending: createWidget.isPending,
    setTitle,
    setContent,
    handleOpenChange,
    handleTypeChange,
    handleSubmit,
  };
}
