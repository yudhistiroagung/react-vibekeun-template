import {
  createFileRoute,
  Outlet,
  redirect,
  useNavigate,
} from '@tanstack/react-router';
import { useEffect } from 'react';
import { useAuth } from '@/presentation/contexts/auth-context';
import { useIsMobile } from '@/presentation/hooks/use-mobile';
import { DesktopLayout } from '@/presentation/layouts/desktop-layout';
import { MobileLayout } from '@/presentation/layouts/mobile-layout';

export const Route = createFileRoute('/_protected')({
  component: ProtectedLayout,
});

function ProtectedLayout() {
  const isMobile = useIsMobile();
  const { activeUserId } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!activeUserId) {
      navigate({ to: '/login' });
    }
  }, [activeUserId, navigate]);

  if (!activeUserId) return null;

  if (isMobile === undefined) {
    return null;
  }

  const Layout = isMobile ? MobileLayout : DesktopLayout;

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
