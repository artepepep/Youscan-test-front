import { LineChartWidgetContainer } from "./entities/dashboard-widget/ui/LineChartWidgetContainer";

function App() {
  return (
    <main className="min-h-screen bg-muted/40 p-6">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <LineChartWidgetContainer widgetId="widget-1" />
          <LineChartWidgetContainer widgetId="widget-2" />
          <LineChartWidgetContainer widgetId="widget-3" />
        </div>
      </div>
    </main>
  );
}

export default App;
