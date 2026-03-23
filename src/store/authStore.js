"use client"
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const token = localStorage.getItem('user_token');
      const userData = localStorage.getItem('user_data');
      if (token && userData) setUser(JSON.parse(userData));
    } catch (_) {}
    setLoading(false);
  }, []);

  const login = (userData, token) => {
    localStorage.setItem('user_token', token);
    localStorage.setItem('user_data', JSON.stringify(userData));
    setUser(userData);
  };

  // Cập nhật thông tin user (profile, avatar, password)
  const updateUser = (updates) => {
    const updated = { ...user, ...updates };
    localStorage.setItem('user_data', JSON.stringify(updated));
    setUser(updated);
  };

  const logout = () => {
    localStorage.removeItem('user_token');
    localStorage.removeItem('user_data');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user, loading,
      login, logout, updateUser,
      isLoggedIn: !!user,
      isAdmin: user?.role === 'admin',
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
