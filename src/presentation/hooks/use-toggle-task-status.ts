import { useMutation, useQueryClient } from '@tanstack/react-query';
import di from '@/di';
import type { Task } from '@/domain/tasks/models/task';

export const useToggleTaskStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ taskId, status, rating }: { taskId: number; status: Task['status']; rating?: number }) => {
      const taskUpdate: Partial<Task> = { status };
      if (rating !== undefined) {
        taskUpdate.rating = rating;
      }
      return di.usecases.updateTaskUsecase.run({ id: taskId, task: taskUpdate });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', 'today'] });
    },
  });
};
