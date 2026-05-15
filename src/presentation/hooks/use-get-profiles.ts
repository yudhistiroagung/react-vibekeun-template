import { useQuery } from '@tanstack/react-query';
import { container } from 'tsyringe';
import type { Profile } from '@/domain/profiles/models/profile';
import type { ProfileRepository } from '@/domain/profiles/profile-repository';

export function useGetProfiles() {
  const repository = container.resolve<ProfileRepository>('ProfileRepository');

  return useQuery<Profile[]>({
    queryKey: ['profiles'],
    queryFn: () => repository.getAll(),
  });
}
