import { createContext, useContext, useState, useEffect } from 'react';


interface AuthContextType {
  isAuthenticated: boolean;
  userInfo: any;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  userInfo: null,
  logout: () => {}
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    // Verifica se existe usuário salvo
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUserInfo(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    setIsAuthenticated(false);
    setUserInfo(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userInfo, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);