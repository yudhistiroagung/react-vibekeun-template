import type * as React from 'react';
import { Header } from '@/layouts/nav/header';
import { Sidebar } from '@/layouts/nav/sidebar';

export function DesktopLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6 min-w-[1060px]">
          <div className="flex items-center justify-end mb-6">
            <span className="text-sm text-muted-foreground border rounded-md px-3 py-1.5 bg-white shadow-sm">
              [Filter Periode]
            </span>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 min-h-[calc(100vh-10rem)] p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
