// src/context/AuthContext.js
import { createContext, useContext, useState } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(localStorage.getItem('user'));

  const login = (email, password) => {
    // Mock validation for testing
    if (email === 'test@example.com' && password === 'password123') {
      localStorage.setItem('user', email);
      setUser(email);
    } else {
      alert('Invalid credentials');
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
