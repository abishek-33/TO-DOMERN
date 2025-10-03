import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { MOCK_USERS } from '../lib/mockData';

interface AuthContextType {
  user: User | null;
  login: (token: string) => boolean;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      const foundUser = MOCK_USERS.find(u => u.authToken === token);
      if (foundUser) {
        setUser(foundUser);
      }
    }
  }, []);

  const login = (token: string): boolean => {
    const foundUser = MOCK_USERS.find(u => u.authToken === token);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('authToken', token);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authToken');
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin }}>
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
