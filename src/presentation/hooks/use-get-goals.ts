import { useQuery } from '@tanstack/react-query';
import di from '@/di';
import { useActiveProfile } from './use-active-profile';

export const useGetGoals = () => {
  const { activeProfileId } = useActiveProfile();

  return useQuery({
    queryKey: ['goals', activeProfileId],
    queryFn: async () => {
      if (!activeProfileId) {
        return [];
      }
      return di.usecases.getGoalsByProfileIdUsecase.run({ profileId: activeProfileId });
    },
    enabled: !!activeProfileId,
  });
};
