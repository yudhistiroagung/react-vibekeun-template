import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Button } from '@/presentation/components/button';
import {
  useActiveProfile,
  useProfiles,
} from '@/presentation/hooks/use-active-profile';

export const Route = createFileRoute('/profiles/')({
  component: ProfilesComponent,
});

function ProfilesComponent() {
  const { profiles, createProfile } = useProfiles();
  const { activeProfile, setActiveProfileId } = useActiveProfile();
  const [newProfileName, setNewProfileName] = useState('');

  const handleCreateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (newProfileName.trim()) {
      createProfile.mutate(newProfileName.trim(), {
        onSuccess: () => {
          setNewProfileName('');
        },
      });
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Profiles</h1>

      <div className="space-y-4 mb-8">
        <h2 className="text-lg font-semibold">Switch Profile</h2>
        {profiles.length === 0 ? (
          <p className="text-gray-500 text-sm">No profiles found.</p>
        ) : (
          <ul className="space-y-2">
            {profiles.map((profile) => {
              const isActive = activeProfile?.id === profile.id;
              return (
                <li key={profile.id}>
                  <button
                    type="button"
                    className={`w-full p-3 rounded-lg border flex justify-between items-center transition-colors cursor-pointer ${isActive ? 'bg-primary/10 border-primary' : 'bg-card border-border hover:bg-accent/50'}`}
                    onClick={() => profile.id && setActiveProfileId(profile.id)}
                  >
                    <span className="font-medium">{profile.name}</span>
                    {isActive && (
                      <span className="text-xs text-primary font-semibold">
                        Active
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div className="pt-6 border-t border-border">
        <h2 className="text-lg font-semibold mb-4">Create New Profile</h2>
        <form onSubmit={handleCreateProfile} className="flex gap-2">
          <input
            type="text"
            placeholder="Profile Name"
            value={newProfileName}
            onChange={(e) => setNewProfileName(e.target.value)}
            className="flex-1 px-3 py-2 bg-background border border-input rounded-md text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-primary"
            disabled={createProfile.isPending}
          />
          <Button
            type="submit"
            disabled={!newProfileName.trim() || createProfile.isPending}
          >
            {createProfile.isPending ? 'Creating...' : 'Create'}
          </Button>
        </form>
      </div>
    </div>
  );
}
