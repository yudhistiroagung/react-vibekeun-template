import { useQuery } from '@tanstack/react-query';
import di from '@/di';
import type { Profile } from '@/domain/profiles/models/profile';

export function useGetProfiles() {
  return useQuery<Profile[]>({
    queryKey: ['profiles'],
    queryFn: () => di.repositories.profileRepository.getAll(),
  });
}
