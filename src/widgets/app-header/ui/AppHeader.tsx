import { ChartNoAxesCombinedIcon } from "lucide-react";

import { CreateWidgetModal } from "@/features/create-widget";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur-sm">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <div
            aria-hidden="true"
            className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm"
          >
            <ChartNoAxesCombinedIcon className="size-5" />
          </div>

          <div className="min-w-0">
            <h1 className="truncate font-heading text-lg font-semibold tracking-tight">
              Youscan Dashboard
            </h1>
          </div>
        </div>

        <CreateWidgetModal />
      </div>
    </header>
  );
}
