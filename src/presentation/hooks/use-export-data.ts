import { useMutation } from '@tanstack/react-query';
import di from '@/di';

export function useExportData() {
  return useMutation({
    mutationFn: async () => {
      return di.usecases.exportDataUsecase.run();
    },
  });
}
