"use client"
import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const InventoryContext = createContext({
  inventories: [],
  error: null,
  loadInventories: () => {},
  addInventory: () => {},
  subtractInventory: () => {},
});

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

  async function loadInventories() {
    try {
      const res = await axios.get("/api/inventory/detail");
      setInventories(res.data);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  async function addInventory(data) {
    try {
      const res = await axios.post("/api/inventory/add", data);
      await loadInventories();
    } catch (error) {
      setError(error.response.data.message);
    }
  }

  async function subtractInventory(data) {
    try {
      const res = await axios.post("/api/inventory/subtract", data);
      await loadInventories();
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

  useEffect(() => {
    loadInventories();
  }, []);

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
