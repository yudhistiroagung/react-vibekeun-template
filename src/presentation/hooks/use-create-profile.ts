import { useMutation, useQueryClient } from '@tanstack/react-query';
import { container } from 'tsyringe';
import type { Profile } from '@/domain/profiles/models/profile';
import type { ProfileRepository } from '@/domain/profiles/profile-repository';

export function useCreateProfile() {
  const repository = container.resolve<ProfileRepository>('ProfileRepository');
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (profile: Omit<Profile, 'id' | 'createdAt'>) =>
      repository.create(profile),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profiles'] });
    },
  });
}
