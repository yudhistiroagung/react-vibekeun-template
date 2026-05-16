import { useMutation, useQueryClient } from '@tanstack/react-query';
import di from '@/di';

export function useImportData() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (file: File) => {
      const text = await file.text();
      const data = JSON.parse(text);

      // Warning: Doing this without a single transaction across tables can be risky,
      // but is acceptable for a purely local setup where errors are unlikely.
      await di.repositories.profileRepository.clear();
      await di.repositories.goalRepository.clear();
      await di.repositories.taskRepository.clear();

      if (data.profiles && data.profiles.length > 0) {
        await di.repositories.profileRepository.bulkAdd(data.profiles);
      }
      if (data.goals && data.goals.length > 0) {
        await di.repositories.goalRepository.bulkAdd(data.goals);
      }
      if (data.tasks && data.tasks.length > 0) {
        await di.repositories.taskRepository.bulkAdd(data.tasks);
      }
    },
    onSuccess: () => {
      // Invalidate all queries to refresh the UI with the imported data
      queryClient.invalidateQueries();
    },
  });
}
