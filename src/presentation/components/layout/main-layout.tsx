import { Outlet } from '@tanstack/react-router';
import { Header } from './header';

export function MainLayout() {
  return (
    <div className="min-h-screen bg-white text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50 flex flex-col font-sans">
      <Header />
      <main className="flex-1 container max-w-4xl mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
