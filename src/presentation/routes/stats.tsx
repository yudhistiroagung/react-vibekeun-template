import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/stats')({
  component: StatsPage,
});

function StatsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="border-b pb-4">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Stats
        </h1>
        <p className="text-gray-500 mt-2">
          Visualize your improvement and trends.
        </p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <p className="text-sm text-gray-600">
          Charts and streak summaries will appear here.
        </p>
      </div>
    </div>
  );
}
