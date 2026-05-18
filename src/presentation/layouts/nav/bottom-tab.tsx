import { Link } from '@tanstack/react-router';

export function BottomTab() {
  return (
    <nav className="fixed bottom-0 w-full z-50 bg-surface dark:bg-surface border-t border-primary dark:border-outline-variant h-16 flex justify-around items-stretch">
      <Link
        to="/dashboard"
        className="flex flex-col items-center justify-center text-primary dark:text-on-surface p-2 h-full flex-1 hover:bg-surface-container-highest dark:hover:bg-surface-container-high transition-none [&.active]:bg-primary [&.active]:text-on-primary dark:[&.active]:bg-on-surface dark:[&.active]:text-surface"
      >
        <span className="material-symbols-outlined">dashboard</span>
        <span className="font-label-caps text-label-caps mt-1">Dashboard</span>
      </Link>
      <Link
        to="/"
        className="flex flex-col items-center justify-center text-primary dark:text-on-surface p-2 h-full flex-1 hover:bg-surface-container-highest dark:hover:bg-surface-container-high transition-none [&.active]:bg-primary [&.active]:text-on-primary dark:[&.active]:bg-on-surface dark:[&.active]:text-surface"
      >
        <span className="material-symbols-outlined">check_box</span>
        <span className="font-label-caps text-label-caps mt-1">Tasks</span>
      </Link>
      <Link
        to="/goals"
        className="flex flex-col items-center justify-center text-primary dark:text-on-surface p-2 h-full flex-1 hover:bg-surface-container-highest dark:hover:bg-surface-container-high transition-none [&.active]:bg-primary [&.active]:text-on-primary dark:[&.active]:bg-on-surface dark:[&.active]:text-surface"
      >
        <span className="material-symbols-outlined">flag</span>
        <span className="font-label-caps text-label-caps mt-1">Goals</span>
      </Link>
      <Link
        to="/settings"
        className="flex flex-col items-center justify-center text-primary dark:text-on-surface p-2 h-full flex-1 hover:bg-surface-container-highest dark:hover:bg-surface-container-high transition-none [&.active]:bg-primary [&.active]:text-on-primary dark:[&.active]:bg-on-surface dark:[&.active]:text-surface"
      >
        <span className="material-symbols-outlined">settings</span>
        <span className="font-label-caps text-label-caps mt-1">Settings</span>
      </Link>
    </nav>
  );
}
