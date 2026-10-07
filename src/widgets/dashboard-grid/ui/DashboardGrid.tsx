import { useWidgets, WidgetRenderer } from "@/entities/widget";
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
    <div className="grid gap-6 lg:grid-cols-2">
      {widgets.map((widget) => (
        <WidgetRenderer key={widget.id} widget={widget} />
      ))}
    </div>
  );
}
