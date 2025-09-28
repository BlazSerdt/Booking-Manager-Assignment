import type { AuthProviderProps, User } from "../../types";
import {createContext, useContext, useState} from "react";

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  login: (user: User, accessToken: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth error");
  }
  return context;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const login = (userData: User, token: string)=> {
    setUser(userData);
    setAccessToken(token);
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};