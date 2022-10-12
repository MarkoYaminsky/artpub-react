import React, { SetStateAction, useState } from "react";

export const PriceContext = React.createContext<IPriceContext | null>(null);
interface IPriceContext {
  totalPrice: number;
  setTotalPrice: React.Dispatch<SetStateAction<number>>;
}

export const PriceContextProvider: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  const [totalPrice, setTotalPrice] = useState(0);

  return (
    <PriceContext.Provider value={{ totalPrice, setTotalPrice }}>
      {props.children}
    </PriceContext.Provider>
  );
};
