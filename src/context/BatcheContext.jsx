import { createContext, useState, useContext, useEffect } from "react";
import axios from "@lib/axios";

const BatcheContext = createContext();

export const useBatche = () => {
  const context = useContext(BatcheContext);
  if (!context) {
    throw new Error("useBatche must be used within a BatcheProvider");
  }
  return context;
};

export const BatcheProvider = ({ children }) => {
  const [batches, setBatches] = useState([]);
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
    <BatcheContext.Provider
      value={{
        batches,
        error,
      }}
    >
      {children}
    </BatcheContext.Provider>
  );
};
