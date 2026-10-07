import { CreateWidgetModal } from "@/features/create-widget";
import { DashboardGrid } from "@/widgets/dashboard-grid";

export function DashboardPage() {
  return (
    <main className="min-h-screen bg-muted/40 p-6">
      <div className="mx-auto max-w-7xl">
        <header className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h1 className="font-heading text-2xl font-semibold">Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Create and manage your dashboard widgets.
            </p>
          </div>
          <CreateWidgetModal />
        </header>
        <DashboardGrid />
      </div>
    </main>
  );
}
