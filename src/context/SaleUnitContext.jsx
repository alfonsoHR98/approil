import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const SaleUnitContext = createContext();

export const useSaleUnit = () => {
  const context = useContext(SaleUnitContext);
  if (!context) {
    throw new Error("useSaleUnit must be used within a SaleUnitProvider");
  }
  return context;
};

export const SaleUnitProvider = ({ children }) => {
  const [saleUnits, setSaleUnits] = useState([]);
  const [error, setError] = useState(null);

  const loadSaleUnits = async () => {
    try {
      const res = await axios.get("/api/saleUnit");
      setSaleUnits(res.data);
    } catch (error) {
      setError(error.response?.data?.message);
    }
  };

  async function newSaleUnit(data) {
    try {
      await axios.post("/api/saleUnit", data);
      loadSaleUnits();
    } catch (error) {
      setError(error.response?.data?.message);
    }
  }

  async function removeSaleUnit(id) {
    try {
      await axios.delete(`/api/saleUnit/${id}`);
      loadSaleUnits();
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
    <SaleUnitContext.Provider
      value={{
        saleUnits,
        error,
        loadSaleUnits,
        newSaleUnit,
        removeSaleUnit,
      }}
    >
      {children}
    </SaleUnitContext.Provider>
  );
};
