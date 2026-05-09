import type React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  activeUserId: string | null;
  login: (userId: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [activeUserId, setActiveUserId] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('activeUserId');
    if (stored) {
      setActiveUserId(stored);
    }
    setIsLoaded(true);
  }, []);

  const login = (userId: string) => {
    localStorage.setItem('activeUserId', userId);
    setActiveUserId(userId);
  };

  const logout = () => {
    localStorage.removeItem('activeUserId');
    setActiveUserId(null);
  };

  if (!isLoaded) return null;

  return (
    <AuthContext.Provider value={{ activeUserId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
