import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

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

  const loadSuppliers = async () => {
    try {
      const res = await axios.get("/api/supplier");
      setSuppliers(res.data);
    } catch (error) {
      setError(error.response?.data?.message);
    }
  };

  async function newSupplier(data) {
    try {
      await axios.post("/api/supplier", data);
      loadSuppliers();
    } catch (error) {
      setError(error.response?.data?.message);
    }
  }

  async function removeSupplier(id) {
    try {
      await axios.delete(`/api/supplier/${id}`);
      loadSuppliers();
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
    <SupplierContext.Provider
      value={{
        suppliers,
        error,
        loadSuppliers,
        newSupplier,
        removeSupplier,
      }}
    >
      {children}
    </SupplierContext.Provider>
  );
};
