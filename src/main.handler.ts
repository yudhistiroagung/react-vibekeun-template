import { type QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type Router, RouterProvider } from '@tanstack/react-router';

import type { ComponentAndProps } from '@/presentation/components/compose-provider';
import { AuthProvider } from '@/presentation/contexts/auth-context';

type ComposeProvidersInput = {
  client: QueryClient;
  router: Router<any>;
};

export const getComposedProviders = ({
  client,
  router,
}: ComposeProvidersInput): ComponentAndProps[] => [
  [RouterProvider, { router }],
  [QueryClientProvider, { client }],
  [AuthProvider, {}],
];
