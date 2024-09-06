import { createContext, useState, useContext, useEffect } from "react";
import axios from "@lib/axios";

const SupplierContext = createContext();

export const useSupplier = () => {
  const context = useContext(SupplierContext);
  if (!context) {
    throw new Error("useSupplier must be used within a SupplierProvider");
  }
  return context;
};

export const SupplierProvider = ({ children }) => {
  const [suppliers, setSuppliers] = useState([]);
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
    <SupplierContext.Provider
      value={{
        suppliers,
        error,
      }}
    >
      {children}
    </SupplierContext.Provider>
  );
};
