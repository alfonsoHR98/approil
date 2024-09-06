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
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};
