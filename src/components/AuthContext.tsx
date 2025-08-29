'use client';

import { UserData } from '@/types';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  user: UserData | null;
  loading: boolean;
  error: string | null;
  login: (telegramInitData: string) => Promise<void>;
  logout: () => void;
  joinChannel: () => Promise<void>;
  refreshUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize with token from localStorage if available
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      refreshUserData();
    } else {
      setLoading(false);
    }
  }, []);

  const getIpAddress = async (): Promise<string> => {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.error('Failed to get IP address:', error);
      return '';
    }
  };

  const login = async (telegramInitData: string) => {
    try {
      setLoading(true);
      setError(null);

      const ipAddress = await getIpAddress();

      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ initData: telegramInitData, ipAddress }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Authentication failed');
      }

      const data = await response.json();

      // Save token to localStorage
      localStorage.setItem('token', data.token);

      // Set user data
      setUser(data.user);

      // Log admin status for debugging
      console.log('User logged in. Is admin:', data.user.isAdmin);
    } catch (error: any) {
      setError(error.message || 'Authentication failed');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const refreshUserData = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem('token');

      if (!token) {
        setUser(null);
        return;
      }

      const response = await fetch('/api/user', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          // Token is invalid or expired
          localStorage.removeItem('token');
          setUser(null);
          return;
        }

        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch user data');
      }

      const data = await response.json();
      setUser(data.user);

      // Log admin status for debugging
      console.log('User data refreshed. Is admin:', data.user.isAdmin);
    } catch (error: any) {
      setError(error.message || 'Failed to fetch user data');
      console.error('Refresh user data error:', error);
    } finally {
      setLoading(false);
    }
  };

  const joinChannel = async () => {
    try {
      const token = localStorage.getItem('token');

      if (!token || !user) {
        return;
      }

      // Open Telegram channel
      window.open('https://t.me/frogmatesteam', '_blank');

      // Update join status in database
      const response = await fetch('/api/join-channel', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update join status');
      }

      // Update user data
      await refreshUserData();
    } catch (error: any) {
      setError(error.message || 'Failed to join channel');
      console.error('Join channel error:', error);
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    error,
    login,
    logout,
    joinChannel,
    refreshUserData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;