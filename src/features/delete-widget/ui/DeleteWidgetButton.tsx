import { LoaderCircleIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";

import type { Widget } from "@/entities/widget";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shared/ui/AlertDialog";
import { Button } from "@/shared/ui/Button";
import { useDeleteWidget } from "../model/useDeleteWidget";

type DeleteWidgetButtonProps = {
  widget: Pick<Widget, "id" | "title">;
};

export function DeleteWidgetButton({ widget }: DeleteWidgetButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const deleteWidget = useDeleteWidget(widget.id);

  function handleOpenChange(nextIsOpen: boolean): void {
    if (deleteWidget.isPending) {
      return;
    }

    setIsOpen(nextIsOpen);

    if (nextIsOpen) {
      deleteWidget.reset();
    }
  }

  function handleDelete(): void {
    deleteWidget.mutate(undefined, {
      onSuccess: () => setIsOpen(false),
    });
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
      <AlertDialogTrigger
        render={
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="bg-card/80 text-muted-foreground backdrop-blur-sm hover:text-destructive"
            aria-label={`Delete ${widget.title}`}
          />
        }
      >
        <Trash2Icon />
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete widget?</AlertDialogTitle>
          <AlertDialogDescription>
            “{widget.title}” will be permanently removed from the dashboard.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {deleteWidget.error && (
          <p role="alert" className="text-sm text-destructive">
            {deleteWidget.error.message}
          </p>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleteWidget.isPending}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            disabled={deleteWidget.isPending}
            onClick={handleDelete}
          >
            {deleteWidget.isPending && (
              <LoaderCircleIcon className="animate-spin" />
            )}
            {deleteWidget.isPending ? "Deleting…" : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
