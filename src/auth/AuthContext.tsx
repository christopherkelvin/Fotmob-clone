import React, { createContext, useState, useEffect, ReactNode } from "react";
import LocalStorage from "@bonny-kato/localstorage";

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
    const [user, setUser] = useState<boolean>(() => {
        const signedIn = lStorage.getValue("signedIn");
        return !!(signedIn);
  });
  const signedIn = lStorage.getValue("signedIn");
  useEffect(() => {
    if (signedIn) {
      setUser(true);
    } 
  }, [signedIn]);

  const login = (email: string, password: string) => {
    lStorage.setValue("email", email);
    lStorage.setValue("password", password);
    lStorage.setValue("signedIn", email);
    setUser(true);
  };

  const logout = () => {
    lStorage.removeValues("signedIn");
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
