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

  const loadSales = async () => {
    try {
      const res = await axios.get("/sale");
      setSales(res.data);
    } catch (error) {
      setError(error.response?.data?.message);
    }
  }

  async function newSale(data) {
    try {
      const res = await axios.post("/sale", data);
      loadSales();
      return res.data;
    } catch (error) {
      setError(error.response?.data?.message);
    }
  }

  async function removeSale(id) {
    try {
      await axios.delete(`/sale/${id}`);
      loadSales();
    } catch (error) {
      setError(error.response?.data?.message);
    }
  }

  async function newSaleDetail(data) {
    try {
      await axios.post("/saleDetail", data);
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
    <SaleContext.Provider
      value={{
        sales,
        error,
        loadSales,
        newSale,
        removeSale,
        newSaleDetail,
      }}
    >
      {children}
    </SaleContext.Provider>
  );
};