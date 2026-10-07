import { DashboardGrid } from "@/widgets/dashboard-grid";

export function DashboardPage() {
  return (
    <main className="min-h-screen bg-muted/40 p-6">
      <div className="mx-auto max-w-7xl">
        <DashboardGrid />
      </div>
    </main>
  );
}
