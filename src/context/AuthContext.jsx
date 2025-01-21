"use client";

import { fetchProfile, logout } from "@/services/api";
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext({
  user: {},
  setUser: () => {},
  handleLogout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const { data } = await fetchProfile();
        setUser(data);
      } catch {
        setUser({});
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  const handleLogout = async () => {
    await logout();
    setUser({});
  };

  return (
    <AuthContext.Provider value={{ user, setUser, handleLogout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
