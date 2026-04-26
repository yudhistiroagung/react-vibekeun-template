import * as React from 'react'
import { BottomTab } from '../nav/bottom-tab'

export function MobileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-gray-50 pb-16">
      <main className="flex-1 w-full max-w-full overflow-x-hidden p-4">
        {children}
      </main>
      <BottomTab />
    </div>
  )
}
