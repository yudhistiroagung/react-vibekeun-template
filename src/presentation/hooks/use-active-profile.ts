import { useCallback, useEffect, useState } from 'react';

const PROFILE_STORAGE_KEY = 'vibekeun_active_profile_id';

type Listener = (id: number | null) => void;
const listeners = new Set<Listener>();

function notifyListeners(id: number | null) {
  for (const listener of listeners) {
    listener(id);
  }
}

export function useActiveProfile() {
  const [activeProfileId, setActiveProfileId] = useState<number | null>(() => {
    const stored = localStorage.getItem(PROFILE_STORAGE_KEY);
    return stored ? Number(stored) : null;
  });

  useEffect(() => {
    const listener = (id: number | null) => setActiveProfileId(id);
    listeners.add(listener);

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === PROFILE_STORAGE_KEY) {
        const newId = e.newValue ? Number(e.newValue) : null;
        setActiveProfileId(newId);
        notifyListeners(newId);
      }
    };
    window.addEventListener('storage', handleStorageChange);

    return () => {
      listeners.delete(listener);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const setProfileId = useCallback((id: number | null) => {
    if (id === null) {
      localStorage.removeItem(PROFILE_STORAGE_KEY);
    } else {
      localStorage.setItem(PROFILE_STORAGE_KEY, id.toString());
    }
    setActiveProfileId(id);
    notifyListeners(id);
  }, []);

  return { activeProfileId, setProfileId };
}
