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

  const loadBatches = async () => {
    try {
      const res = await axios.get("/batche");
      setBatches(res.data);
    } catch (err) {
      setError(error.response?.data?.message);
    }
  };

  async function newBatche(data) {
    try {
      const res = await axios.post("/batche", data);
      loadBatches();
      return res.data;
    } catch (err) {
      setError(error.response?.data?.message);
    }
  }

  async function removeBatche(id) {
    try {
      await axios.delete(`/batche/${id}`);
      loadBatches();
    } catch (err) {
      console.log(err);
      //setError(error.response?.data?.message);
    }
  }

  async function newBatcheDetail(data) {
    try {
      await axios.post("/batcheDetail", data);
    } catch (err) {
      setError(error.response?.data?.message);
    }
  }

  async function getBatcheDetail(id) {
    try {
      const res = await axios.get(`/batche/${id}`);
      return res.data;
    } catch (err) {
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
    <BatcheContext.Provider
      value={{
        batches,
        error,
        loadBatches,
        newBatche,
        removeBatche,
        newBatcheDetail,
        getBatcheDetail,
      }}
    >
      {children}
    </BatcheContext.Provider>
  );
};
