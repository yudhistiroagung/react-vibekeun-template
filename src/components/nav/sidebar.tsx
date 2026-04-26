import { Link } from '@tanstack/react-router'
import { Home, Settings, User } from 'lucide-react'

export function Sidebar() {
  return (
    <div className="w-64 border-r bg-white h-screen fixed left-0 top-0 flex flex-col z-40">
      <div className="h-16 flex items-center px-6 border-b text-xl font-bold tracking-tight">
        Vibekeun
      </div>
      <nav className="flex-1 px-4 py-6 flex flex-col gap-2 overflow-y-auto">
        <Link
          to="/"
          className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors [&.active]:bg-blue-50 [&.active]:text-blue-600 [&.active]:font-medium"
        >
          <Home size={20} />
          Home
        </Link>
        <Link
          to="/"
          className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors [&.active]:bg-blue-50 [&.active]:text-blue-600 [&.active]:font-medium"
        >
          <User size={20} />
          Profile
        </Link>
        <Link
          to="/"
          className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors [&.active]:bg-blue-50 [&.active]:text-blue-600 [&.active]:font-medium"
        >
          <Settings size={20} />
          Settings
        </Link>
      </nav>
    </div>
  )
}
