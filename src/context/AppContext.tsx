import React, { SetStateAction, useState } from "react";

export const AppContext = React.createContext<IPriceContext | null>(null);
interface IPriceContext {
  totalPrice: number;
  setTotalPrice: React.Dispatch<SetStateAction<number>>;
  isAuthenticated: boolean;
  login: Function;
  logout: Function;
}

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("artpubAuthCredentials")
  };

  return (
    <AppContext.Provider
      value={{ totalPrice, setTotalPrice, isAuthenticated, login, logout }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
