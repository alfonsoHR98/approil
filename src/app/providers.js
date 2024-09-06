"use client"
import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/react";
import { SaleUnitProvider } from "@context/SaleUnitContext";
import { usePathname } from "next/navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import NavBar from "@components/Navbar";

export function Providers({ children }) {
  const pathname = usePathname();
  const excludeRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/recover-password",
  ];
  return (
    <SessionProvider>
      <NextUIProvider>
        <SaleUnitProvider>
          {!excludeRoutes.includes(pathname) && <NavBar />}
          {children}
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </SaleUnitProvider>
      </NextUIProvider>
    </SessionProvider>
  );
}
