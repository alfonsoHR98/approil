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

  const loadWarehouses = async () => {
    try {
      const res = await axios.get("/warehouse");
      setWarehouses(res.data);
    } catch (error) {
      setError(error.response?.data?.message);
    }
  }

  async function newWarehouse(data) {
    try {
      await axios.post("/warehouse", data);
      loadWarehouses();
    } catch (error) {
      setError(error.response?.data?.message);
    }
  }

  async function removeWarehouse(id) {
    try {
      await axios.delete(`/warehouse/${id}`);
      loadWarehouses();
    } catch (error) {
      setError(error.response?.data?.message);
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
    <WarehouseContext.Provider
      value={{
        warehouses,
        error,
        loadWarehouses,
        newWarehouse,
        removeWarehouse,
      }}
    >
      {children}
    </WarehouseContext.Provider>
  );
};
