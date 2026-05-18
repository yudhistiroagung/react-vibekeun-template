import { useState, useEffect } from 'react';
import { Button } from '@/presentation/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/presentation/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/presentation/components/ui/dropdown-menu';
import { Input } from '@/presentation/components/ui/input';
import { Label } from '@/presentation/components/ui/label';
import { useActiveProfile } from '@/presentation/hooks/use-active-profile';
import { useCreateProfile } from '@/presentation/hooks/use-create-profile';
import { useGetProfiles } from '@/presentation/hooks/use-get-profiles';

export function Header() {
  const { activeProfileId, setProfileId } = useActiveProfile();
  const { data: profiles = [], isLoading } = useGetProfiles();
  const { mutateAsync: createProfile } = useCreateProfile();

  const [isAddProfileOpen, setIsAddProfileOpen] = useState(false);
  const [newProfileName, setNewProfileName] = useState('');

  const activeProfile = profiles.find((p) => p.id === activeProfileId);
  const initials = activeProfile?.name
    ? activeProfile.name.substring(0, 2).toUpperCase()
    : '??';

  const noProfilesExist = !isLoading && profiles.length === 0;

  useEffect(() => {
    if (noProfilesExist) {
      setIsAddProfileOpen(true);
    }
  }, [noProfilesExist]);

  const handleAddProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProfileName.trim()) return;

    try {
      const profile = await createProfile({ name: newProfileName.trim() });
      setProfileId(profile.id);
      setIsAddProfileOpen(false);
      setNewProfileName('');
    } catch (error) {
      console.error('Failed to create profile', error);
    }
  };

  const handleOpenChange = (open: boolean) => {
    // Prevent closing if no profiles exist
    if (noProfilesExist && !open) return;
    setIsAddProfileOpen(open);
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-surface dark:bg-surface border-b border-primary dark:border-outline-variant flex items-center justify-between px-gutter h-16 max-w-full">
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="w-10 h-10 border-strict flex items-center justify-center font-bold text-primary dark:text-on-surface hover:bg-surface-container dark:hover:bg-surface-container-high transition-none">
              {initials}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 rounded-none border-strict" align="start" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {activeProfile?.name || 'No Profile Selected'}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-primary dark:bg-outline-variant" />
            {profiles.map((profile) => (
              <DropdownMenuItem
                key={profile.id}
                onClick={() => setProfileId(profile.id)}
                className="cursor-pointer rounded-none focus:bg-primary focus:text-on-primary"
              >
                <span className="flex-1">{profile.name}</span>
                {activeProfileId === profile.id && (
                  <span className="text-xs">Active</span>
                )}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator className="bg-primary dark:bg-outline-variant" />
            <DropdownMenuItem
              onClick={() => setIsAddProfileOpen(true)}
              className="cursor-pointer rounded-none focus:bg-primary focus:text-on-primary"
            >
              Add Profile...
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <h1 className="font-headline-md text-headline-md font-bold text-primary dark:text-on-surface">
          LEDGER
        </h1>
      </div>

      <div className="flex items-center justify-end">
        <button className="flex items-center justify-center hover:bg-surface-container dark:hover:bg-surface-container-high transition-none p-2 border-l border-primary dark:border-outline-variant h-16 w-16">
          <span className="material-symbols-outlined text-primary dark:text-on-surface">add</span>
        </button>
      </div>

      <Dialog open={isAddProfileOpen} onOpenChange={handleOpenChange}>
        <DialogContent
          className="sm:max-w-[425px]"
          onInteractOutside={(e) => noProfilesExist && e.preventDefault()}
          onEscapeKeyDown={(e) => noProfilesExist && e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>
              {noProfilesExist ? 'Welcome to Vibekeun!' : 'Add Profile'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddProfile}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Profile Name</Label>
                <Input
                  id="name"
                  value={newProfileName}
                  onChange={(e) => setNewProfileName(e.target.value)}
                  placeholder="e.g. Work, Personal, John Doe"
                  autoFocus
                />
              </div>
            </div>
            <DialogFooter>
              {!noProfilesExist && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAddProfileOpen(false)}
                >
                  Cancel
                </Button>
              )}
              <Button type="submit" disabled={!newProfileName.trim()}>
                {noProfilesExist ? 'Get Started' : 'Save Profile'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </header>
  );
}
