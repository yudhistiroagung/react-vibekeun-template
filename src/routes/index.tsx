import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="border-b pb-4">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Home
        </h1>
        <p className="text-gray-500 mt-2">
          Welcome to the responsive layout dashboard.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Card 1</h2>
          <p className="text-sm text-gray-600 mt-2">
            This is a responsive card.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Card 2</h2>
          <p className="text-sm text-gray-600 mt-2">
            Resize the window to see layout changes.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Card 3</h2>
          <p className="text-sm text-gray-600 mt-2">
            Mobile shows bottom tabs, desktop shows sidebar.
          </p>
        </div>
      </div>
    </div>
  );
}
