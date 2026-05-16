import { useMutation, useQueryClient } from '@tanstack/react-query';
import di from '@/di';

export function useImportData() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (file: File) => {
      await di.repositories.syncRepository.importData(file);
    },
    onSuccess: () => {
      // Invalidate all queries to refresh the UI with the imported data
      queryClient.invalidateQueries();
    },
  });
}
