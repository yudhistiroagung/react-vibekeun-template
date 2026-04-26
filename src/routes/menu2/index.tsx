import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/menu2/')({
  component: Menu2,
});

function Menu2() {
  return (
    <div className="flex flex-col gap-6">
      <div className="border-b pb-4">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Menu 2
        </h1>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <p className="text-gray-600">This is a mock content for Menu 2</p>
      </div>
    </div>
  );
}
