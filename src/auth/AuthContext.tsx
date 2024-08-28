import React, { createContext, useState, useEffect, ReactNode } from "react";
import LocalStorage from "@bonny-kato/localstorage";
import { Navigate } from "react-router-dom";

interface AuthContextType {
  user: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const lStorage = new LocalStorage("StorageKey");
  const [user, setUser] = useState<boolean>(false);

  useEffect(() => {
    const storedEmail = lStorage.getValue("email");
    const storedPassword = lStorage.getValue("password");

    if (storedEmail && storedPassword) {
      setUser(true);
    }
  }, [lStorage]);

  const login = (email: string, password: string) => {
    lStorage.setValue("email", email);
    lStorage.setValue("password", password);
      setUser(true);
      <Navigate to="/" />;
  };

  const logout = () => {
    lStorage.removeValues("email");
    lStorage.removeValues("password");
    setUser(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
