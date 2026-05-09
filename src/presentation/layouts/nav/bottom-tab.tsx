import { Link } from '@tanstack/react-router';
import { CheckSquare, LayoutDashboard } from 'lucide-react';

export function BottomTab() {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 border-t bg-white flex items-center justify-around px-4 z-50">
      <Link
        to="/"
        className="flex flex-col items-center justify-center text-gray-500 [&.active]:text-blue-600 w-16"
      >
        <LayoutDashboard size={20} />
        <span className="text-xs mt-1">Dashboard</span>
      </Link>
      <Link
        to="/todos"
        className="flex flex-col items-center justify-center text-gray-500 [&.active]:text-blue-600 w-16"
      >
        <CheckSquare size={20} />
        <span className="text-xs mt-1">Todos</span>
      </Link>
    </div>
  );
}
