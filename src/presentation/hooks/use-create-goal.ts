import { useMutation, useQueryClient } from '@tanstack/react-query';
import di from '@/di';
import type { Goal } from '@/domain/goals/models/goal';
import { useActiveProfile } from './use-active-profile';

export const useCreateGoal = () => {
  const queryClient = useQueryClient();
  const { activeProfileId } = useActiveProfile();

  return useMutation({
    mutationFn: async (goal: Omit<Goal, 'id' | 'profileId' | 'createdAt'>) => {
      if (!activeProfileId) {
        throw new Error('No active profile');
      }
      return di.usecases.createGoalUsecase.run({
        goal: {
          ...goal,
          profileId: activeProfileId,
        }
      });
    },
    onSuccess: () => {
      if (activeProfileId) {
        queryClient.invalidateQueries({ queryKey: ['goals', activeProfileId] });
      }
    },
  });
};
