import { useMutation, useQueryClient } from '@tanstack/react-query';
import di from '@/di';
import type { Profile } from '@/domain/profiles/models/profile';

export function useCreateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (profile: Omit<Profile, 'id' | 'createdAt'>) =>
      di.usecases.createProfileUsecase.run({ profile }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profiles'] });
    },
  });
}
