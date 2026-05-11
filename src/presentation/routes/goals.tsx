import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/goals')({
  component: GoalsPage,
});

function GoalsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="border-b pb-4">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Goals
        </h1>
        <p className="text-gray-500 mt-2">Manage your tracking goals.</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <p className="text-sm text-gray-600">
          List of goals and goal creation form will appear here.
        </p>
      </div>
    </div>
  );
}
