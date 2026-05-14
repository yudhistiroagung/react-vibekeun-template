import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect } from 'react';
import di from '@/di';

export const PROFILES_QUERY_KEY = ['profiles'];
export const ACTIVE_PROFILE_KEY = 'behavioral-tracker-active-profile-id';

export function useProfiles() {
  const queryClient = useQueryClient();
  const profileRepository = di.repositories.profileRepository;

  const { data: profiles = [], isLoading } = useQuery({
    queryKey: PROFILES_QUERY_KEY,
    queryFn: () => profileRepository.getProfiles(),
  });

  const createProfile = useMutation({
    mutationFn: async (name: string) => {
      const id = await profileRepository.createProfile({
        name,
        isDefault: profiles.length === 0,
        createdAt: Date.now(),
      });
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROFILES_QUERY_KEY });
    },
  });

  return {
    profiles,
    isLoading,
    createProfile,
  };
}

let isCreatingDefaultProfile = false;

export function useActiveProfile() {
  const { profiles, isLoading, createProfile } = useProfiles();
  const queryClient = useQueryClient();

  // Get active profile ID from local storage, or fallback to the first profile's ID
  const activeProfileId =
    Number(localStorage.getItem(ACTIVE_PROFILE_KEY)) || null;

  const activeProfile =
    profiles.find((p) => p.id === activeProfileId) || profiles[0] || null;

  const setActiveProfileId = useCallback(
    (id: number) => {
      localStorage.setItem(ACTIVE_PROFILE_KEY, id.toString());
      queryClient.invalidateQueries({ queryKey: PROFILES_QUERY_KEY }); // Just to trigger re-renders or related data refetch
    },
    [queryClient],
  );

  useEffect(() => {
    // Startup logic: create default profile if none exists
    if (!isLoading && profiles.length === 0 && !isCreatingDefaultProfile) {
      isCreatingDefaultProfile = true;
      createProfile.mutate('Default Profile', {
        onSuccess: (id) => {
          setActiveProfileId(id);
          isCreatingDefaultProfile = false;
        },
        onError: () => {
          isCreatingDefaultProfile = false;
        },
      });
    } else if (!isLoading && profiles.length > 0 && !activeProfileId) {
      // If profiles exist but no active profile is set, set the first one as active
      setActiveProfileId(profiles[0].id!);
    }
  }, [profiles, isLoading, activeProfileId, createProfile, setActiveProfileId]);

  return {
    activeProfile,
    setActiveProfileId,
    isLoading: isLoading || (profiles.length === 0 && isCreatingDefaultProfile),
  };
}
