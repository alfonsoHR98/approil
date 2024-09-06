import { createContext, useState, useContext, useEffect } from "react";
import axios from "@lib/axios";

const SaleContext = createContext();

export const useSale = () => {
  const context = useContext(SaleContext);
  if (!context) {
    throw new Error("useSale must be used within a SaleProvider");
  }
  return context;
}

export const SaleProvider = ({ children }) => {
  const [sales, setSales] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const clean = setTimeout(() => {
      setError(null);
    }, 3000);
    return () => {
      clearTimeout(clean);
    };
  }, [error]);

  return (
    <SaleContext.Provider
      value={{
        sales,
        error,
      }}
    >
      {children}
    </SaleContext.Provider>
  );
};