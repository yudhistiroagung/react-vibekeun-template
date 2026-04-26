import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { useIsMobile } from '../hooks/use-mobile'
import { MobileLayout } from '../layout/mobile-layout'
import { DesktopLayout } from '../layout/desktop-layout'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  const isMobile = useIsMobile()

  // Handle SSR or initial mount where we don't know the screen size yet
  if (isMobile === undefined) {
    return null
  }

  const Layout = isMobile ? MobileLayout : DesktopLayout

  return (
    <>
      <Layout>
        <Outlet />
      </Layout>
      <TanStackRouterDevtools position="bottom-right" />
    </>
  )
}
