import { useMutation, useQueryClient } from '@tanstack/react-query';
import di from '@/di';

export const useRateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      taskId,
      rating,
    }: {
      taskId: number;
      rating: number;
    }) => {
      return di.usecases.updateTaskUsecase.run({
        id: taskId,
        task: { rating, status: 'completed' },
      });
    },
    onSuccess: () => {
      // Invalidate the tasks query to trigger a refetch
      queryClient.invalidateQueries({ queryKey: ['tasks', 'today'] });
    },
  });
};
