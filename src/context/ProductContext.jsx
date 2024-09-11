import { createContext, useState, useContext, useEffect } from "react";
import axios from "@lib/axios";

const ProductContext = createContext();

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  const loadProducts = async () => {
    try {
      const res = await axios.get("/product");
      setProducts(res.data);
    } catch (error) {
      setError(error.response?.data?.message);
    }
  }

  async function newProduct(data) {
    try {
      await axios.post("/product", data);
      loadProducts();
    } catch (error) {
      setError(error.response?.data?.message);
    }
  }

  async function removeProduct(id) {
    try {
      await axios.delete(`/product/${id}`);
      loadProducts();
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
    <ProductContext.Provider
      value={{
        products,
        error,
        loadProducts,
        newProduct,
        removeProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
