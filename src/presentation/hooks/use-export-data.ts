import { useMutation } from '@tanstack/react-query';
import di from '@/di';

export function useExportData() {
  return useMutation({
    mutationFn: async () => {
      return di.repositories.syncRepository.exportData();
    },
  });
}
