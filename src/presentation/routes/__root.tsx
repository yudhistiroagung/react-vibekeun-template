import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { useIsMobile } from '@/presentation/hooks/use-mobile';
import { DesktopLayout } from '@/presentation/layouts/desktop-layout';
import { MobileLayout } from '@/presentation/layouts/mobile-layout';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const isMobile = useIsMobile();

  // Handle SSR or initial mount where we don't know the screen size yet
  if (isMobile === undefined) {
    return null;
  }

  const Layout = isMobile ? MobileLayout : DesktopLayout;

  return (
    <>
      <Layout>
        <Outlet />
      </Layout>
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
