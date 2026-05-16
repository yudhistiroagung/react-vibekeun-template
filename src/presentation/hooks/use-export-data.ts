import { useMutation } from '@tanstack/react-query';
import di from '@/di';

export function useExportData() {
  return useMutation({
    mutationFn: async () => {
      const profiles = await di.repositories.profileRepository.getAll();
      const goals = await di.repositories.goalRepository.getAll();
      const tasks = await di.repositories.taskRepository.getAll();

      const data = {
        profiles,
        goals,
        tasks,
      };

      return new Blob([JSON.stringify(data, null, 2)], {
        type: 'application/json',
      });
    },
  });
}
