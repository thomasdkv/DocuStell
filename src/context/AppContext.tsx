import React, { createContext, useContext, useState, useEffect } from 'react';
import { StellarService } from '../services/StellarService';
import { PasskeyService } from '../services/PasskeyService';
import { IPFSService } from '../services/IPFSService';

interface User {
  id: string;
  username: string;
  isAuthenticated: boolean;
  isAdmin?: boolean;
}

interface AppContextType {
  user: User | null;
  isLoading: boolean;
  stellarService: StellarService;
  passkeyService: PasskeyService;
  ipfsService: IPFSService;
  login: (username: string, isAdmin?: boolean) => Promise<void>;
  logout: () => void;
  isInitialized: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  
  const [services] = useState(() => ({
    stellarService: new StellarService(),
    passkeyService: new PasskeyService(),
    ipfsService: new IPFSService(),
  }));

  useEffect(() => {
    const initializeApp = async () => {
      try {
        setIsLoading(true);
        
        const storedUser = localStorage.getItem('stellarPayDocsUser');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
        
        await services.passkeyService.initialize();
        await services.stellarService.initialize();
        await services.ipfsService.initialize();
        
        setIsInitialized(true);
      } catch (error) {
        console.error('Failed to initialize app:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();
  }, [services]);

  const login = async (username: string, isAdmin: boolean = false) => {
    if (!isInitialized) {
      throw new Error('App not initialized');
    }

    setIsLoading(true);
    try {
      const newUser = {
        id: `user_${Date.now()}`,
        username,
        isAuthenticated: true,
        isAdmin,
      };
      setUser(newUser);
      localStorage.setItem('stellarPayDocsUser', JSON.stringify(newUser));
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('stellarPayDocsUser');
  };

  const value = {
    user,
    isLoading,
    stellarService: services.stellarService,
    passkeyService: services.passkeyService,
    ipfsService: services.ipfsService,
    login,
    logout,
    isInitialized,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};