import { useWidgets, WidgetRenderer } from "@/entities/widget";
import { DeleteWidgetButton } from "@/features/delete-widget";
import { EditTextWidgetButton } from "@/features/edit-text-widget";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/Button";
import { Card, CardContent } from "@/shared/ui/Card";
import { Skeleton } from "@/shared/ui/Skeleton";

export function DashboardGrid() {
  const { data: widgets, error, isPending, refetch } = useWidgets();

  if (isPending) {
    return (
      <div className="grid gap-6 lg:grid-cols-2">
        {Array.from({ length: 4 }, (_, index) => (
          <Skeleton key={index} className="h-96 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="flex min-h-72 flex-col items-center justify-center gap-4">
          <p className="text-sm text-destructive">{error.message}</p>
          <Button variant="outline" onClick={() => refetch()}>
            Try again
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (widgets.length === 0) {
    return (
      <Card>
        <CardContent className="flex min-h-72 items-center justify-center text-sm text-muted-foreground">
          No widgets yet.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3 sm:grid-cols-2">
      {widgets.map((widget) => (
        <div
          key={widget.id}
          className={cn(
            "relative min-w-0",
            widget.type === "text"
              ? "[&_[data-slot=card-header]]:pr-24"
              : "[&_[data-slot=card-header]]:pr-14",
          )}
        >
          <WidgetRenderer widget={widget} />
          <div className="absolute top-3 right-3 flex items-center gap-1">
            {widget.type === "text" && (
              <EditTextWidgetButton widget={widget} />
            )}
            <DeleteWidgetButton widget={widget} />
          </div>
        </div>
      ))}
    </div>
  );
}
