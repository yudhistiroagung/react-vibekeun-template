import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { useActiveProfile } from '@/presentation/hooks/use-active-profile';
import { useIsMobile } from '@/presentation/hooks/use-mobile';
import { DesktopLayout } from '@/presentation/layouts/desktop-layout';
import { MobileLayout } from '@/presentation/layouts/mobile-layout';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const isMobile = useIsMobile();
  const { isLoading } = useActiveProfile();

  // Handle SSR or initial mount where we don't know the screen size yet
  if (isMobile === undefined || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
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
