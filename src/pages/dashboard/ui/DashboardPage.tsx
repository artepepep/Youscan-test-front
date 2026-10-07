import { AppHeader } from "@/widgets/app-header";
import { DashboardGrid } from "@/widgets/dashboard-grid";

export function DashboardPage() {
  return (
    <div className="min-h-screen bg-muted/40">
      <AppHeader />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <DashboardGrid />
      </main>
    </div>
  );
}
