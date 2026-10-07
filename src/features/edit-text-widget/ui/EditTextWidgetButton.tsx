import { LoaderCircleIcon, PencilIcon } from "lucide-react";

import type { TextWidget } from "@/entities/widget";
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
import { Label } from "@/shared/ui/Label";
import { Textarea } from "@/shared/ui/Textarea";
import { useEditTextWidgetForm } from "../model/useEditTextWidgetForm";

type EditTextWidgetButtonProps = {
  widget: TextWidget;
};

export function EditTextWidgetButton({ widget }: EditTextWidgetButtonProps) {
  const {
    isOpen,
    content,
    error,
    isPending,
    hasChanges,
    setContent,
    handleOpenChange,
    handleSubmit,
  } = useEditTextWidgetForm({
    widgetId: widget.id,
    initialContent: widget.data.content,
  });

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="bg-card/80 text-muted-foreground backdrop-blur-sm"
            aria-label={`Edit ${widget.title}`}
          />
        }
      >
        <PencilIcon />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit {widget.title}</DialogTitle>
          <DialogDescription>
            Update the text content and save it to the dashboard.
          </DialogDescription>
        </DialogHeader>

        <form className="grid gap-4" onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <Label htmlFor={`edit-widget-${widget.id}`}>Content</Label>
            <Textarea
              id={`edit-widget-${widget.id}`}
              value={content}
              maxLength={10_000}
              disabled={isPending}
              className="min-h-32"
              onChange={(event) => setContent(event.target.value)}
            />
          </div>

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
            <Button type="submit" disabled={isPending || !hasChanges}>
              {isPending && <LoaderCircleIcon className="animate-spin" />}
              {isPending ? "Saving…" : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
