import { createContext, useState, useContext, useEffect } from "react";
import axios from "@lib/axios";

const WarehouseContext = createContext();

export const useWarehouse = () => {
  const context = useContext(WarehouseContext);
  if (!context) {
    throw new Error("useWarehouse must be used within a WarehouseProvider");
  }
  return context;
};

export const WarehouseProvider = ({ children }) => {
  const [warehouses, setWarehouses] = useState([]);
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
    <WarehouseContext.Provider
      value={{
        warehouses,
        error,
      }}
    >
      {children}
    </WarehouseContext.Provider>
  );
};
