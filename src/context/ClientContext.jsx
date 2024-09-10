import { createContext, useState, useContext, useEffect } from "react";
import axios from "@lib/axios";

const ClientContext = createContext();

export const useClient = () => {
  const context = useContext(ClientContext);
  if (!context) {
    throw new Error("useClient must be used within a ClientProvider");
  }
  return context;
};

export const ClientProvider = ({ children }) => {
  const [clients, setClients] = useState([]);
  const [error, setError] = useState(null);

  const loadClients = async () => {
    try {
      const res = await axios.get("/client");
      setClients(res.data);
    } catch (error) {
      setError(error.response?.data?.message);
    }
  }

  async function newClient(data) {
    try {
      await axios.post("/client", data);
      loadClients();
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
    <ClientContext.Provider
      value={{
        clients,
        error,
        loadClients,
        newClient,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};
