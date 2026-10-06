import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";

import { useWidget } from "../model/use-widget";
import { LineChartWidget } from "./LineChartWidget";

type LineChartWidgetContainerProps = {
  widgetId: string;
};

export function LineChartWidgetContainer({
  widgetId,
}: LineChartWidgetContainerProps) {
  const { data: widget, error, isPending, refetch } = useWidget(widgetId);

  if (isPending) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-60" />
        </CardHeader>

        <CardContent>
          <Skeleton className="h-72 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="flex h-72 flex-col items-center justify-center gap-4">
          <p className="text-sm text-destructive">{error.message}</p>

          <Button variant="outline" onClick={() => refetch()}>
            Try again
          </Button>
        </CardContent>
      </Card>
    );
  }

  return <LineChartWidget widget={widget} />;
}
