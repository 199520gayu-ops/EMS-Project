// src/AppContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // --- Theme State ---
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  
  // --- Auth State (Mocking a User Login) ---
  const [user, setUser] = useState({
    username: "Alex",
    role: "EDITOR", // Options: ADMIN, EDITOR, VIEWER
    isAuthenticated: true
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');

  const logout = () => setUser({ ...user, isAuthenticated: false });

  return (
    <AppContext.Provider value={{ theme, toggleTheme, user, logout }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);