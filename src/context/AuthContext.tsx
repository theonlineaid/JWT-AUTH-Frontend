import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import api from '../utils/api';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  // Add other user properties as needed
}

interface AuthContextType {
  user: User | null;
  login: (data: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean; // Loading state
  message?: string | null; // Message state
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // Loading state
  const [message, setMessage] = useState<string | null>(null); // Message state

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Failed to check authentication', error);
      } finally {
        setLoading(false); // Set loading to false once the check is complete
      }
    };

    checkAuth();
  }, []);

  const login = async (data: { email: string; password: string }) => {
    setLoading(true); // Start loading before the login attempt
    try {
      const response = await api.login(data);
      setUser(response.data.user);
      localStorage.setItem('user', JSON.stringify(response.data.user)); // Store user in localStorage
      setMessage(null); // Clear any previous messages on successful login
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage('Login failed. Please try again.');
      }
      console.error('Login failed', error);
    } finally {
      setLoading(false); // End loading after the login attempt
    }
  };

  const logout = async () => {
    try {
      await api.logout();
      setUser(null);
      localStorage.removeItem('user'); // Remove user from localStorage
      setMessage('Logged out successfully'); // Set a message on logout
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
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
