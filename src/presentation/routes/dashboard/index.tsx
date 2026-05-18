import { createFileRoute } from '@tanstack/react-router';
import { DashboardView } from '@/presentation/features/dashboard/components/dashboard-view';

export const Route = createFileRoute('/dashboard/')({
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="border-b pb-4">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Dashboard
        </h1>
        <p className="text-muted-foreground mt-2">
          Your execution stats and performance trend.
        </p>
      </div>

      <div className="max-w-4xl">
        <DashboardView />
      </div>
    </div>
  );
}
