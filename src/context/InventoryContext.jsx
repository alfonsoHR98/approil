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

  const loadInventories = async () => {
    try {
      const { data } = await axios.get("/inventory/detail");
      setInventories(data);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  async function addInventory(data) {
    try {
      await axios.post("/inventory/add", data);
      loadInventories();
    } catch (error) {
      setError(error.response.data.message);
    }
  }

  async function subtractInventory(data) {
    try {
      await axios.post("/inventory/subtract", data);
      loadInventories();
    } catch (error) {
      setError(error.response.data.message);
    }
  }

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
        loadInventories,
        addInventory,
        subtractInventory,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};
