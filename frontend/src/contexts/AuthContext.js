import React, { createContext, useState, useContext, useEffect } from 'react';
import { authAPI } from '../services/auth';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await authAPI.getMe();
      setUser(response.data.data);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try{
    const response = await authAPI.login(credentials);
    setUser(response.data.data);
    return response.data;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    await authAPI.logout();
    setUser(null);
  };

    const updateDetails = async (userData) => {
    try {
      const response = await authAPI.updateProfile(userData);
      setUser(response.data.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const updatePassword = async (passwordData) => {
    try {
      const response = await authAPI.updatePassword(passwordData);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const value = {
    user,
    login,
    logout,
    checkAuth,
    loading,
    updateDetails,
    updatePassword
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};