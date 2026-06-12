import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth on mount
    const storedUser = localStorage.getItem('cms_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Dummy login - accept any email/password for demo
    // In real app, this would call an API
    const dummyUser = {
      id: '1',
      name: 'Admin User',
      email: email,
      role: email.includes('teacher') ? 'TEACHER' : 'ADMIN',
    };
    
    setUser(dummyUser);
    localStorage.setItem('cms_user', JSON.stringify(dummyUser));
    return { success: true, user: dummyUser };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('cms_user');
  };

  const value = {
    user,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
