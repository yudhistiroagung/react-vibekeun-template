import { useEffect, useState } from 'react';
import di from '@/domain/di';
import type { DashboardStats } from '@/domain/tasks/usecases/get-dashboard-stats';
import { useActiveProfile } from '@/presentation/hooks/use-active-profile';

export function useDashboardStats(trendDays: number = 7) {
  const { activeProfileId } = useActiveProfile();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchStats = async () => {
    if (!activeProfileId) {
      setStats(null);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const data = await di.getDashboardStatsUsecase.execute(
        activeProfileId,
        trendDays,
      );
      setStats(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load stats'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeProfileId, trendDays]);

  return {
    stats,
    isLoading,
    error,
    refresh: fetchStats,
  };
}
