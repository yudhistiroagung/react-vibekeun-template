import { Link } from '@tanstack/react-router';
import { Home, Trophy, User } from 'lucide-react';

export function BottomTab() {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 border-t bg-white flex items-center justify-around px-4 z-50">
      <Link
        to="/"
        className="flex flex-col items-center justify-center text-gray-500 [&.active]:text-blue-600 w-16"
      >
        <Home size={20} />
        <span className="text-xs mt-1">Home</span>
      </Link>
      <Link
        to="/profiles"
        className="flex flex-col items-center justify-center text-gray-500 [&.active]:text-blue-600 w-16"
      >
        <User size={20} />
        <span className="text-xs mt-1">Profiles</span>
      </Link>
      <Link
        to="/menu2"
        className="flex flex-col items-center justify-center text-gray-500 [&.active]:text-blue-600 w-16"
      >
        <Trophy size={20} />
        <span className="text-xs mt-1">Achievements</span>
      </Link>
    </div>
  );
}
