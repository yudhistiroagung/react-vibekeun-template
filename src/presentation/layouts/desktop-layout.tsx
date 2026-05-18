import type * as React from 'react';
import { Header } from '@/presentation/layouts/nav/header';
import { BottomTab } from '@/presentation/layouts/nav/bottom-tab';

export function DesktopLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-background text-on-background pb-24">
      <Header />
      <main className="max-w-[1200px] w-full mx-auto pt-24 px-gutter flex-1">
        {children}
      </main>
      <BottomTab />
    </div>
  );
}
