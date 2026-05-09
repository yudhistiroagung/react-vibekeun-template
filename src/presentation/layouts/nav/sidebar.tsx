import { Link } from '@tanstack/react-router';
import { CheckSquare, LayoutDashboard } from 'lucide-react';

export function Sidebar() {
  return (
    <div className="w-[220px] border-r bg-white flex flex-col z-40 flex-shrink-0">
      <nav className="flex-1 px-4 py-6 flex flex-col gap-2 overflow-y-auto">
        <Link
          to="/"
          className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors [&.active]:bg-blue-50 [&.active]:text-blue-600 [&.active]:font-medium"
        >
          <LayoutDashboard size={20} />
          Dashboard
        </Link>
        <Link
          to="/todos"
          className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors [&.active]:bg-blue-50 [&.active]:text-blue-600 [&.active]:font-medium"
        >
          <CheckSquare size={20} />
          Todos
        </Link>
      </nav>
    </div>
  );
}
