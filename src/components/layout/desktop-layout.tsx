import * as React from 'react'
import { Sidebar } from '../nav/sidebar'

export function DesktopLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 ml-64 p-8 w-full max-w-full overflow-x-hidden">
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 min-h-[calc(100vh-4rem)] p-6">
          {children}
        </div>
      </main>
    </div>
  )
}
