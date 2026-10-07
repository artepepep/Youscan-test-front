import { LoaderCircleIcon, PlusIcon } from "lucide-react";

import type { WidgetType } from "@/entities/widget";
import { Button } from "@/shared/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/Dialog";
import { Input } from "@/shared/ui/Input";
import { Label } from "@/shared/ui/Label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/Select";
import { Textarea } from "@/shared/ui/Textarea";
import { useCreateWidgetForm } from "../model/useCreateWidgetForm";

const WIDGET_TYPE_OPTIONS: ReadonlyArray<{
  value: WidgetType;
  label: string;
}> = [
  { value: "line", label: "Line chart" },
  { value: "bar", label: "Bar chart" },
  { value: "stacked-bar", label: "Stacked bar chart" },
  { value: "pie", label: "Pie chart" },
  { value: "text", label: "Text" },
];

export function CreateWidgetModal() {
  const {
    isOpen,
    type,
    title,
    content,
    error,
    isPending,
    setTitle,
    setContent,
    handleOpenChange,
    handleTypeChange,
    handleSubmit,
  } = useCreateWidgetForm();

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger render={<Button type="button" />}>
        <PlusIcon />
        Create widget
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create widget</DialogTitle>
          <DialogDescription>
            Choose a widget type. New charts are generated with random data.
          </DialogDescription>
        </DialogHeader>

        <form className="grid gap-4" onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <Label htmlFor="create-widget-type">Widget type</Label>
            <Select<WidgetType>
              items={WIDGET_TYPE_OPTIONS}
              value={type}
              disabled={isPending}
              onValueChange={handleTypeChange}
            >
              <SelectTrigger id="create-widget-type" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {WIDGET_TYPE_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="create-widget-title">Title</Label>
            <Input
              id="create-widget-title"
              value={title}
              maxLength={120}
              disabled={isPending}
              placeholder="Default title"
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>

          {type === "text" && (
            <div className="grid gap-2">
              <Label htmlFor="create-widget-content">Content</Label>
              <Textarea
                id="create-widget-content"
                value={content}
                maxLength={10_000}
                disabled={isPending}
                placeholder="Write your text…"
                onChange={(event) => setContent(event.target.value)}
              />
            </div>
          )}

          {error && (
            <p role="alert" className="text-sm text-destructive">
              {error.message}
            </p>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              disabled={isPending}
              onClick={() => handleOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending && <LoaderCircleIcon className="animate-spin" />}
              {isPending ? "Creating…" : "Create widget"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
