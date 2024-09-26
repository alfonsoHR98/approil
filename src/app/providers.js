"use client";
import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/react";
import { BatcheProvider } from "@context/BatcheContext";
import { ClientProvider } from "@context/ClientContext";
import { InventoryProvider } from "@context/InventoryContext";
import { ProductProvider } from "@context/ProductContext";
import { SaleProvider } from "@context/SaleContext";
import { SaleUnitProvider } from "@context/SaleUnitContext";
import { SupplierProvider } from "@context/SupplierContext";
import { WarehouseProvider } from "@context/WarehouseContext";
import { WasteProvider } from "@context/WasteContext";
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
        <BatcheProvider>
          <ClientProvider>
            <ProductProvider>
              <SaleProvider>
                <SaleUnitProvider>
                  <SupplierProvider>
                    <WarehouseProvider>
                      <WasteProvider>
                        <InventoryProvider>
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
                        </InventoryProvider>
                      </WasteProvider>
                    </WarehouseProvider>
                  </SupplierProvider>
                </SaleUnitProvider>
              </SaleProvider>
            </ProductProvider>
          </ClientProvider>
        </BatcheProvider>
      </NextUIProvider>
    </SessionProvider>
  );
}
