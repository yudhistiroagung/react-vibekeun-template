import 'reflect-metadata';

import '@/di/index';

import { createRouter } from '@tanstack/react-router';
import { StrictMode, useMemo } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';

import { queryClient } from '@/cores/tanstack-query/client';
import { ComposeProvider } from '@/presentation/components/compose-provider';
import { getComposedProviders } from './main.handler';
import { routeTree } from './routeTree.gen';

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const MainApp = () => {
  const components = useMemo(
    () =>
      getComposedProviders({
        client: queryClient,
        router,
      }),
    [],
  );

  return (
    <StrictMode>
      <ComposeProvider components={components} />
    </StrictMode>
  );
};

createRoot(document.getElementById('root')!).render(<MainApp />);
