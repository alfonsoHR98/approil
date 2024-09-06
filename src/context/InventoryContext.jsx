import { createContext, useState, useContext, useEffect } from "react";
import axios from "@lib/axios";

const InventoryContext = createContext();

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error("useInventory must be used within a InventoryProvider");
  }
  return context;
};

export const InventoryProvider = ({ children }) => {
  const [inventories, setInventories] = useState([]);
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
    <InventoryContext.Provider
      value={{
        inventories,
        error,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};
