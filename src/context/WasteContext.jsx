import { createContext, useState, useContext, useEffect } from "react";
import axios from "@lib/axios";

const WasteContext = createContext();

export const useWaste = () => {
  const context = useContext(WasteContext);
  if (!context) {
    throw new Error("useWaste must be used within a WasteProvider");
  }
  return context;
};

export const WasteProvider = ({ children }) => {
  const [wastes, setWastes] = useState([]);
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
    <WasteContext.Provider
      value={{
        wastes,
        error,
      }}
    >
      {children}
    </WasteContext.Provider>
  );
};
