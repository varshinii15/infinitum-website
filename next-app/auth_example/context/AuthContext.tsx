'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService, UserProfile, LoginRequest, RegisterUserRequest } from '@/services/authService';

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterUserRequest) => Promise<void>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      console.log('Fetching user profile...');
      try {
        const { user } = await authService.getProfile();
        console.log('Profile fetched:', user);
        setUser(user);
      } catch (error) {
        // User not authenticated - this is expected, not an error
        console.log('No authenticated user (this is normal for first visit)');
        setUser(null);
      } finally {
        console.log('Setting loading to false');
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const login = async (data: LoginRequest) => {
    const response = await authService.login(data);
    // Fetch full profile after login
    const { user } = await authService.getProfile();
    setUser(user);
  };

  const register = async (data: RegisterUserRequest) => {
    const response = await authService.register(data);
    // Fetch full profile after registration
    const { user } = await authService.getProfile();
    setUser(user);
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setUser(null);
    }
  };

  const refreshProfile = async () => {
    try {
      const { user } = await authService.getProfile();
      setUser(user);
    } catch (error) {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
