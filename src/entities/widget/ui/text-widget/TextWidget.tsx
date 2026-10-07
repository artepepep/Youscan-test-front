import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/Card";
import type { TextWidget as TextWidgetModel } from "../../model/widget.types";

type TextWidgetProps = {
  widget: TextWidgetModel;
};

export function TextWidget({ widget }: TextWidgetProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{widget.title}</CardTitle>
      </CardHeader>
      <CardContent className="whitespace-pre-wrap">
        {widget.data.content}
      </CardContent>
    </Card>
  );
}
