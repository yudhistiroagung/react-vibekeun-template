import { useMutation, useQueryClient } from '@tanstack/react-query';
import di from '@/di';

export const useRateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ taskId, rating }: { taskId: number; rating: number }) => {
      const taskRepo = di.repositories.taskRepository;
      return taskRepo.update(taskId, {
        rating,
        status: 'completed',
      });
    },
    onSuccess: () => {
      // Invalidate the tasks query to trigger a refetch
      queryClient.invalidateQueries({ queryKey: ['tasks', 'today'] });
    },
  });
};
