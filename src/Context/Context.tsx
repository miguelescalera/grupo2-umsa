import { jwtDecode } from 'jwt-decode';
import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const defaultContext: AuthContextType = {
    isAuthenticated: false,
    token: '',
    login: (token: string) => {},
    logout: () => {}
}

const AuthContext = createContext<AuthContextType>(defaultContext);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      validateToken(savedToken);
    }
  }, []);

  const validateToken = (token: string) => {
    try {
      // validar si el decodedToken trae todos los datos codificados
      const decodedToken: any = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);

      if (decodedToken.exp && decodedToken.exp > currentTime) {
        setToken(token);
        setIsAuthenticated(true);
      } else {
        setToken(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Invalid token:', error);
      setToken(null);
      setIsAuthenticated(false);
    }
  };

  const login = (token: string) => {
    localStorage.setItem('token', token);
    validateToken(token);
    console.log("Llego el token pa",token);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAppContext = () => {
    return useContext(AuthContext)
}

export { AuthProvider, useAppContext };