import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback } from '@/presentation/components/ui/avatar';
import { Button } from '@/presentation/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
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
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="container max-w-4xl mx-auto flex h-14 items-center justify-between px-4">
        <div className="font-bold text-lg tracking-tight">Vibekeun</div>

        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100">
                    {initials}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {activeProfile?.name || 'No Profile Selected'}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {profiles.map((profile) => (
                <DropdownMenuItem
                  key={profile.id}
                  onClick={() => setProfileId(profile.id)}
                  className="cursor-pointer"
                >
                  <span className="flex-1">{profile.name}</span>
                  {activeProfileId === profile.id && (
                    <span className="text-xs text-zinc-500">Active</span>
                  )}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setIsAddProfileOpen(true)}
                className="cursor-pointer"
              >
                Add Profile...
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
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
            <DialogDescription className="sr-only">
              {noProfilesExist ? 'Create your first profile to get started.' : 'Add a new profile to the application.'}
            </DialogDescription>
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
